"use client";

import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleClick}
      className="text-muted-foreground/60 hover:text-muted-foreground absolute bottom-8 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 transition-colors"
      aria-label="Scroll to next section"
    >
      <span className="text-xs font-light tracking-widest uppercase">
        Scroll
      </span>
      <ChevronDown className="animate-scan-down h-5 w-5" />
    </button>
  );
}
