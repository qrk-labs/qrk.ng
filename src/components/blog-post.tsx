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
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background/20 via-background/5 to-background/40"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <header className="mt-8 border-b border-border/70 pb-10">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Article
          </p>
          <h1 className="mt-4 text-3xl leading-tight font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {meta.title}
          </h1>
          {meta.description ? (
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {meta.description}
            </p>
          ) : null}
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border/70 bg-card/40 p-5">
              <h2 className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                Post Details
              </h2>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="flex items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase">
                    <User className="h-3.5 w-3.5" />
                    Author
                  </dt>
                  <dd className="mt-1 text-base text-foreground">{meta.author}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase">
                    <Calendar className="h-3.5 w-3.5" />
                    Published
                  </dt>
                  <dd className="mt-1 text-base text-foreground">{publishedDate}</dd>
                </div>
                {meta.tags && meta.tags.length > 0 ? (
                  <div>
                    <dt className="flex items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase">
                      <Tag className="h-3.5 w-3.5" />
                      Topics
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {meta.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border/70 bg-background px-2.5 py-1 text-xs text-foreground/85"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="blog-content prose prose-lg dark:prose-invert max-w-none">
              {children}
            </div>

            <div className="mt-16 border-t border-border/70 pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all posts
              </Link>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
