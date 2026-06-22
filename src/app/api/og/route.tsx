import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

let fontPromise:
  | Promise<{
      bold: ArrayBuffer;
      light: ArrayBuffer;
    }>
  | undefined;

async function loadFonts() {
  fontPromise ??= Promise.all([
    fetch(new URL("../../../../scripts/Lexend-Bold.ttf", import.meta.url)).then(
      (res) => res.arrayBuffer(),
    ),
    fetch(
      new URL("../../../../scripts/Lexend-Light.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer()),
  ]).then(([bold, light]) => ({ bold, light }));

  return fontPromise;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "QRK Labs";
  const author = searchParams.get("author");
  const type = searchParams.get("type") ?? "article";

  const fonts = await loadFonts();

  // Create a short watermark from the title
  const watermark = title.split(" ")[0]?.toUpperCase() ?? "QRK";

  return new ImageResponse(
    <div
      style={{
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
      }}
    >
      <svg
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <defs>
          <linearGradient
            id="bg"
            x1="0"
            y1="0"
            x2="1200"
            y2="630"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#02040c" />
            <stop offset="0.48" stopColor="#081127" />
            <stop offset="1" stopColor="#102d56" />
          </linearGradient>
          <linearGradient
            id="wave"
            x1="144"
            y1="490"
            x2="1100"
            y2="232"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#14305e" />
            <stop offset="0.48" stopColor="#1e548e" />
            <stop offset="1" stopColor="#18847e" />
          </linearGradient>
          <linearGradient
            id="accent"
            x1="144"
            y1="108"
            x2="1050"
            y2="540"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#6ef023" />
            <stop offset="1" stopColor="#f02361" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)" />
        <path
          d="M-80 426C94 350 199 365 342 424C497 488 614 537 779 463C921 399 1008 296 1284 331V725H-80V426Z"
          fill="url(#wave)"
          opacity="0.9"
        />
        <path
          d="M-80 493C104 406 242 433 398 493C557 554 682 553 838 465C971 390 1068 338 1284 382V725H-80V493Z"
          fill="#18847e"
          opacity="0.28"
        />
        <path
          d="M-75 520C141 447 304 455 472 526C624 590 752 610 912 516C1011 458 1110 428 1284 448"
          fill="none"
          stroke="url(#accent)"
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.78"
        />
        <path
          d="M-60 546C123 484 276 496 436 560C579 617 723 640 892 550C1016 484 1118 464 1274 484"
          fill="none"
          stroke="rgba(255,255,255,0.32)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Large watermark text in background */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "50%",
          left: "-5%",
          transform: "translateY(-50%)",
          fontSize: "280px",
          fontWeight: 700,
          color: "rgba(255, 255, 255, 0.03)",
          letterSpacing: 0,
          lineHeight: 0.8,
          whiteSpace: "nowrap",
        }}
      >
        {watermark}
      </div>

      {/* Top - QRK Labs branding */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              display: "flex",
              color: "#fff",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            Q
          </span>
        </div>
        <span
          style={{
            display: "flex",
            color: "rgba(255, 255, 255, 0.64)",
            fontSize: "18px",
            fontWeight: 300,
          }}
        >
          QRK Labs
        </span>
      </div>

      {/* Main title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flex: 1,
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#fff",
            fontSize: title.length > 50 ? 44 : 56,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: "85%",
            letterSpacing: 0,
          }}
        >
          {title}
        </div>
        {author && type === "article" && (
          <div
            style={{
              display: "flex",
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: 22,
              fontWeight: 300,
              letterSpacing: 0,
            }}
          >
            by {author}
          </div>
        )}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              width: "40px",
              height: "1px",
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <span
            style={{
              display: "flex",
              color: "rgba(255, 255, 255, 0.45)",
              fontSize: 16,
              fontWeight: 300,
            }}
          >
            Tech For Humanity
          </span>
        </div>
        <span
          style={{
            display: "flex",
            color: "rgba(255, 255, 255, 0.56)",
            fontSize: 16,
            fontWeight: 300,
          }}
        >
          qrk.ng
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Lexend",
          data: fonts.bold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Lexend",
          data: fonts.light,
          style: "normal",
          weight: 300,
        },
      ],
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
