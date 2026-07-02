"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingShapes } from "./FloatingShapes";
import { SplitText } from "./SplitText";
import { ScrollIndicator } from "./ScrollIndicator";

const tokenCells = Array.from({ length: 32 }, (_, index) => ({
  index,
  active: [3, 4, 9, 13, 17, 18, 24, 29].includes(index),
  repair: [4, 13, 18, 29].includes(index),
}));

function ResearchFigure() {
  return (
    <figure className="text-foreground relative mx-auto aspect-[1.05] w-full max-w-[35rem]">
      <div className="absolute inset-0 [background-image:radial-gradient(circle_at_center,oklch(var(--primary)/0.2)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)] [background-size:22px_22px] opacity-50" />

      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 560 530"
        role="img"
        aria-label="Diagram of a fixed token chunk, coarse gist, and sparse repair positions"
      >
        <defs>
          <linearGradient id="heroFigureLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="oklch(var(--primary))" />
            <stop offset="1" stopColor="oklch(var(--accent))" />
          </linearGradient>
        </defs>

        <path
          d="M64 270C118 184 188 141 274 141C370 141 435 196 496 282"
          fill="none"
          stroke="url(#heroFigureLine)"
          strokeWidth="1.5"
          strokeDasharray="7 12"
          opacity="0.7"
        />
        <path
          d="M108 386C174 333 220 303 280 303C347 303 391 336 454 386"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.24"
        />

        <g transform="translate(74 72)">
          <text
            x="0"
            y="0"
            fill="currentColor"
            fontSize="13"
            letterSpacing="3"
            opacity="0.66"
          >
            DABE
          </text>
          <text x="0" y="34" fill="currentColor" fontSize="42" opacity="0.9">
            fixed chunk
          </text>
          <text x="4" y="62" fill="currentColor" fontSize="13" opacity="0.56">
            coarse gist first, sparse lexical repair only where detail matters
          </text>
        </g>

        <g transform="translate(64 190)">
          {tokenCells.map((cell) => {
            const x = (cell.index % 16) * 27;
            const y = Math.floor(cell.index / 16) * 35;

            return (
              <g key={cell.index} transform={`translate(${x} ${y})`}>
                <rect
                  width="18"
                  height="22"
                  fill={
                    cell.repair
                      ? "oklch(var(--accent))"
                      : cell.active
                        ? "oklch(var(--primary))"
                        : "currentColor"
                  }
                  opacity={cell.repair ? 0.82 : cell.active ? 0.48 : 0.12}
                />
                {cell.repair ? (
                  <path
                    d="M-3 26L21 -4"
                    stroke="oklch(var(--accent))"
                    strokeWidth="1.5"
                    opacity="0.9"
                  />
                ) : null}
              </g>
            );
          })}
          <text
            x="0"
            y="104"
            fill="currentColor"
            fontSize="12"
            letterSpacing="2"
            opacity="0.48"
          >
            64 token slab, shown compressed
          </text>
        </g>

        <g transform="translate(370 255)">
          <circle
            cx="66"
            cy="66"
            r="66"
            fill="none"
            stroke="oklch(var(--primary))"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle
            cx="66"
            cy="66"
            r="36"
            fill="oklch(var(--primary))"
            opacity="0.1"
          />
          <path
            d="M66 0V132M0 66H132M20 20L112 112M112 20L20 112"
            stroke="oklch(var(--primary))"
            strokeWidth="1"
            opacity="0.26"
          />
          <text
            x="66"
            y="71"
            textAnchor="middle"
            fill="currentColor"
            fontSize="13"
            opacity="0.72"
          >
            repair map
          </text>
        </g>

        <g transform="translate(92 392)">
          <path
            d="M0 0H365"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.2"
          />
          <path
            d="M0 0H86M172 0H224M310 0H365"
            stroke="url(#heroFigureLine)"
            strokeWidth="3"
            opacity="0.85"
          />
          <text x="0" y="34" fill="currentColor" fontSize="13" opacity="0.56">
            learned representation with selected detail restored
          </text>
        </g>
      </svg>
    </figure>
  );
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <FloatingShapes />

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 items-center gap-y-14 md:gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-primary mb-5 text-xs font-medium tracking-[0.26em] uppercase">
              Abuja AI research lab
            </p>

            <h1 className="max-w-5xl">
              <SplitText
                text="QRK"
                className="text-foreground block text-7xl leading-[0.82] font-light tracking-tighter sm:text-8xl md:text-9xl lg:text-[10.5rem]"
                staggerDelay={0.04}
                enableGlitch
              />
              <span className="text-foreground/[0.88] mt-5 block max-w-3xl text-3xl leading-[1.02] font-light tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                is an AI research lab from Abuja.
              </span>
            </h1>

            <p className="text-muted-foreground mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">
              We study how models represent text, recover context, and spend
              attention on the details that matter.               Our current work includes
              DABE and notes on retrieval during reasoning.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 px-6 text-base" asChild>
                <Link href="/research">
                  Read the research
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/30 bg-background/60 h-12 px-6 text-base"
                asChild
              >
                <Link href="mailto:hello@qrk.ng">Contact the lab</Link>
              </Button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <ResearchFigure />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
