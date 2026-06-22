"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CitationProps {
  slug: string;
  title: string;
  authors: string[];
  year: number;
  publicationUrl?: string;
  publicationVenue?: string;
}

function getDoi(publicationUrl?: string) {
  if (!publicationUrl) return undefined;

  const doiMatch = /doi\.org\/(.+)$/.exec(publicationUrl);
  return doiMatch?.[1];
}

export default function Citation({
  slug,
  title,
  authors,
  year,
  publicationUrl,
  publicationVenue,
}: CitationProps) {
  const [copied, setCopied] = useState(false);
  const doi = getDoi(publicationUrl);
  const url = publicationUrl ?? `https://qrk.ng/research/${slug}`;

  const citationText = doi
    ? `@misc{qrk_${slug.replace(/-/g, "_")}_${year},
  title={${title}},
  author={${authors.join(" and ")}},
  year={${year}},
  publisher={${publicationVenue ?? "Zenodo"}},
  doi={${doi}},
  url={${url}}
}`
    : `@article{qrk_${slug.replace(/-/g, "_")}_${year},
  title={${title}},
  author={${authors.join(" and ")}},
  year={${year}},
  url={${url}}
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
    <div className="group relative">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
          Cite this paper
        </h2>
        <button
          onClick={handleCopy}
          className="border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-all duration-200"
          aria-label={copied ? "Copied!" : "Copy citation"}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-secondary/50 border-border/30 overflow-x-auto rounded-lg border p-4 text-sm">
        <code>{citationText}</code>
      </pre>
    </div>
  );
}
