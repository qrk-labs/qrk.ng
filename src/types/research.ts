export interface ResearchMetadata {
  title: string;
  authors: string[];
  publishedAt: string;
  abstract: string;
  tags?: string[];
  status: "draft" | "preprint" | "published";
  pdf?: string;
  arxiv?: string;
}

export interface ResearchModule {
  default: React.ComponentType;
  metadata: ResearchMetadata;
}
