import type { PropsWithChildren } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Users, FileText, ExternalLink } from "lucide-react";
import type { ResearchMetadata } from "@/types/research";
import { RevealOnScroll, FloatingShapes } from "@/components/landing";
import Citation from "@/components/citation";

function StatusBadge({ status }: { status: string }) {
  const colors = {
    draft: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    preprint: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    published: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${colors[status as keyof typeof colors] ?? colors.draft}`}
    >
      {status}
    </span>
  );
}

interface ResearchPostProps {
  meta: ResearchMetadata;
  slug: string;
}

export default async function ResearchPost({
  meta,
  slug,
  children,
}: PropsWithChildren<ResearchPostProps>) {
  const year = new Date(meta.publishedAt).getFullYear();

  return (
    <article>
      {/* Hero Header */}
      <header className="relative min-h-[50vh] flex items-end overflow-hidden pt-20 pb-16 md:pb-24">
        <FloatingShapes />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <RevealOnScroll animation="fade-up">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Research
            </Link>
          </RevealOnScroll>

          <RevealOnScroll animation="fade-up" delay={100}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <StatusBadge status={meta.status} />
              {meta.pdf && (
                <a
                  href={meta.pdf}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="w-4 h-4" />
                  PDF
                </a>
              )}
              {meta.arxiv && (
                <a
                  href={meta.arxiv}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  arXiv
                </a>
              )}
            </div>
          </RevealOnScroll>

          <RevealOnScroll animation="fade-up" delay={150}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.1] max-w-4xl">
              {meta.title}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll animation="fade-up" delay={200}>
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" strokeWidth={1.5} />
                <span>{meta.authors.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                <span>
                  {new Date(meta.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll animation="fade-up" delay={250}>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/20 rounded-full mt-8" />
          </RevealOnScroll>
        </div>
      </header>

      {/* Abstract */}
      <div className="container mx-auto px-4 md:px-8 -mt-8 mb-12">
        <RevealOnScroll animation="fade-up" delay={300}>
          <div className="max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Abstract
              </h2>
              <p className="text-lg leading-relaxed text-foreground/90">
                {meta.abstract}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Tags */}
      {meta.tags && meta.tags.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 mb-12">
          <RevealOnScroll animation="fade-up" delay={350}>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 pb-16">
        <RevealOnScroll animation="fade-up" delay={400}>
          <div className="max-w-3xl mx-auto">
            <div className="blog-content prose prose-lg dark:prose-invert max-w-none prose-headings:font-light prose-headings:tracking-tight prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mb-6 prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-lg prose-p:leading-[1.8] prose-p:text-foreground/80 prose-p:mb-6 prose-pre:bg-muted prose-pre:border prose-pre:border-border/40">
              {children}
            </div>
          </div>
        </RevealOnScroll>

        {/* Citation */}
        <RevealOnScroll animation="fade-up" className="mt-16 md:mt-24">
          <div className="max-w-3xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />
            <Citation
              slug={slug}
              title={meta.title}
              authors={meta.authors}
              year={year}
            />
          </div>
        </RevealOnScroll>

        {/* Footer */}
        <RevealOnScroll animation="fade-up" className="mt-12">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all papers
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </article>
  );
}
