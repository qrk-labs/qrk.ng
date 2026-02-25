"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CitationProps {
  slug: string;
  title: string;
  authors: string[];
  year: number;
}

export default function Citation({ slug, title, authors, year }: CitationProps) {
  const [copied, setCopied] = useState(false);

  const citationText = `@article{qrk_${slug.replace(/-/g, "_")}_${year},
  title={${title}},
  author={${authors.join(" and ")}},
  year={${year}},
  url={https://qrk.ng/research/${slug}}
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(citationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy citation:", err);
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Cite this paper
        </h2>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 transition-all duration-200"
          aria-label={copied ? "Copied!" : "Copy citation"}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="text-sm bg-secondary/50 rounded-lg p-4 overflow-x-auto border border-border/30">
        <code>{citationText}</code>
      </pre>
    </div>
  );
}
