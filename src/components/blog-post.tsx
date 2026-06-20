import type { PropsWithChildren } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import type { BlogMetadata } from "@/types/blog";

export default async function BlogPost({
  meta,
  children,
}: PropsWithChildren<{ meta: BlogMetadata }>) {
  const publishedDate = new Date(meta.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="relative overflow-hidden pt-24 pb-20">
      <div
        aria-hidden
        className="from-background/20 via-background/5 to-background/40 pointer-events-none absolute inset-0 z-0 bg-gradient-to-b"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 md:px-8">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <header className="border-border/70 mt-8 border-b pb-8">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
            Article
          </p>
          <h1 className="text-foreground mt-4 text-3xl leading-tight font-light tracking-tight md:text-5xl">
            {meta.title}
          </h1>
          {meta.description ? (
            <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed">
              {meta.description}
            </p>
          ) : null}

          <div className="text-muted-foreground mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <div className="inline-flex items-center gap-2">
              <User className="h-4 w-4" strokeWidth={1.5} />
              <span>{meta.author}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" strokeWidth={1.5} />
              <span>{publishedDate}</span>
            </div>
            {meta.tags && meta.tags.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4" strokeWidth={1.5} />
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-border/70 bg-card/40 text-foreground/85 rounded-md border px-2.5 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </header>

        <section className="mt-10 min-w-0">
          <div className="blog-content blog-article-content max-w-none">
            {children}
          </div>

          <div className="border-border/70 mt-14 border-t pt-6">
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
