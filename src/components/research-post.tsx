import type { PropsWithChildren } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Users,
  FileText,
  ExternalLink,
} from "lucide-react";
import type { ResearchMetadata } from "@/types/research";
import { RevealOnScroll, FloatingShapes } from "@/components/landing";
import Citation from "@/components/citation";

type ResearchStatus = ResearchMetadata["status"];

function getDisplayStatus(status: ResearchStatus) {
  return status === "draft" ? "manuscript" : status;
}

function StatusBadge({ status }: { status: ResearchStatus }) {
  const colors: Record<ResearchStatus, string> = {
    draft: "bg-secondary/60 text-secondary-foreground border-border/60",
    manuscript: "bg-secondary/60 text-secondary-foreground border-border/60",
    preprint: "bg-primary/10 text-primary border-primary/25",
    published: "bg-chart-2/15 text-chart-2 border-chart-2/30",
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium ${colors[status]}`}
    >
      {getDisplayStatus(status)}
    </span>
  );
}

function ResearchStage({ meta }: { meta: ResearchMetadata }) {
  const normalizedStatus = getDisplayStatus(meta.status);
  const stages = [
    {
      key: "manuscript",
      label: "Manuscript",
      description: "Working draft",
      href: undefined,
    },
    {
      key: "preprint",
      label: "Preprint",
      description: "Public preprint",
      href: undefined,
    },
    {
      key: "published",
      label: meta.publicationVenue ?? "Published",
      description: meta.publicationUrl ? "Publication link" : "Peer-reviewed",
      href: meta.publicationUrl,
    },
  ] as const;
  const activeIndex = stages.findIndex(
    (stage) => stage.key === normalizedStatus,
  );

  return (
    <div className="border-border/40 bg-card/40 rounded-2xl border p-4 md:p-5">
      <h2 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
        Paper Status
      </h2>
      <div className="grid gap-3 md:grid-cols-3">
        {stages.map((stage, index) => {
          const isActive = index === activeIndex;
          const isComplete = activeIndex > index;
          const isUpcoming = activeIndex < index;
          const content = (
            <>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                  isActive || isComplete
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border/70 bg-secondary/30 text-muted-foreground"
                }`}
              >
                {index + 1}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-medium">
                  {stage.label}
                  {stage.href ? <ExternalLink className="h-3.5 w-3.5" /> : null}
                </span>
                <span className="text-muted-foreground mt-0.5 block text-xs">
                  {isActive ? "Current stage" : stage.description}
                </span>
              </span>
            </>
          );

          const className = `flex items-start gap-3 rounded-lg border px-3 py-3 text-left text-sm transition-colors ${
            isActive
              ? "border-primary/35 bg-primary/10 text-foreground"
              : isComplete
                ? "border-primary/20 bg-primary/5 text-foreground/85"
                : "border-border/50 bg-secondary/20 text-muted-foreground"
          } ${isUpcoming ? "opacity-70" : ""}`;

          return stage.href ? (
            <a
              key={stage.key}
              href={stage.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${className} hover:border-primary/35 hover:text-foreground`}
            >
              {content}
            </a>
          ) : (
            <div key={stage.key} className={className}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
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
      <header className="relative flex min-h-[50vh] items-end overflow-hidden pt-20 pb-16 md:pb-24">
        <FloatingShapes />

        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <RevealOnScroll animation="fade-up">
            <Link
              href="/research"
              className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Research
            </Link>
          </RevealOnScroll>

          <RevealOnScroll animation="fade-up" delay={100}>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <StatusBadge status={meta.status} />
              {meta.pdf && (
                <a
                  href={meta.pdf}
                  className="border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="h-4 w-4" />
                  PDF
                </a>
              )}
              {meta.arxiv && (
                <a
                  href={meta.arxiv}
                  className="border-border/50 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  arXiv
                </a>
              )}
              {meta.publicationUrl && (
                <a
                  href={meta.publicationUrl}
                  className="border-chart-2/30 bg-chart-2/10 text-chart-2 hover:bg-chart-2/15 inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Published
                </a>
              )}
            </div>
          </RevealOnScroll>

          <RevealOnScroll animation="fade-up" delay={150}>
            <h1 className="max-w-4xl text-3xl leading-[1.1] font-extralight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {meta.title}
            </h1>
          </RevealOnScroll>

          <RevealOnScroll animation="fade-up" delay={200}>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
              <div className="text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" strokeWidth={1.5} />
                <span>{meta.authors.join(", ")}</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" strokeWidth={1.5} />
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
            <div className="from-primary to-primary/20 mt-8 h-1 w-24 rounded-full bg-gradient-to-r" />
          </RevealOnScroll>
        </div>
      </header>

      {/* Abstract */}
      <div className="container mx-auto -mt-8 mb-12 px-4 md:px-8">
        <RevealOnScroll animation="fade-up" delay={300}>
          <div className="mx-auto max-w-3xl space-y-6">
            <ResearchStage meta={meta} />
            <div className="bg-card/50 border-border/40 rounded-2xl border p-6 backdrop-blur-sm md:p-8">
              <h2 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase">
                Abstract
              </h2>
              <p className="text-foreground/90 text-lg leading-relaxed">
                {meta.abstract}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Tags */}
      {meta.tags && meta.tags.length > 0 && (
        <div className="container mx-auto mb-12 px-4 md:px-8">
          <RevealOnScroll animation="fade-up" delay={350}>
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-wrap gap-2">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary text-secondary-foreground rounded-lg px-3 py-1.5 text-sm"
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
      <div className="container mx-auto px-4 pb-16 md:px-8">
        <RevealOnScroll animation="fade-up" delay={400}>
          <div className="mx-auto max-w-3xl">
            <div className="blog-content prose prose-lg dark:prose-invert prose-headings:font-light prose-headings:tracking-tight prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mb-6 prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-lg prose-p:leading-[1.8] prose-p:text-foreground/80 prose-p:mb-6 prose-pre:bg-muted prose-pre:border prose-pre:border-border/40 max-w-none">
              {children}
            </div>
          </div>
        </RevealOnScroll>

        {/* Citation */}
        <RevealOnScroll animation="fade-up" className="mt-16 md:mt-24">
          <div className="mx-auto max-w-3xl">
            <div className="via-border mb-8 h-px bg-gradient-to-r from-transparent to-transparent" />
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
          <div className="mx-auto max-w-3xl">
            <Link
              href="/research"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all papers
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </article>
  );
}
