import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/theme";
import "@/styles/globals.css";
import { Header } from "@/components/header";
import { PostHogProvider } from "@/components/PostHogProvider";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: {
    default: "QRK Labs | Human-Centric AI Research",
    template: "%s | QRK Labs",
  },
  description:
    "AI research lab from Nigeria building human-centric language models. Open weights, transparent research, global perspective.",
  keywords: [
    "AI research",
    "human-centric AI",
    "language models",
    "Nigeria",
    "Africa AI",
    "thought injection",
    "RAG alternative",
    "open source AI",
    "hallucination reduction",
  ],
  authors: [{ name: "QRK Labs" }],
  creator: "QRK Labs",
  metadataBase: new URL("https://qrk.ng"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qrk.ng",
    siteName: "QRK Labs",
    title: "QRK Labs | Human-Centric AI Research",
    description:
      "AI research lab from Nigeria building human-centric language models. Open weights, transparent research, global perspective.",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "QRK Labs - Human-Centric AI Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QRK Labs | Human-Centric AI Research",
    description:
      "AI research lab from Nigeria building human-centric language models. Open weights, transparent research, global perspective.",
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/pure-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/pure-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="h-full w-full">
        <PostHogProvider>
          <div id="root" className="h-full w-full">
            <ThemeProvider>
              <Header
                links={[
                  { label: "Home", href: "/" },
                  { label: "Research", href: "/research" },
                  { label: "Blog", href: "/blog" },
                  { label: "About", href: "/about-us" },
                ]}
              />
              {children}
            </ThemeProvider>
          </div>

          <footer className="border-border/40 bg-background/80 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur-xl">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
                <p className="text-muted-foreground text-sm font-light">
                  QRK Labs | Human-Centric AI Research | 2026
                </p>
                <div className="flex items-center gap-6">
                  <a
                    href="https://github.com/qrk-labs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="mailto:hello@qrk.ng"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </PostHogProvider>
      </body>
    </html>
  );
}
