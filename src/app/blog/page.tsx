import { getAllBlogPosts } from "@/lib/blog";
import BlogList from "@/components/blog-list";
import { PenLine } from "lucide-react";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="relative overflow-hidden pt-24 pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background/20 via-background/5 to-background/35"
      />

      <section className="relative z-10 mx-auto w-full max-w-5xl px-4 md:px-8">
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Blog
        </p>
        <h1 className="mt-4 text-4xl leading-tight font-light tracking-tight md:text-6xl">
          Notes from QRK
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Thoughts, field notes, and technical writing from the QRK team.
          Browse by topic, or jump straight into the latest post.
        </p>
      </section>

      <section className="relative z-10 mx-auto mt-14 w-full max-w-6xl px-4 md:px-8">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-card/30 px-6 py-14 text-center md:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border/60">
              <PenLine
                className="h-6 w-6 text-muted-foreground/70"
                strokeWidth={1.5}
              />
            </div>
            <p className="mt-6 text-2xl font-light text-foreground">
              No blog posts yet.
            </p>
            <p className="mt-3 text-base text-muted-foreground">
              New writing will appear here soon.
            </p>
          </div>
        ) : (
          <BlogList posts={posts} />
        )}
      </section>
    </main>
  );
}
