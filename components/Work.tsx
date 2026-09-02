import {getTranslations} from "next-intl/server";
import Reveal from "@/components/Reveal";
import WorkGrid, {type WorkCase} from "@/components/WorkGrid";

// Configuración de casos (imágenes + orden). Los textos vienen de las traducciones.
// `shots` con más de un elemento abre el lightbox con galería; `cover: null` dibuja
// una portada de marca (los casos del portafolio viejo no tenían captura).
const CONFIG = [
  {
    key: "mogu",
    tag: "Programación · SaaS",
    cover: "/work/mogu.png",
    shots: [
      {src: "/work/mogu-dashboard.png", cap: "dashboard"},
      {src: "/work/mogu-clientes.png", cap: "clientes"},
      {src: "/work/mogu-nfc.png", cap: "nfc"},
    ],
  },
  {
    key: "constructora",
    tag: "Automatización · n8n",
    cover: "/work/constructora.png",
    shots: [
      {src: "/work/n8n-seguimiento.png", cap: "seguimiento"},
      {src: "/work/n8n-cotizacion.png", cap: "cotizacion"},
      {src: "/work/n8n-formulario.png", cap: "formulario"},
      {src: "/work/constructora.png", cap: "panel"},
    ],
  },
  {key: "cabana", tag: "Hospitalidad · NFC", cover: "/work/cabana.png", shots: [{src: "/work/cabana.png", cap: "sitio"}]},
  {key: "tarjeta", tag: "Web · 3D", cover: null, shots: []},
  {
    key: "k12",
    tag: "Edición · Motion",
    cover: "/work/k12-horario.png",
    shots: [
      {src: "/work/k12-horario.png", cap: "flyer"},
      {src: "/work/k12-abierto.jpg", cap: "flyer"},
    ],
  },
] as const;

export default async function Work() {
  const t = await getTranslations("Work");

  const cases: WorkCase[] = CONFIG.map((c) => ({
    key: c.key,
    tag: c.tag,
    title: t(`${c.key}.title`),
    desc: t(`${c.key}.desc`),
    cover: c.cover,
    liveUrl: "liveUrl" in c ? (c as {liveUrl?: string}).liveUrl : undefined,
    shots: c.shots.map((s) => ({src: s.src, cap: t(`shots.${s.cap}`)})),
  }));

  const labels = {
    liveDemo: t("liveDemo"),
    viewShots: t("viewShots"),
    close: t("close"),
    prev: t("prev"),
    next: t("next"),
  };

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

        <WorkGrid cases={cases} labels={labels} />
      </div>
    </section>
  );
}
