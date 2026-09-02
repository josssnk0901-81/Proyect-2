import {getLocale, getTranslations} from "next-intl/server";
import Reveal from "@/components/Reveal";
import {WhatsAppIcon, InstagramIcon, TikTokIcon, DownloadIcon} from "@/components/icons";

export default async function Contact() {
  const t = await getTranslations("Contact");
  const locale = await getLocale();

  return (
    <section id="contacto" className="relative z-[1] border-t border-line px-6 pt-24 md:px-12 md:pt-36">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-steel">{t("eyebrow")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 max-w-[12ch] font-display text-4xl font-bold tracking-tight md:text-6xl">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-[40ch] text-ink2 md:text-lg">{t("lead")}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {/* WhatsApp: el número vive en el servidor (env), fuera del bundle */}
            <a
              href="/api/wa"
              className="inline-flex items-center gap-2 rounded-lg bg-ember px-6 py-3 font-mono text-sm font-medium text-bg transition hover:opacity-90"
            >
              <WhatsAppIcon className="size-4" />
              {t("whatsapp")}
            </a>
            <a
              href="/cv-jossnk.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-mono text-sm text-ink transition hover:border-steel"
            >
              <DownloadIcon className="size-4 text-ember" />
              {t("cv")}
            </a>
            <a
              href="https://instagram.com/jossnk_81"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-1.5 px-2 font-mono text-sm text-ink2 underline-offset-4 transition hover:text-ink hover:underline"
            >
              <InstagramIcon className="size-4" />
              Instagram
            </a>
            <a
              href="https://tiktok.com/@josssnk81"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="inline-flex items-center gap-1.5 px-2 font-mono text-sm text-ink2 underline-offset-4 transition hover:text-ink hover:underline"
            >
              <TikTokIcon className="size-4" />
              TikTok
            </a>
          </div>
        </Reveal>

        <footer className="mt-24 flex items-center justify-between border-t border-line py-8 font-mono text-[11px] text-steel">
          <span>
            <span className="font-jp text-ember">無月</span> · JossSnK
          </span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  );
}
