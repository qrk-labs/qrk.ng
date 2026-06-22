import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export function ResponsiveTable({
  className,
  ...props
}: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="responsive-table not-prose border-border/70 bg-card/50 shadow-foreground/[0.03] relative my-8 w-full max-w-none overflow-hidden rounded-lg border shadow-sm">
      <div
        aria-label="Scrollable data table"
        className="overflow-x-auto overscroll-x-contain"
        role="region"
        tabIndex={0}
      >
        <table
          className={cn(
            "responsive-content-table w-full min-w-[44rem] border-separate border-spacing-0 text-left text-sm leading-relaxed",
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}

export function TableHead({
  className,
  ...props
}: ComponentPropsWithoutRef<"thead">) {
  return <thead className={cn("bg-muted/60", className)} {...props} />;
}

export function TableBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"tbody">) {
  return (
    <tbody
      className={cn("[&_tr:last-child_td]:border-b-0", className)}
      {...props}
    />
  );
}

export function TableRow({
  className,
  ...props
}: ComponentPropsWithoutRef<"tr">) {
  return (
    <tr
      className={cn("even:bg-muted/[0.16] hover:bg-primary/[0.055]", className)}
      {...props}
    />
  );
}

export function TableHeaderCell({
  className,
  style,
  ...props
}: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={cn(
        "border-border/80 text-foreground border-b px-4 py-3 text-xs font-medium tracking-[0.06em] whitespace-nowrap uppercase",
        "first:bg-muted first:sticky first:left-0 first:z-10",
        className,
      )}
      style={{ ...style, textAlign: "left" }}
      {...props}
    />
  );
}

export function TableCell({
  className,
  style,
  ...props
}: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className={cn(
        "border-border/60 text-foreground/80 border-b px-4 py-3 text-left align-top",
        "first:bg-card first:text-foreground/95 first:sticky first:left-0 first:z-10 first:font-light",
        "[&>code]:whitespace-nowrap",
        className,
      )}
      style={{ ...style, textAlign: "left" }}
      {...props}
    />
  );
}

export function TableCaption({
  className,
  ...props
}: ComponentPropsWithoutRef<"caption">) {
  return (
    <caption
      className={cn(
        "text-muted-foreground caption-bottom px-4 py-3 text-sm",
        className,
      )}
      {...props}
    />
  );
}
