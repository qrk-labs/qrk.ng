export interface BlogMetadata {
  title: string;
  author: string;
  publishedAt: string;
  description?: string;
  tags?: string[];
  image?: string;
  published?: boolean;
}

export interface BlogModule {
  default: React.ComponentType;
  metadata: BlogMetadata;
}
