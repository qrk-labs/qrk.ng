import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ResearchMetadata } from "@/types/research";

const researchDirectory = path.join(process.cwd(), "src/content/research");

export interface ResearchPaper extends ResearchMetadata {
  slug: string;
  content: string;
}

export async function getAllResearchPapers(): Promise<ResearchPaper[]> {
  try {
    if (!fs.existsSync(researchDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(researchDirectory);
    const allPapers = fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(researchDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
          slug,
          content,
          ...(data as ResearchMetadata),
        };
      });

    // Sort papers by date in descending order
    return allPapers.sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error reading research papers:", error);
    return [];
  }
}

export async function getResearchPaperMetadata(
  slug: string
): Promise<ResearchMetadata | null> {
  try {
    const fullPath = path.join(researchDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return data as ResearchMetadata;
  } catch (error) {
    console.error(`Error reading research paper metadata for ${slug}:`, error);
    return null;
  }
}

export async function getResearchPaperSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(researchDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(researchDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => fileName.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error("Error reading research paper slugs:", error);
    return [];
  }
}
