import Link from "next/link";
import { getAllResearchPapers } from "@/lib/research";

export const metadata = {
  title: "Research",
  description:
    "Technical papers and research notes from QRK Labs on thought injection, knowledge-augmented generation, and human-centric AI.",
};

function StatusBadge({ status }: { status: string }) {
  const colors = {
    draft: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    preprint: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    published: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${colors[status as keyof typeof colors] ?? colors.draft}`}
    >
      {status}
    </span>
  );
}

export default async function ResearchPage() {
  const papers = await getAllResearchPapers();

  return (
    <main className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Research</h1>
        <p className="text-lg text-muted-foreground">
          Technical papers, preprints, and research notes. Less polish, more
          substance. These are working documents — expect updates.
        </p>
      </header>

      {papers.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-2">Research papers coming soon.</p>
          <p className="text-sm">
            Check out our{" "}
            <Link href="/blog" className="text-primary hover:underline">
              blog
            </Link>{" "}
            in the meantime.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {papers.map((paper) => (
            <article
              key={paper.slug}
              className="border border-border/50 rounded-lg p-6 hover:border-border transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <Link
                  href={`/research/${paper.slug}`}
                  className="text-xl font-semibold hover:text-primary transition-colors"
                >
                  {paper.title}
                </Link>
                <StatusBadge status={paper.status} />
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                {paper.authors.join(", ")} ·{" "}
                {new Date(paper.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {paper.abstract}
              </p>

              {paper.tags && paper.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
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
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
