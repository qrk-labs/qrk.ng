import { notFound } from "next/navigation";
import { getResearchPaperSlugs, getResearchPaperMetadata } from "@/lib/research";
import ResearchPost from "@/components/research-post";
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

export default async function ResearchPaperPage({
  params,
}: ResearchPaperPageProps) {
  const { slug } = await params;
  const metadata = await getResearchPaperMetadata(slug);

  if (!metadata || metadata.published === false) {
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
      <main>
        <ArticleJsonLd
          title={metadata.title}
          description={metadata.abstract}
          author={metadata.authors.join(", ")}
          publishedAt={metadata.publishedAt}
          url={`https://qrk.ng/research/${slug}`}
          image={ogImage}
        />
        <ResearchPost meta={metadata} slug={slug}>
          <Content />
        </ResearchPost>
      </main>
    );
  } catch {
    notFound();
  }
}
