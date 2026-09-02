import {getTranslations} from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("Hero");

  // La brasa (punto rojo) va solo en el punto final latino; el japonés termina en 。
  const headline = t("headline");
  const hasDot = headline.endsWith(".");
  const headMain = hasDot ? headline.slice(0, -1) : headline;

  return (
    <section className="relative flex min-h-svh items-center">
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1.15fr_0.85fr] md:px-12">
        <div>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-steel">
            {t("eyebrow")}
          </p>
          <h1 className="max-w-[14ch] font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-[80px]">
            {headMain}
            {hasDot && <span className="headline-dot">.</span>}
          </h1>
          <p className="mt-6 max-w-[46ch] text-ink2 md:text-lg">{t("sub")}</p>
          <span className="mt-11 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink2">
            <span className="cue-bar" />
            {t("scroll")}
          </span>
        </div>

        <div className="focal" aria-hidden="true">
          <svg viewBox="0 0 400 400">
            <defs>
              <radialGradient id="amb" cx="52%" cy="42%" r="62%">
                <stop offset="0%" stopColor="#26272f" />
                <stop offset="100%" stopColor="#0d0d12" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="silver" x1="0" y1="0" x2="1" y2="1.1">
                <stop offset="0%" stopColor="#cdd0da" />
                <stop offset="46%" stopColor="#63656f" />
                <stop offset="100%" stopColor="#17181d" />
              </linearGradient>
              <mask id="cres">
                <circle cx="196" cy="200" r="150" fill="#fff" />
                <circle cx="250" cy="172" r="141" fill="#000" />
              </mask>
              <filter id="soft">
                <feGaussianBlur stdDeviation="1.1" />
              </filter>
            </defs>
            <circle cx="200" cy="196" r="230" fill="url(#amb)" />
            <g mask="url(#cres)">
              <circle cx="196" cy="200" r="150" fill="url(#silver)" />
              <circle
                cx="196"
                cy="200"
                r="150"
                fill="none"
                stroke="#e8e6e1"
                strokeOpacity="0.55"
                strokeWidth="1.4"
                filter="url(#soft)"
              />
            </g>
          </svg>
          <span className="ember" />
        </div>
      </div>
    </section>
  );
}
