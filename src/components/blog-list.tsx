"use client";

import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import ContentFilter from "@/components/content-filter";

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-2xl border border-border/60 bg-card/20 transition-colors hover:border-primary/40"
      >
        <div className="border-b border-border/60 bg-muted/20 px-5 py-3 md:px-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <User className="h-4 w-4" strokeWidth={1.5} />
              <span>{post.author}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" strokeWidth={1.5} />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-5 px-5 py-6 md:px-6 md:py-7">
          <h2 className="text-2xl leading-tight font-light tracking-tight transition-colors group-hover:text-primary md:text-3xl">
            {post.title}
          </h2>

          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {post.excerpt}
          </p>

          {post.tags && post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border/70 bg-background px-2.5 py-1 text-xs text-foreground/85"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="flex items-center gap-2 pt-1 text-sm font-medium text-primary transition-all group-hover:gap-3">
            <span>Read article</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <ContentFilter
      items={posts}
      getSearchableText={(post) =>
        `${post.title} ${post.excerpt} ${post.author} ${post.tags?.join(" ") ?? ""}`
      }
      getTags={(post) => post.tags}
      placeholder="Search articles..."
    >
      {(filteredPosts) => (
        <div className="space-y-6 md:space-y-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </ContentFilter>
  );
}
