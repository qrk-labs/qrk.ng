import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// Fetch Lexend fonts (TTF format required for satori)
async function loadFonts() {
  const [bold, light] = await Promise.all([
    fetch(
      "https://github.com/googlefonts/lexend/raw/main/fonts/lexend/ttf/Lexend-Bold.ttf"
    ).then((res) => res.arrayBuffer()),
    fetch(
      "https://github.com/googlefonts/lexend/raw/main/fonts/lexend/ttf/Lexend-Light.ttf"
    ).then((res) => res.arrayBuffer()),
  ]);
  return { bold, light };
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
    (
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
            letterSpacing: "-0.05em",
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
            <span style={{ display: "flex", color: "#fff", fontSize: "20px", fontWeight: 700 }}>
              Q
            </span>
          </div>
          <span style={{ display: "flex", color: "rgba(255, 255, 255, 0.5)", fontSize: "18px", fontWeight: 300 }}>
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
              letterSpacing: "-0.02em",
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
                letterSpacing: "0.02em",
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
            <span style={{ display: "flex", color: "rgba(255, 255, 255, 0.3)", fontSize: 16, fontWeight: 300 }}>
              Tech For Humanity
            </span>
          </div>
          <span style={{ display: "flex", color: "rgba(255, 255, 255, 0.4)", fontSize: 16, fontWeight: 300 }}>
            qrk.ng
          </span>
        </div>
      </div>
    ),
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
    }
  );
}
