import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="h-8 w-8 flex-shrink-0 rounded-full bg-grad" />
          <span className="text-lg font-extrabold tracking-tight text-ink">
            {siteConfig.name}
          </span>
        </Link>
        <span className="hidden text-sm text-ink-soft sm:inline">
          {siteConfig.tagline}
        </span>
      </div>
    </header>
  );
}
