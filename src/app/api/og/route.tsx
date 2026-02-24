import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "QRK Labs";
  const author = searchParams.get("author");
  const type = searchParams.get("type") ?? "article";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top decorative element */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: "24px", fontWeight: 700 }}>
              Q
            </span>
          </div>
          <span style={{ color: "#888", fontSize: "24px", fontWeight: 500 }}>
            QRK Labs
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: title.length > 50 ? 48 : 64,
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "90%",
            }}
          >
            {title}
          </div>
          {author && type === "article" && (
            <div
              style={{
                color: "#a0a0a0",
                fontSize: 28,
                fontWeight: 400,
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
          <span style={{ color: "#666", fontSize: 20 }}>
            Human-Centric AI Research
          </span>
          <span style={{ color: "#888", fontSize: 20 }}>qrk.ng</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
