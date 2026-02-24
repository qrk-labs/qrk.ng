import { notFound } from "next/navigation";
import Link from "next/link";
import { getResearchPaperSlugs, getResearchPaperMetadata } from "@/lib/research";
import { ArticleJsonLd } from "@/components/json-ld";
import type { ResearchModule } from "@/types/research";

interface ResearchPaperPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getResearchPaperSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ResearchPaperPageProps) {
  const { slug } = await params;
  const metadata = await getResearchPaperMetadata(slug);

  if (!metadata) {
    return {
      title: "Paper Not Found",
    };
  }

  const ogImage = `/api/og?title=${encodeURIComponent(metadata.title)}&author=${encodeURIComponent(metadata.authors[0] ?? "QRK Labs")}&type=research`;

  return {
    title: metadata.title,
    description: metadata.abstract,
    keywords: metadata.tags,
    openGraph: {
      type: "article",
      title: metadata.title,
      description: metadata.abstract,
      publishedTime: metadata.publishedAt,
      authors: metadata.authors,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.abstract,
      images: [ogImage],
    },
  };
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    draft: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    preprint: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    published: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded text-sm font-medium border ${colors[status as keyof typeof colors] ?? colors.draft}`}
    >
      {status}
    </span>
  );
}

export default async function ResearchPaperPage({
  params,
}: ResearchPaperPageProps) {
  const { slug } = await params;
  const metadata = await getResearchPaperMetadata(slug);

  if (!metadata) {
    notFound();
  }

  try {
    const paperModule = (await import(
      `@/content/research/${slug}.mdx`
    )) as ResearchModule;
    const Content = paperModule.default;

    if (!Content) {
      notFound();
    }

    const ogImage = `/api/og?title=${encodeURIComponent(metadata.title)}&author=${encodeURIComponent(metadata.authors[0] ?? "QRK Labs")}&type=research`;

    return (
      <main className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
        <ArticleJsonLd
          title={metadata.title}
          description={metadata.abstract}
          author={metadata.authors.join(", ")}
          publishedAt={metadata.publishedAt}
          url={`https://qrk.ng/research/${slug}`}
          image={ogImage}
        />

        {/* Back link */}
        <Link
          href="/research"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          ← Back to Research
        </Link>

        {/* Header */}
        <header className="mb-12 pb-8 border-b border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={metadata.status} />
            {metadata.pdf && (
              <a
                href={metadata.pdf}
                className="text-sm text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                PDF ↗
              </a>
            )}
            {metadata.arxiv && (
              <a
                href={metadata.arxiv}
                className="text-sm text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                arXiv ↗
              </a>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {metadata.title}
          </h1>

          <p className="text-muted-foreground mb-4">
            {metadata.authors.join(", ")} ·{" "}
            {new Date(metadata.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Abstract */}
          <div className="bg-secondary/30 rounded-lg p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Abstract
            </h2>
            <p className="text-foreground leading-relaxed">{metadata.abstract}</p>
          </div>

          {/* Tags */}
          {metadata.tags && metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary prose-code:text-primary prose-pre:bg-secondary">
          <Content />
        </article>

        {/* Citation */}
        <footer className="mt-16 pt-8 border-t border-border/50">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            Cite this paper
          </h2>
          <pre className="text-sm bg-secondary/50 rounded-lg p-4 overflow-x-auto">
            <code>
              {`@article{qrk_${slug.replace(/-/g, "_")}_${new Date(metadata.publishedAt).getFullYear()},
  title={${metadata.title}},
  author={${metadata.authors.join(" and ")}},
  year={${new Date(metadata.publishedAt).getFullYear()}},
  url={https://qrk.ng/research/${slug}}
}`}
            </code>
          </pre>
        </footer>
      </main>
    );
  } catch {
    notFound();
  }
}
