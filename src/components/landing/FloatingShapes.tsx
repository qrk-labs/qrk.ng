export function FloatingShapes() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,oklch(var(--border)/0.55)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--border)/0.38)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] [background-size:56px_56px] opacity-[0.38]" />

      <svg
        className="text-primary/35 absolute inset-x-0 top-20 h-[420px] w-full"
        viewBox="0 0 1440 420"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 260H210C265 260 292 224 338 224H470C520 224 543 180 596 180H756C814 180 836 126 896 126H1050C1114 126 1134 184 1196 184H1440"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M0 332H142C198 332 224 292 276 292H412C464 292 492 334 548 334H700C762 334 788 252 850 252H990C1052 252 1078 302 1138 302H1440"
          stroke="currentColor"
          strokeDasharray="8 12"
          strokeWidth="1"
        />
        <path
          d="M185 80V224M596 180V52M896 126V300M1196 184V70"
          stroke="currentColor"
          strokeDasharray="3 10"
          strokeWidth="1"
        />
      </svg>

      <svg
        className="text-primary/25 absolute top-24 right-[8%] hidden h-44 w-64 rotate-3 md:block"
        viewBox="0 0 256 176"
        fill="none"
      >
        <path
          d="M0 132C28 88 58 66 92 66C134 66 154 110 198 110C224 110 241 95 256 74"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M36 28V152M92 12V160M148 28V152M204 12V160"
          stroke="currentColor"
          strokeDasharray="4 10"
          strokeWidth="1"
          opacity="0.55"
        />
        <circle cx="92" cy="66" r="5" fill="currentColor" opacity="0.55" />
        <circle cx="198" cy="110" r="5" fill="currentColor" opacity="0.55" />
      </svg>

      <svg
        className="text-accent/40 absolute bottom-24 left-[7%] hidden h-28 w-28 md:block"
        viewBox="0 0 112 112"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="56" cy="56" r="52" stroke="currentColor" strokeWidth="1" opacity="0.30" />
        <circle cx="56" cy="56" r="36" stroke="currentColor" strokeWidth="1" opacity="0.20" strokeDasharray="4 6" />
        <circle cx="56" cy="56" r="20" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        <line x1="16" y1="56" x2="96" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <line x1="56" y1="16" x2="56" y2="96" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <circle cx="56" cy="12" r="3" fill="currentColor" opacity="0.60" />
        <circle cx="56" cy="100" r="3" fill="currentColor" opacity="0.60" />
        <circle cx="12" cy="56" r="3" fill="currentColor" opacity="0.60" />
        <circle cx="100" cy="56" r="3" fill="currentColor" opacity="0.60" />
      </svg>
    </div>
  );
}
