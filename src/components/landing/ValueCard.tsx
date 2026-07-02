import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const valueCardVariants = cva(
  "group relative border border-border/70 bg-card/55 p-6 transition-all duration-500 md:p-8",
  {
    variants: {
      size: {
        large: "col-span-2 row-span-2",
        medium: "col-span-2 row-span-1 md:col-span-2",
        small: "col-span-1 row-span-1",
        full: "col-span-2",
      },
      hover: {
        tilt: "hover:rotate-1 hover:scale-[1.02]",
        lift: "hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5",
        glow: "hover:border-primary/40 hover:shadow-[0_0_40px_-10px_var(--card-accent)]",
        none: "",
      },
    },
    defaultVariants: {
      size: "medium",
      hover: "lift",
    },
  },
);

interface ValueCardProps extends VariantProps<typeof valueCardVariants> {
  icon: ReactNode;
  title: string;
  description: string;
  hiddenContent?: string;
  className?: string;
  accentClass?: string;
}

export function ValueCard({
  icon,
  title,
  description,
  hiddenContent,
  className,
  accentClass,
  size,
  hover,
}: ValueCardProps) {
  return (
    <div
      className={cn(valueCardVariants({ size, hover }), accentClass, className)}
      data-slot="value-card"
    >
      {/* Accent gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--card-accent)]/0 to-[var(--card-accent)]/0 transition-all duration-500 group-hover:from-[var(--card-accent)]/5 group-hover:to-transparent" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Icon */}
        <div className="text-foreground/70 group-hover:text-foreground mb-4 transition-colors md:mb-6">
          <div className="h-10 w-10 md:h-12 md:w-12">{icon}</div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-light tracking-tight md:mb-3 md:text-2xl">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground flex-1 text-sm leading-relaxed md:text-base">
          {description}
        </p>

        {/* Hidden content that reveals on hover */}
        {hiddenContent && (
          <p className="text-muted-foreground/80 mt-4 translate-y-2 text-sm opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {hiddenContent}
          </p>
        )}
      </div>
    </div>
  );
}

export { valueCardVariants };
