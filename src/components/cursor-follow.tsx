"use client";

import { useTheme } from "@/lib/theme";
import { useRef, useEffect } from "react";

const VERTEX = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision highp float;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_strength;
uniform vec3  u_bg;
uniform vec3  u_c1;
uniform vec3  u_c2;
uniform vec3  u_c3;
uniform vec3  u_c4;

float wave(vec2 uv, float freq, float speed, float phase, float amp) {
  return sin(uv.x * freq + uv.y * (freq * 0.35) + u_time * speed + phase) * amp;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv;
  p.x *= u_resolution.x / max(u_resolution.y, 1.0);

  float w1 = wave(p, 6.5, 0.36, 0.0, 0.60);
  float w2 = wave(p, 10.0, -0.24, 1.8, 0.35);
  float w3 = wave(vec2(p.x * 0.8, p.y * 1.4), 14.0, 0.15, 3.14, 0.25);

  float crest = 0.5 + 0.5 * (w1 + w2 + w3);
  crest = smoothstep(0.18, 0.92, crest);

  float sweep = sin((p.x + p.y) * 8.5 - u_time * 0.28) * 0.5 + 0.5;
  float depth = smoothstep(0.1, 0.95, mix(crest, sweep, 0.25));

  vec3 gradient = mix(u_c1, u_c2, smoothstep(0.0, 0.55, uv.y));
  gradient = mix(gradient, u_c3, depth * 0.75);
  gradient = mix(gradient, u_c4, smoothstep(0.55, 1.0, crest));

  vec2 center = uv - 0.5;
  float vignette = 1.0 - smoothstep(0.28, 0.82, dot(center, center) * 2.1);

  vec3 color = mix(u_bg, gradient, u_strength);
  color = mix(color, gradient * 1.05, depth * 0.35);
  color *= 0.9 + vignette * 0.1;

  gl_FragColor = vec4(color, 1.0);
}
`;

interface Uniforms {
  res: WebGLUniformLocation;
  time: WebGLUniformLocation;
  str: WebGLUniformLocation;
  bg: WebGLUniformLocation;
  c1: WebGLUniformLocation;
  c2: WebGLUniformLocation;
  c3: WebGLUniformLocation;
  c4: WebGLUniformLocation;
}

interface Color {
  r: number;
  g: number;
  b: number;
}

interface Palette {
  bg: Color;
  c1: Color;
  c2: Color;
  c3: Color;
  c4: Color;
  strength: number;
}

interface SceneState {
  gl: WebGLRenderingContext;
  prog: WebGLProgram;
  u: Uniforms;
  frameId: number;
  start: number;
  currentPalette: Palette;
  transitionFrom: Palette;
  transitionTo: Palette;
  transitionStart: number;
  transitionActive: boolean;
}

type ThemeMode = "light" | "dark";

const TRANSITION_MS = 650;

const rgb = (r: number, g: number, b: number): Color => ({
  r: r / 255,
  g: g / 255,
  b: b / 255,
});

const PALETTES: Record<ThemeMode, Palette> = {
  light: {
    bg: rgb(236, 243, 255),
    c1: rgb(196, 218, 255),
    c2: rgb(143, 188, 255),
    c3: rgb(88, 149, 244),
    c4: rgb(63, 205, 190),
    strength: 0.83,
  },
  dark: {
    bg: rgb(2, 4, 12),
    c1: rgb(12, 22, 54),
    c2: rgb(20, 48, 94),
    c3: rgb(30, 84, 142),
    c4: rgb(24, 132, 126),
    strength: 0.58,
  },
};

const easer = (t: number) => 1 - Math.pow(1 - t, 3);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const lerpColor = (a: Color, b: Color, t: number): Color => ({
  r: lerp(a.r, b.r, t),
  g: lerp(a.g, b.g, t),
  b: lerp(a.b, b.b, t),
});

const lerpPalette = (a: Palette, b: Palette, t: number): Palette => ({
  bg: lerpColor(a.bg, b.bg, t),
  c1: lerpColor(a.c1, b.c1, t),
  c2: lerpColor(a.c2, b.c2, t),
  c3: lerpColor(a.c3, b.c3, t),
  c4: lerpColor(a.c4, b.c4, t),
  strength: lerp(a.strength, b.strength, t),
});

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string
) => {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Failed to create shader.");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader) ?? "Unknown shader compile error";
    gl.deleteShader(shader);
    throw new Error(log);
  }
  return shader;
};

const createProgram = (
  gl: WebGLRenderingContext,
  vertex: string,
  fragment: string
) => {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vertex);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragment);
  const prog = gl.createProgram();
  if (!prog) {
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    throw new Error("Failed to create program.");
  }
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(prog) ?? "Unknown program link error";
    gl.deleteProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    throw new Error(log);
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return prog;
};

const getUniform = (
  gl: WebGLRenderingContext,
  prog: WebGLProgram,
  name: string
) => {
  const location = gl.getUniformLocation(prog, name);
  if (!location) {
    throw new Error(`Missing uniform: ${name}`);
  }
  return location;
};

const paletteForTheme = (theme: string): Palette =>
  theme === "dark" ? PALETTES.dark : PALETTES.light;

const applyPalette = (
  gl: WebGLRenderingContext,
  u: Uniforms,
  palette: Palette
) => {
  gl.uniform1f(u.str, palette.strength);
  gl.uniform3f(u.bg, palette.bg.r, palette.bg.g, palette.bg.b);
  gl.uniform3f(u.c1, palette.c1.r, palette.c1.g, palette.c1.b);
  gl.uniform3f(u.c2, palette.c2.r, palette.c2.g, palette.c2.b);
  gl.uniform3f(u.c3, palette.c3.r, palette.c3.g, palette.c3.b);
  gl.uniform3f(u.c4, palette.c4.r, palette.c4.g, palette.c4.b);
};

const resolvePalette = (scene: SceneState, now: number): Palette => {
  if (!scene.transitionActive) {
    return scene.currentPalette;
  }
  const rawProgress = (now - scene.transitionStart) / TRANSITION_MS;
  const progress = Math.max(0, Math.min(rawProgress, 1));
  const next = lerpPalette(
    scene.transitionFrom,
    scene.transitionTo,
    easer(progress)
  );
  if (progress >= 1) {
    scene.currentPalette = scene.transitionTo;
    scene.transitionActive = false;
    return scene.transitionTo;
  }
  return next;
};

const SineBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const sceneRef = useRef<SceneState | null>(null);
  const initialThemeRef = useRef<ThemeMode>(theme === "dark" ? "dark" : "light");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      premultipliedAlpha: false,
    });

    if (!gl) {
      return;
    }

    let scene: SceneState | null = null;

    try {
      const prog = createProgram(gl, VERTEX, FRAGMENT);
      gl.useProgram(prog);

      const posLoc = gl.getAttribLocation(prog, "a_position");
      if (posLoc < 0) {
        throw new Error("Missing attribute: a_position");
      }

      const u: Uniforms = {
        res: getUniform(gl, prog, "u_resolution"),
        time: getUniform(gl, prog, "u_time"),
        str: getUniform(gl, prog, "u_strength"),
        bg: getUniform(gl, prog, "u_bg"),
        c1: getUniform(gl, prog, "u_c1"),
        c2: getUniform(gl, prog, "u_c2"),
        c3: getUniform(gl, prog, "u_c3"),
        c4: getUniform(gl, prog, "u_c4"),
      };

      const buf = gl.createBuffer();
      if (!buf) {
        throw new Error("Failed to create vertex buffer.");
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      );
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const initialPalette = paletteForTheme(initialThemeRef.current);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      const baseSpeed = reduceMotion.matches ? 0.22 : 1;
      const start = performance.now();

      scene = {
        gl,
        prog,
        u,
        frameId: 0,
        start,
        currentPalette: initialPalette,
        transitionFrom: initialPalette,
        transitionTo: initialPalette,
        transitionStart: start,
        transitionActive: false,
      };

      sceneRef.current = scene;

      const syncSize = () => {
        if (!sceneRef.current) {
          return;
        }
        const pixelRatio = Math.min(window.devicePixelRatio ?? 1, 2);
        const width = Math.floor(window.innerWidth * pixelRatio);
        const height = Math.floor(window.innerHeight * pixelRatio);
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
        gl.viewport(0, 0, width, height);
        gl.uniform2f(sceneRef.current.u.res, width, height);
      };

      const render = (now: number) => {
        const activeScene = sceneRef.current;
        if (!activeScene) {
          return;
        }
        const elapsed = (now - activeScene.start) * 0.001 * baseSpeed;
        const framePalette = resolvePalette(activeScene, now);

        gl.useProgram(activeScene.prog);
        applyPalette(gl, activeScene.u, framePalette);
        gl.uniform1f(activeScene.u.time, elapsed);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        activeScene.frameId = window.requestAnimationFrame(render);
      };

      syncSize();
      window.addEventListener("resize", syncSize);
      scene.frameId = window.requestAnimationFrame(render);

      return () => {
        window.removeEventListener("resize", syncSize);
        if (sceneRef.current) {
          window.cancelAnimationFrame(sceneRef.current.frameId);
        }
        sceneRef.current = null;
        gl.deleteBuffer(buf);
        gl.deleteProgram(prog);
      };
    } catch (error) {
      // Keep page usable even if WebGL setup fails.
      console.error("Wave background initialization failed:", error);
      if (sceneRef.current) {
        window.cancelAnimationFrame(sceneRef.current.frameId);
        sceneRef.current = null;
      }
      return;
    }
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) {
      return;
    }

    const now = performance.now();
    const current = resolvePalette(scene, now);
    const target = paletteForTheme(theme);

    scene.currentPalette = current;
    scene.transitionFrom = current;
    scene.transitionTo = target;
    scene.transitionStart = now;
    scene.transitionActive = true;
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, opacity: theme === "dark" ? 0.94 : 1 }}
    />
  );
};

export default SineBackground;
