import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  return (
    <footer className="mt-16 bg-ink text-[#f4e9dd]">
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-8 text-sm sm:px-6">
        <div>
          <p className="font-semibold text-[#f4e9dd]">掲載内容について</p>
          <p className="mt-1 leading-relaxed text-[#d8c4b2]">
            {siteConfig.disclaimer}
          </p>
        </div>
        <div>
          <p className="font-semibold text-[#f4e9dd]">一次資料</p>
          <ul className="mt-1 list-inside list-disc leading-relaxed text-[#d8c4b2]">
            {siteConfig.officialLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-brand-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="border-t border-white/10 pt-4 text-xs text-[#b39d8b]">
          {siteConfig.credit}
        </p>
      </div>
    </footer>
  );
}
