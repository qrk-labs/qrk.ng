"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle, useTheme } from "@/lib/theme";
import { usePathname } from "next/navigation";

const isPalestineTime = () =>
  typeof localStorage === "object" &&
  ((new Date().getMonth() == 9 && new Date().getDate() == 7) ||
    localStorage.getItem("pstime"));
const logoPair = () =>
  isPalestineTime()
    ? ["/mix-light.svg", "/mix-dark.svg"]
    : ["/pure-light.svg", "/pure-dark.svg"];

export function Header({
  links,
  page,
}: {
  links: { label: string; href: string }[];
  page?: string;
}) {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [light, dark] = logoPair();

  return (
    <header className="border-border/70 bg-background/[0.88] supports-[backdrop-filter]:bg-background/[0.72] fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative">
            <Image
              src={theme === "light" ? light! : dark!}
              alt="QRK"
              width={36}
              height={36}
              className="h-9 w-9 transition-transform group-hover:scale-105"
            />
          </div>
          <div className="hidden leading-none sm:block">
            <span className="block text-sm font-medium tracking-[0.18em] uppercase">
              QRK
            </span>
            <span className="text-muted-foreground mt-1 block text-[0.65rem] tracking-[0.2em] uppercase">
              {page ?? "Research lab"}
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                className={`hover:text-primary relative px-3 py-2 text-sm font-light transition-colors ${
                  isActive ? "text-primary" : ""
                }`}
                href={link.href}
                key={link.label}
              >
                {link.label}
                {isActive && (
                  <span className="bg-primary absolute right-3 bottom-0 left-3 h-px" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        <nav className="flex items-center gap-2 md:hidden">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                className={`hover:text-primary px-1.5 py-1 text-xs font-light transition-colors ${
                  isActive ? "text-primary" : ""
                }`}
                href={link.href}
                key={link.label}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground hidden items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase lg:flex">
            <span className="bg-accent h-1.5 w-1.5" />
            Research archive
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
