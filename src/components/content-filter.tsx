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
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
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
          <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="border-border/70 bg-card/55 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 w-full border py-3 pr-4 pl-12 transition-all focus:ring-2 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 transition-colors"
            >
              <X className="h-4 w-4" />
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
                className={`border px-3 py-1.5 text-sm transition-all ${
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
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
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
          <p className="text-muted-foreground mb-2 text-xl">No results found</p>
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
