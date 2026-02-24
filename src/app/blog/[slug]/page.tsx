import { notFound } from "next/navigation";
import { getBlogPostSlugs, getBlogPostMetadata } from "@/lib/blog";
import BlogPost from "@/components/blog-post";
import { ArticleJsonLd } from "@/components/json-ld";
import type { BlogModule } from "@/types/blog";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const metadata = await getBlogPostMetadata(slug);

  if (!metadata) {
    return {
      title: "Post Not Found",
    };
  }

  const description =
    metadata.description ??
    `${metadata.title} by ${metadata.author}`;

  // Use custom image if provided, otherwise use dynamic OG route
  const ogImage = metadata.image ?? `/api/og?title=${encodeURIComponent(metadata.title)}&author=${encodeURIComponent(metadata.author)}`;

  return {
    title: metadata.title,
    description,
    keywords: metadata.tags,
    openGraph: {
      type: "article",
      title: metadata.title,
      description,
      publishedTime: metadata.publishedAt,
      authors: [metadata.author],
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
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const metadata = await getBlogPostMetadata(slug);

  if (!metadata) {
    notFound();
  }

  try {
    const postModule = (await import(
      `@/content/blog/${slug}.mdx`
    )) as BlogModule;
    const Content = postModule.default;

    if (!Content) {
      notFound();
    }

    const description =
      metadata.description ?? `${metadata.title} by ${metadata.author}`;
    const ogImage =
      metadata.image ??
      `/api/og?title=${encodeURIComponent(metadata.title)}&author=${encodeURIComponent(metadata.author)}`;

    return (
      <main>
        <ArticleJsonLd
          title={metadata.title}
          description={description}
          author={metadata.author}
          publishedAt={metadata.publishedAt}
          url={`https://qrk.ng/blog/${slug}`}
          image={ogImage}
        />
        <BlogPost meta={metadata}>
          <Content />
        </BlogPost>
      </main>
    );
  } catch {
    notFound();
  }
}
