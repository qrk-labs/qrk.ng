export interface ResearchMetadata {
  title: string;
  authors: string[];
  publishedAt: string;
  abstract: string;
  tags?: string[];
  status: "draft" | "manuscript" | "preprint" | "published";
  pdf?: string;
  arxiv?: string;
  publicationUrl?: string;
  publicationVenue?: string;
  published?: boolean;
}

export interface ResearchModule {
  default: React.ComponentType;
  metadata: ResearchMetadata;
}
