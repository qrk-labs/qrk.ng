import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllResearchPapers } from "@/lib/research";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts();
  const papers = await getAllResearchPapers();

  const blogUrls = posts.map((post) => ({
    url: `https://qrk.ng/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const researchUrls = papers.map((paper) => ({
    url: `https://qrk.ng/research/${paper.slug}`,
    lastModified: new Date(paper.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: "https://qrk.ng",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://qrk.ng/research",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://qrk.ng/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://qrk.ng/about-us",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...researchUrls,
    ...blogUrls,
  ];
}
