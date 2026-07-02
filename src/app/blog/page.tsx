import { getAllBlogPosts } from "@/lib/blog";
import BlogList from "@/components/blog-list";
import { PenLine } from "lucide-react";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="relative overflow-hidden pt-28 pb-20">
      <div
        aria-hidden
        className="from-secondary/30 via-background/5 to-background/45 pointer-events-none absolute inset-0 z-0 bg-gradient-to-b"
      />

      <section className="relative z-10 mx-auto w-full max-w-5xl px-4 md:px-8">
        <p className="text-primary text-xs font-medium tracking-[0.24em] uppercase">
          Field notes
        </p>
        <h1 className="mt-4 text-4xl leading-tight font-light tracking-tight md:text-6xl">
          Notes from the lab bench.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-3xl text-lg leading-relaxed">
          Technical writing, research context, and practical notes from the QRK
          team. Browse by topic, or jump straight into the latest post.
        </p>
      </section>

      <section className="relative z-10 mx-auto mt-14 w-full max-w-6xl px-4 md:px-8">
        {posts.length === 0 ? (
          <div className="border-border/70 bg-card/55 border px-6 py-14 text-center md:px-10">
            <div className="border-border/60 mx-auto flex h-16 w-16 items-center justify-center rounded-full border">
              <PenLine
                className="text-muted-foreground/70 h-6 w-6"
                strokeWidth={1.5}
              />
            </div>
            <p className="text-foreground mt-6 text-2xl font-light">
              No blog posts yet.
            </p>
            <p className="text-muted-foreground mt-3 text-base">
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
