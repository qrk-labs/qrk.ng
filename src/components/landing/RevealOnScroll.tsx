"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "scale-in";

interface RevealOnScrollProps {
  children: ReactNode;
  animation?: AnimationType;
  threshold?: number;
  delay?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  animation = "fade-up",
  threshold = 0.1,
  delay = 0,
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if element is already in viewport on mount
    const rect = element.getBoundingClientRect();
    const isInViewport =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        isVisible ? "reveal-visible" : "reveal-hidden",
        isVisible && `animate-${animation}`,
        className
      )}
    >
      {children}
    </div>
  );
}
