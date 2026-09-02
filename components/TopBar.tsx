"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";
import {routing} from "@/i18n/routing";

const LABELS: Record<string, string> = {es: "ES", ja: "JP", en: "EN"};

export default function TopBar() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12">
      <div className="flex items-baseline gap-3">
        <span className="font-jp text-[22px] font-black leading-none text-ember">無月</span>
        <span className="font-display text-[15px] font-semibold tracking-wide">JossSnK</span>
      </div>
      <nav aria-label="Idioma" className="flex gap-0.5 font-mono text-[11px]">
        {routing.locales.map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={l === locale}
            onClick={() => router.replace(pathname, {locale: l})}
            className={`rounded-md px-2.5 py-1.5 tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-steel ${
              l === locale ? "text-ink" : "text-ink2 hover:text-ink"
            }`}
          >
            {LABELS[l]}
          </button>
        ))}
      </nav>
    </header>
  );
}
