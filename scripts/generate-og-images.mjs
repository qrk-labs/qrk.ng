#!/usr/bin/env node
/**
 * Generate static OG images for QRK Labs website
 * Uses satori + sharp for server-side rendering
 */

import satori from 'satori';
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const ogDir = join(publicDir, 'og');

// Ensure directories exist
mkdirSync(join(ogDir, 'blog'), { recursive: true });

// Load a font (using Inter from Google Fonts CDN, cached locally)
async function loadFont() {
  const fontPath = join(__dirname, 'Inter-Bold.ttf');
  try {
    return readFileSync(fontPath);
  } catch {
    // Download if not cached
    console.log('Downloading Inter font...');
    const res = await fetch('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZg.ttf');
    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(fontPath, buffer);
    return buffer;
  }
}

function createOgComponent({ title, author, type = 'website' }) {
  return {
    type: 'div',
    props: {
      style: {
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px',
        fontFamily: 'Inter',
      },
      children: [
        // Top logo
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  children: {
                    type: 'span',
                    props: {
                      style: { color: '#fff', fontSize: '24px', fontWeight: 700 },
                      children: 'Q',
                    },
                  },
                },
              },
              {
                type: 'span',
                props: {
                  style: { color: '#888', fontSize: '24px', fontWeight: 500 },
                  children: 'QRK Labs',
                },
              },
            ],
          },
        },
        // Main title
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              flex: 1,
              justifyContent: 'center',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    color: '#fff',
                    fontSize: title.length > 50 ? 48 : 64,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    maxWidth: '90%',
                  },
                  children: title,
                },
              },
              ...(author && type === 'article'
                ? [
                    {
                      type: 'div',
                      props: {
                        style: {
                          color: '#a0a0a0',
                          fontSize: 28,
                          fontWeight: 400,
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
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: { color: '#666', fontSize: 20 },
                  children: 'Human-Centric AI Research',
                },
              },
              {
                type: 'span',
                props: {
                  style: { color: '#888', fontSize: 20 },
                  children: 'qrk.ng',
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
  const font = await loadFont();
  
  const svg = await satori(createOgComponent(options), {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: font,
        weight: 700,
        style: 'normal',
      },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  const outputPath = join(ogDir, filename);
  writeFileSync(outputPath, png);
  console.log(`✓ Generated ${filename}`);
}

async function main() {
  console.log('Generating OG images...\n');

  // Default site-wide image
  await generateImage('default.png', {
    title: 'Human-Centric AI Research',
    type: 'website',
  });

  // Blog post images can be added here
  // await generateImage('blog/thought-injection.png', {
  //   title: 'Thought Injection: Teaching LLMs to Ask for Help',
  //   author: 'Mainasara Tsowa',
  //   type: 'article',
  // });

  console.log('\n✓ All OG images generated!');
}

main().catch(console.error);
