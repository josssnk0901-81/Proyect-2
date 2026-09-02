import Image from "next/image";
import {getTranslations} from "next-intl/server";
import Reveal from "@/components/Reveal";

const CASES = [
  {key: "mogu", src: "/work/mogu.png", tag: "Programación · SaaS"},
  {key: "julio", src: "/work/julio-jimenez.png", tag: "Web · Cliente"},
  {key: "constructora", src: "/work/constructora.png", tag: "Automatización · n8n"},
  {key: "k12", src: "/work/k12.png", tag: "Edición · Motion"},
] as const;

export default async function Work() {
  const t = await getTranslations("Work");

  return (
    <section id="trabajo" className="relative z-[1] border-t border-line px-6 py-20 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-steel">{t("eyebrow")}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-2.5 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {t("title")}
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CASES.map((c, i) => (
            <Reveal key={c.key} delay={0.05 * i}>
              <article className="group overflow-hidden rounded-xl border border-line bg-elev">
                <div className="relative aspect-[16/10] overflow-hidden bg-bg">
                  <Image
                    src={c.src}
                    alt={t(`${c.key}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-steel">
                    {c.tag}
                  </span>
                  <h3 className="mb-2 mt-2 font-display text-xl font-semibold">{t(`${c.key}.title`)}</h3>
                  <p className="text-sm text-ink2">{t(`${c.key}.desc`)}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
