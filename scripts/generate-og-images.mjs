#!/usr/bin/env node
/**
 * Generate static OG images for QRK Labs website
 * Uses satori + sharp for server-side rendering
 */

import satori from "satori";
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
      "https://github.com/googlefonts/lexend/raw/main/fonts/lexend/ttf/Lexend-Bold.ttf"
    );
    bold = Buffer.from(await res.arrayBuffer());
    writeFileSync(boldPath, bold);
  }

  if (existsSync(lightPath)) {
    light = readFileSync(lightPath);
  } else {
    console.log("Downloading Lexend Light font...");
    const res = await fetch(
      "https://github.com/googlefonts/lexend/raw/main/fonts/lexend/ttf/Lexend-Light.ttf"
    );
    light = Buffer.from(await res.arrayBuffer());
    writeFileSync(lightPath, light);
  }

  return { bold, light };
}

function createOgComponent({ title, author, type = "website" }) {
  // Create a short watermark from the title
  const watermark = title.split(" ")[0]?.toUpperCase() ?? "QRK";

  return {
    type: "div",
    props: {
      style: {
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px",
        fontFamily: "Lexend",
        position: "relative",
        overflow: "hidden",
      },
      children: [
        // Large watermark text in background
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "50%",
              left: "-5%",
              transform: "translateY(-50%)",
              fontSize: "280px",
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.03)",
              letterSpacing: "-0.05em",
              lineHeight: 0.8,
              whiteSpace: "nowrap",
            },
            children: watermark,
          },
        },
        // Top logo
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "12px",
              position: "relative",
              zIndex: 10,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  children: {
                    type: "span",
                    props: {
                      style: {
                        color: "#fff",
                        fontSize: "20px",
                        fontWeight: 700,
                      },
                      children: "Q",
                    },
                  },
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "18px",
                    fontWeight: 300,
                  },
                  children: "QRK Labs",
                },
              },
            ],
          },
        },
        // Main title
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              flex: 1,
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: "#fff",
                    fontSize: title.length > 50 ? 44 : 56,
                    fontWeight: 700,
                    lineHeight: 1.15,
                    maxWidth: "85%",
                    letterSpacing: "-0.02em",
                  },
                  children: title,
                },
              },
              ...(author && type === "article"
                ? [
                    {
                      type: "div",
                      props: {
                        style: {
                          color: "rgba(255, 255, 255, 0.4)",
                          fontSize: 22,
                          fontWeight: 300,
                          letterSpacing: "0.02em",
                        },
                        children: `by ${author}`,
                      },
                    },
                  ]
                : []),
            ],
          },
        },
        // Bottom tagline
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
              zIndex: 10,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          width: "40px",
                          height: "1px",
                          background: "rgba(255, 255, 255, 0.2)",
                        },
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          color: "rgba(255, 255, 255, 0.3)",
                          fontSize: 16,
                          fontWeight: 300,
                        },
                        children: "Tech For Humanity",
                      },
                    },
                  ],
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    color: "rgba(255, 255, 255, 0.4)",
                    fontSize: 16,
                    fontWeight: 300,
                  },
                  children: "qrk.ng",
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function generateImage(filename, options) {
  const fonts = await loadFonts();

  const svg = await satori(createOgComponent(options), {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Lexend",
        data: fonts.bold,
        weight: 700,
        style: "normal",
      },
      {
        name: "Lexend",
        data: fonts.light,
        weight: 300,
        style: "normal",
      },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const outputPath = join(ogDir, filename);
  writeFileSync(outputPath, png);
  console.log(`✓ Generated ${filename}`);
}

async function main() {
  console.log("Generating OG images...\n");

  // Default site-wide image
  await generateImage("default.png", {
    title: "Human-Centric AI Research",
    type: "website",
  });

  // Blog post images can be added here
  // await generateImage('blog/thought-injection.png', {
  //   title: 'Thought Injection: Teaching LLMs to Ask for Help',
  //   author: 'Mainasara Tsowa',
  //   type: 'article',
  // });

  // Research paper images can be added here
  // await generateImage('research/thought-injection-technical-notes.png', {
  //   title: 'Thought Injection: Technical Notes',
  //   author: 'QRK Labs',
  //   type: 'article',
  // });

  console.log("\n✓ All OG images generated!");
}

main().catch(console.error);
