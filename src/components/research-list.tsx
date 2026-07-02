"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Users } from "lucide-react";
import type { ResearchPaper } from "@/lib/research";
import { RevealOnScroll } from "@/components/landing";
import ContentFilter from "@/components/content-filter";

type ResearchStatus = ResearchPaper["status"];

function getDisplayStatus(status: ResearchStatus) {
  return status === "draft" ? "manuscript" : status;
}

function StatusBadge({ status }: { status: ResearchStatus }) {
  const colors: Record<ResearchStatus, string> = {
    draft: "bg-secondary/60 text-secondary-foreground border-border/70",
    manuscript: "bg-secondary/60 text-secondary-foreground border-border/70",
    preprint: "bg-primary/10 text-primary border-primary/30",
    published: "bg-accent/20 text-foreground border-accent/40",
  };

  return (
    <span
      className={`inline-flex items-center rounded border px-2.5 py-1 text-xs font-medium ${colors[status]}`}
    >
      {getDisplayStatus(status)}
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
          className="border-border/70 bg-card/55 hover:border-primary/45 hover:bg-card/75 block border p-6 transition-colors duration-300 md:p-8 lg:p-10"
        >
          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* Number indicator */}
            <div className="col-span-12 md:col-span-1">
              <span className="text-foreground/10 group-hover:text-primary/25 text-6xl font-extralight transition-colors md:text-7xl">
                {String(total - index).padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="col-span-12 space-y-4 md:col-span-11">
              <div className="flex items-start justify-between gap-4">
                <h2 className="group-hover:text-primary text-2xl leading-tight font-light tracking-tight transition-colors md:text-3xl lg:text-4xl">
                  {paper.title}
                </h2>
                <StatusBadge status={paper.status} />
              </div>

              <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" strokeWidth={1.5} />
                  <span>{paper.authors.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" strokeWidth={1.5} />
                  <span>
                    {new Date(paper.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground line-clamp-3 max-w-3xl text-base leading-relaxed md:text-lg">
                {paper.abstract}
              </p>

              {paper.tags && paper.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border-border/70 bg-secondary/70 text-secondary-foreground border px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-primary flex items-center gap-2 pt-2 font-light transition-all group-hover:gap-4">
                <span>Read paper</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
