import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogMetadata } from "@/types/blog";

const blogDirectory = path.join(process.cwd(), "src/content/blog");

export interface BlogPost extends BlogMetadata {
  slug: string;
  excerpt: string;
  content: string;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        // Generate excerpt (first 200 characters)
        const excerpt =
          content.replace(/\n/g, " ").trim().slice(0, 200) + "...";

        return {
          slug,
          excerpt,
          content,
          ...(data as BlogMetadata),
        };
      });

    // Filter out unpublished posts (published defaults to true if not set)
    const publishedPosts = allPostsData.filter(
      (post) => post.published !== false
    );

    // Sort posts by date in descending order
    return publishedPosts.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export async function getBlogPostMetadata(
  slug: string,
): Promise<BlogMetadata | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return data as BlogMetadata;
  } catch (error) {
    console.error(`Error reading blog post metadata for ${slug}:`, error);
    return null;
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const fileNames = fs.readdirSync(blogDirectory);
    const slugs: string[] = [];

    for (const fileName of fileNames) {
      if (!fileName.endsWith(".mdx")) continue;

      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      // Only include published posts (published defaults to true if not set)
      if ((data as BlogMetadata).published !== false) {
        slugs.push(slug);
      }
    }

    return slugs;
  } catch (error) {
    console.error("Error reading blog post slugs:", error);
    return [];
  }
}
