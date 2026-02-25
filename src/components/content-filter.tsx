"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";

interface ContentFilterProps<T> {
  items: T[];
  getSearchableText: (item: T) => string;
  getTags?: (item: T) => string[] | undefined;
  children: (filteredItems: T[]) => React.ReactNode;
  placeholder?: string;
}

export default function ContentFilter<T>({
  items,
  getSearchableText,
  getTags,
  children,
  placeholder = "Search...",
}: ContentFilterProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    if (!getTags) return [];
    const tags = new Set<string>();
    items.forEach((item) => {
      const itemTags = getTags(item);
      if (itemTags) {
        itemTags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [items, getTags]);

  // Filter items based on search query and selected tags
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search filter
      const searchableText = getSearchableText(item).toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        searchableText.includes(searchQuery.toLowerCase());

      // Tag filter
      const itemTags = getTags?.(item);
      const matchesTags =
        selectedTags.length === 0 ||
        (itemTags && selectedTags.some((tag) => itemTags.includes(tag)));

      return matchesSearch && matchesTags;
    });
  }, [items, searchQuery, selectedTags, getSearchableText, getTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery !== "" || selectedTags.length > 0;

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/50 text-secondary-foreground border-border/50 hover:border-primary/30 hover:bg-secondary"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>
              Showing {filteredItems.length} of {items.length} results
            </span>
            <button
              onClick={clearFilters}
              className="text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Filtered Content */}
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-xl text-muted-foreground mb-2">No results found</p>
          <p className="text-muted-foreground/70">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        children(filteredItems)
      )}
    </div>
  );
}
