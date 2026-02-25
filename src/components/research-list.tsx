"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Users } from "lucide-react";
import type { ResearchPaper } from "@/lib/research";
import { RevealOnScroll } from "@/components/landing";
import ContentFilter from "@/components/content-filter";

function StatusBadge({ status }: { status: string }) {
  const colors = {
    draft: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    preprint: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    published: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border ${colors[status as keyof typeof colors] ?? colors.draft}`}
    >
      {status}
    </span>
  );
}

function ResearchCard({
  paper,
  index,
  total,
}: {
  paper: ResearchPaper;
  index: number;
  total: number;
}) {
  return (
    <RevealOnScroll
      animation={index % 2 === 0 ? "fade-left" : "fade-right"}
      delay={index * 100}
    >
      <article className="group">
        <Link
          href={`/research/${paper.slug}`}
          className="block p-6 md:p-8 lg:p-10 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
        >
          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* Number indicator */}
            <div className="col-span-12 md:col-span-1">
              <span className="text-6xl md:text-7xl font-extralight text-foreground/10 group-hover:text-primary/20 transition-colors">
                {String(total - index).padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="col-span-12 md:col-span-11 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight group-hover:text-primary transition-colors leading-tight">
                  {paper.title}
                </h2>
                <StatusBadge status={paper.status} />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" strokeWidth={1.5} />
                  <span>{paper.authors.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  <span>
                    {new Date(paper.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
              </div>

              <p className="text-base md:text-lg leading-relaxed text-muted-foreground line-clamp-3 max-w-3xl">
                {paper.abstract}
              </p>

              {paper.tags && paper.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 text-primary font-light pt-2 group-hover:gap-4 transition-all">
                <span>Read paper</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      </article>
    </RevealOnScroll>
  );
}

export default function ResearchList({ papers }: { papers: ResearchPaper[] }) {
  return (
    <ContentFilter
      items={papers}
      getSearchableText={(paper) =>
        `${paper.title} ${paper.abstract} ${paper.authors.join(" ")} ${paper.tags?.join(" ") ?? ""}`
      }
      getTags={(paper) => paper.tags}
      placeholder="Search papers..."
    >
      {(filteredPapers) => (
        <div className="space-y-8 md:space-y-12">
          {filteredPapers.map((paper, index) => (
            <ResearchCard
              key={paper.slug}
              paper={paper}
              index={index}
              total={filteredPapers.length}
            />
          ))}
        </div>
      )}
    </ContentFilter>
  );
}
