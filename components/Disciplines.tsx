import {getTranslations} from "next-intl/server";
import Reveal from "@/components/Reveal";

const ITEMS = [
  {key: "programming", n: "01", stack: "MOGU · BusinessHub · Next.js"},
  {key: "automation", n: "02", stack: "n8n · Baserow · Webhooks"},
  {key: "security", n: "03", stack: "Kali · Hardening · Lab"},
  {key: "editing", n: "04", stack: "Photoshop · After Effects · Motion"},
] as const;

export default async function Disciplines() {
  const t = await getTranslations("Disciplines");

  return (
    <section id="disciplinas" className="relative z-[1] border-t border-line px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-steel">{t("eyebrow")}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-2.5 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {t("title")}
              </h2>
            </Reveal>
          </div>
          <span className="font-mono text-xs text-steel">04</span>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {ITEMS.map((item, i) => (
            <Reveal key={item.key} delay={0.05 * i} className="h-full">
              <article className="flex h-full min-h-[220px] flex-col bg-bg p-6 transition-colors duration-300 hover:bg-elev md:p-9">
                <span className="font-mono text-xs text-steel">{item.n}</span>
                <h3 className="mb-2.5 mt-3.5 font-display text-xl font-semibold md:text-2xl">
                  {t(`${item.key}.title`)}
                </h3>
                <p className="max-w-[38ch] flex-1 text-ink2">{t(`${item.key}.desc`)}</p>
                <span className="mt-5 border-t border-line pt-4 font-mono text-[11px] tracking-[0.06em] text-steel">
                  {item.stack}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
