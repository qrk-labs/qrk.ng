#!/usr/bin/env node
/**
 * Generate static OG images for QRK Labs website
 * Uses satori + sharp for server-side rendering
 */

import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const ogDir = join(publicDir, "og");

// Ensure directories exist
mkdirSync(join(ogDir, "blog"), { recursive: true });
mkdirSync(join(ogDir, "research"), { recursive: true });

// Load Lexend fonts
async function loadFonts() {
  const boldPath = join(__dirname, "Lexend-Bold.ttf");
  const lightPath = join(__dirname, "Lexend-Light.ttf");

  let bold, light;

  if (existsSync(boldPath)) {
    bold = readFileSync(boldPath);
  } else {
    console.log("Downloading Lexend Bold font...");
    const res = await fetch(
      "https://github.com/googlefonts/lexend/raw/main/fonts/lexend/ttf/Lexend-Bold.ttf",
    );
    bold = Buffer.from(await res.arrayBuffer());
    writeFileSync(boldPath, bold);
  }

  if (existsSync(lightPath)) {
    light = readFileSync(lightPath);
  } else {
    console.log("Downloading Lexend Light font...");
    const res = await fetch(
      "https://github.com/googlefonts/lexend/raw/main/fonts/lexend/ttf/Lexend-Light.ttf",
    );
    light = Buffer.from(await res.arrayBuffer());
    writeFileSync(lightPath, light);
  }

  return { bold, light };
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapTitle(title) {
  const maxLineLength = title.length > 54 ? 27 : 32;
  const words = title.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLineLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function createGenericOgSvg({ title, author, type = "website" }, fonts) {
  const bold = Buffer.from(fonts.bold).toString("base64");
  const light = Buffer.from(fonts.light).toString("base64");
  const titleLines = wrapTitle(title);
  const watermark = escapeXml(title.split(" ")[0]?.toUpperCase() ?? "QRK");
  const titleFontSize =
    titleLines.length > 2 ? 48 : title.length > 50 ? 54 : 62;
  const titleStartY = titleLines.length > 2 ? 220 : 252;
  const titleText = titleLines
    .map((line, index) => {
      const y = titleStartY + index * Math.round(titleFontSize * 1.08);
      return `<text x="64" y="${y}" class="bold" font-size="${titleFontSize}" fill="#fff">${escapeXml(line)}</text>`;
    })
    .join("\n");
  const authorText =
    author && type === "article"
      ? `<text x="64" y="${titleStartY + titleLines.length * Math.round(titleFontSize * 1.08) + 34}" class="light" font-size="22" fill="rgba(248,251,255,0.58)">by ${escapeXml(author)}</text>`
      : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>
      @font-face {
        font-family: "Lexend";
        font-weight: 700;
        src: url(data:font/truetype;charset=utf-8;base64,${bold}) format("truetype");
      }
      @font-face {
        font-family: "Lexend";
        font-weight: 300;
        src: url(data:font/truetype;charset=utf-8;base64,${light}) format("truetype");
      }
      .bold { font-family: "Lexend", Arial, sans-serif; font-weight: 700; }
      .light { font-family: "Lexend", Arial, sans-serif; font-weight: 300; }
    </style>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#02040c"/>
      <stop offset="0.48" stop-color="#081127"/>
      <stop offset="1" stop-color="#102d56"/>
    </linearGradient>
    <linearGradient id="wave" x1="144" y1="490" x2="1100" y2="232" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#14305e"/>
      <stop offset="0.48" stop-color="#1e548e"/>
      <stop offset="1" stop-color="#18847e"/>
    </linearGradient>
    <linearGradient id="accent" x1="144" y1="108" x2="1050" y2="540" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#6ef023"/>
      <stop offset="1" stop-color="#f02361"/>
    </linearGradient>
    <linearGradient id="badge" x1="74" y1="60" x2="108" y2="104" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#6ef023" stop-opacity="0.25"/>
      <stop offset="1" stop-color="#f02361" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <path d="M-80 426C94 350 199 365 342 424C497 488 614 537 779 463C921 399 1008 296 1284 331V725H-80V426Z" fill="url(#wave)" opacity="0.9"/>
  <path d="M-80 493C104 406 242 433 398 493C557 554 682 553 838 465C971 390 1068 338 1284 382V725H-80V493Z" fill="#18847e" opacity="0.28"/>
  <path d="M-75 520C141 447 304 455 472 526C624 590 752 610 912 516C1011 458 1110 428 1284 448" fill="none" stroke="url(#accent)" stroke-width="5" stroke-linecap="round" opacity="0.78"/>
  <path d="M-60 546C123 484 276 496 436 560C579 617 723 640 892 550C1016 484 1118 464 1274 484" fill="none" stroke="rgba(255,255,255,0.32)" stroke-width="2" stroke-linecap="round"/>

  <text x="-64" y="395" class="bold" font-size="250" fill="rgba(255,255,255,0.035)">${watermark}</text>

  <rect x="64" y="58" width="44" height="44" rx="10" fill="url(#badge)" stroke="rgba(255,255,255,0.24)"/>
  <text x="86" y="88" text-anchor="middle" class="bold" font-size="22" fill="#fff">Q</text>
  <text x="122" y="76" class="bold" font-size="18" fill="#fff">QRK Labs</text>

  ${titleText}
  ${authorText}

  <line x1="64" y1="568" x2="104" y2="568" stroke="rgba(255,255,255,0.28)"/>
  <text x="120" y="573" class="light" font-size="16" fill="rgba(248,251,255,0.56)">Tech For Humanity</text>
  <text x="1136" y="573" text-anchor="end" class="light" font-size="16" fill="rgba(248,251,255,0.64)">qrk.ng</text>
</svg>`;
}

async function generateImage(filename, options) {
  const fonts = await loadFonts();
  const svg = createGenericOgSvg(options, fonts);

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const outputPath = join(ogDir, filename);
  writeFileSync(outputPath, png);
  console.log(`✓ Generated ${filename}`);
}

async function generateDabeImage() {
  const fonts = await loadFonts();
  const bold = Buffer.from(fonts.bold).toString("base64");
  const light = Buffer.from(fonts.light).toString("base64");
  const activeBits = new Set([1, 5, 8, 13, 21, 24, 27, 34, 38, 41, 47, 52]);
  const bitRects = Array.from({ length: 56 }, (_, index) => {
    const x = 826 + (index % 7) * 31;
    const y = 178 + Math.floor(index / 7) * 31;
    const active = activeBits.has(index);

    return `<rect x="${x}" y="${y}" width="18" height="18" rx="4" fill="${active ? "#6ef023" : "rgba(255,255,255,0.13)"}"/>`;
  }).join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style>
      @font-face {
        font-family: "Lexend";
        font-weight: 700;
        src: url(data:font/truetype;charset=utf-8;base64,${bold}) format("truetype");
      }
      @font-face {
        font-family: "Lexend";
        font-weight: 300;
        src: url(data:font/truetype;charset=utf-8;base64,${light}) format("truetype");
      }
      .bold { font-family: "Lexend", Arial, sans-serif; font-weight: 700; }
      .light { font-family: "Lexend", Arial, sans-serif; font-weight: 300; }
    </style>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#02040c"/>
      <stop offset="0.48" stop-color="#081127"/>
      <stop offset="1" stop-color="#102d56"/>
    </linearGradient>
    <linearGradient id="wave" x1="144" y1="490" x2="1100" y2="232" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#14305e"/>
      <stop offset="0.48" stop-color="#1e548e"/>
      <stop offset="1" stop-color="#18847e"/>
    </linearGradient>
    <linearGradient id="accent" x1="144" y1="108" x2="1050" y2="540" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#6ef023"/>
      <stop offset="1" stop-color="#f02361"/>
    </linearGradient>
    <linearGradient id="badge" x1="74" y1="60" x2="108" y2="104" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#6ef023" stop-opacity="0.25"/>
      <stop offset="1" stop-color="#f02361" stop-opacity="0.25"/>
    </linearGradient>
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="9" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <path d="M-80 426C94 350 199 365 342 424C497 488 614 537 779 463C921 399 1008 296 1284 331V725H-80V426Z" fill="url(#wave)" opacity="0.9"/>
  <path d="M-80 493C104 406 242 433 398 493C557 554 682 553 838 465C971 390 1068 338 1284 382V725H-80V493Z" fill="#18847e" opacity="0.28"/>
  <path d="M-75 520C141 447 304 455 472 526C624 590 752 610 912 516C1011 458 1110 428 1284 448" fill="none" stroke="url(#accent)" stroke-width="5" stroke-linecap="round" opacity="0.78"/>
  <path d="M-60 546C123 484 276 496 436 560C579 617 723 640 892 550C1016 484 1118 464 1274 484" fill="none" stroke="rgba(255,255,255,0.32)" stroke-width="2" stroke-linecap="round"/>

  <rect x="792" y="78" width="344" height="336" rx="26" fill="rgba(2,4,12,0.36)" stroke="rgba(255,255,255,0.14)"/>
  <text x="822" y="139" class="light" font-size="18" fill="rgba(248,251,255,0.6)">gist</text>
  <text x="1050" y="139" text-anchor="end" class="light" font-size="18" fill="rgba(248,251,255,0.6)">repair</text>
  <g filter="url(#softGlow)">${bitRects}</g>
  <rect x="822" y="366" width="250" height="7" rx="3.5" fill="url(#accent)"/>

  <rect x="64" y="58" width="44" height="44" rx="10" fill="url(#badge)" stroke="rgba(255,255,255,0.24)"/>
  <text x="86" y="88" text-anchor="middle" class="bold" font-size="22" fill="#fff">Q</text>
  <text x="122" y="76" class="bold" font-size="18" fill="#fff">QRK Labs</text>
  <text x="122" y="98" class="light" font-size="14" fill="rgba(248,251,255,0.64)">Public manuscript</text>

  <rect x="987" y="60" width="148" height="42" rx="21" fill="rgba(110,240,35,0.08)" stroke="rgba(110,240,35,0.36)"/>
  <text x="1061" y="87" text-anchor="middle" class="bold" font-size="15" fill="#dcffd2">MANUSCRIPT</text>

  <text x="64" y="263" class="bold" font-size="70" fill="#fff">Density-Adaptive</text>
  <text x="64" y="330" class="bold" font-size="70" fill="#fff">Bitmask Encoding</text>
  <text x="64" y="392" class="light" font-size="29" fill="rgba(248,251,255,0.8)">Remember the gist first. Repair the details</text>
  <text x="64" y="430" class="light" font-size="29" fill="rgba(248,251,255,0.8)">only where they matter.</text>

  <text x="64" y="570" class="light" font-size="16" fill="rgba(248,251,255,0.64)">Tokenization / Compression / Sparse repair</text>
  <text x="1136" y="570" text-anchor="end" class="light" font-size="16" fill="rgba(248,251,255,0.64)">qrk.ng/research/density-adaptive-bitmask-encoding</text>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const researchOutputPath = join(
    ogDir,
    "research",
    "density-adaptive-bitmask-encoding.png",
  );
  const blogOutputPath = join(ogDir, "blog", "teaching-ai-to-remember.png");

  writeFileSync(researchOutputPath, png);
  writeFileSync(blogOutputPath, png);
  console.log("✓ Generated research/density-adaptive-bitmask-encoding.png");
  console.log("✓ Generated blog/teaching-ai-to-remember.png");
}

async function main() {
  console.log("Generating OG images...\n");

  // Default site-wide image
  await generateImage("default.png", {
    title: "Human-Centric AI Research",
    type: "website",
  });

  // Blog post images can be added here
  await generateImage("blog/first-post.png", {
    title: "Welcome to QRK",
    author: "The QRK Team",
    type: "article",
  });
  await generateImage("blog/introducing-thought-injection.png", {
    title: "Thought Injection: What if AI could ask for help?",
    author: "Mainasara Tsowa",
    type: "article",
  });

  await generateImage("research/thought-injection-technical-notes.png", {
    title: "Thought Injection: Technical Notes and Implementation Details",
    author: "Mainasara Tsowa",
    type: "article",
  });
  await generateDabeImage();

  console.log("\n✓ All OG images generated!");
}

main().catch(console.error);
