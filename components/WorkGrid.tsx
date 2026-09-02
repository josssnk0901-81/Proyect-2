"use client";

import Image from "next/image";
import {createPortal} from "react-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import Reveal from "@/components/Reveal";

export type Shot = {src: string; cap: string};
export type WorkCase = {
  key: string;
  tag: string;
  title: string;
  desc: string;
  cover: string | null;
  liveUrl?: string;
  shots: Shot[];
};
export type WorkLabels = {
  liveDemo: string;
  viewShots: string;
  close: string;
  prev: string;
  next: string;
};

/** Portada dibujada para casos sin captura (fiel al portafolio viejo, que usaba mockups). */
function BrandedCover() {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden bg-gradient-to-br from-elev via-bg to-bg">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-5 -top-7 select-none font-jp text-[6.5rem] leading-none text-ember/10"
      >
        無月
      </span>
      {/* Media luna rim-lit — mismo motivo que el hero */}
      <svg viewBox="0 0 100 100" className="size-20 opacity-80" aria-hidden>
        <defs>
          <linearGradient id="bc-silver" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e8e6e1" stopOpacity="0.9" />
            <stop offset="1" stopColor="#5c7c9c" stopOpacity="0.5" />
          </linearGradient>
          <mask id="bc-cres">
            <rect width="100" height="100" fill="black" />
            <circle cx="50" cy="50" r="34" fill="white" />
            <circle cx="63" cy="44" r="30" fill="black" />
          </mask>
        </defs>
        <circle cx="50" cy="50" r="34" fill="url(#bc-silver)" mask="url(#bc-cres)" />
        <circle cx="41" cy="60" r="1.6" fill="#c1401f" />
      </svg>
    </div>
  );
}

export default function WorkGrid({cases, labels}: {cases: WorkCase[]; labels: WorkLabels}) {
  const [active, setActive] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  useEffect(() => setMounted(true), []);

  const shots = active === null ? [] : cases[active].shots;
  const close = useCallback(() => setActive(null), []);
  // Freno al guardado de imágenes (clic derecho / arrastrar). No aplica al PDF.
  const blockSave = (e: {preventDefault: () => void}) => e.preventDefault();

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollToIndex = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(i, el.children.length - 1));
    el.scrollTo({left: clamped * el.clientWidth, behavior: reduced() ? "auto" : "smooth"});
  }, []);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setIndex((prev) => (prev === i ? prev : i));
  };

  const open = (caseIndex: number) => {
    setIndex(0);
    setActive(caseIndex);
  };

  // Al abrir, el scroller arranca en la primera lámina.
  useEffect(() => {
    if (active === null) return;
    const el = scrollerRef.current;
    if (el) el.scrollLeft = 0;
    setIndex(0);
  }, [active]);

  // Teclado + bloqueo de scroll de fondo mientras el carrusel está abierto.
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") scrollToIndex(index + 1);
      else if (e.key === "ArrowLeft") scrollToIndex(index - 1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, index, close, scrollToIndex]);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {cases.map((c, i) => {
          const hasShots = c.shots.length > 0;
          const cover = c.cover ? (
            <Image
              src={c.cover}
              alt={c.title}
              fill
              draggable={false}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03] select-none"
            />
          ) : (
            <BrandedCover />
          );
          return (
            <Reveal key={c.key} delay={0.05 * (i % 2)}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-elev">
                {hasShots ? (
                  <button
                    type="button"
                    onClick={() => open(i)}
                    onContextMenu={blockSave}
                    aria-label={`${labels.viewShots} — ${c.title}`}
                    className="no-save relative block aspect-[16/10] overflow-hidden bg-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                  >
                    {cover}
                    {c.shots.length > 1 && (
                      <span className="absolute right-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 font-mono text-[11px] text-ink backdrop-blur">
                        {c.shots.length} · <span className="text-steel">{labels.viewShots}</span>
                      </span>
                    )}
                  </button>
                ) : (
                  <div
                    onContextMenu={blockSave}
                    className="no-save relative aspect-[16/10] overflow-hidden bg-bg"
                  >
                    {cover}
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-steel">
                    {c.tag}
                  </span>
                  <h3 className="mb-2 mt-2 font-display text-xl font-semibold">{c.title}</h3>
                  <p className="text-sm text-ink2">{c.desc}</p>

                  {(c.liveUrl || hasShots) && (
                    <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-line pt-4">
                      {c.liveUrl && (
                        <a
                          href={c.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-ember underline-offset-4 transition hover:underline"
                        >
                          {labels.liveDemo} ↗
                        </a>
                      )}
                      {hasShots && (
                        <button
                          type="button"
                          onClick={() => open(i)}
                          className="font-mono text-xs text-ink2 underline-offset-4 transition hover:text-ink hover:underline"
                        >
                          {labels.viewShots}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Carrusel estilo Instagram (portal a <body> para escapar el stacking de <main>) */}
      {mounted && active !== null && shots.length > 0 &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={cases[active].title}
            onClick={close}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-bg/92 p-4 backdrop-blur-sm md:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label={labels.close}
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-line bg-elev/80 text-ink transition hover:border-steel"
            >
              ✕
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-[1100px] flex-col items-center gap-4"
            >
              {/* Pista deslizable con snap (swipe nativo en móvil) */}
              <div className="relative w-full">
                <div
                  ref={scrollerRef}
                  onScroll={onScroll}
                  onContextMenu={blockSave}
                  className="no-save no-scrollbar flex h-[68vh] w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain rounded-xl"
                >
                  {shots.map((s) => (
                    <div
                      key={s.src}
                      className="relative h-full w-full shrink-0 snap-center"
                    >
                      <Image
                        src={s.src}
                        alt={s.cap}
                        fill
                        draggable={false}
                        sizes="(max-width: 1100px) 92vw, 1100px"
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>

                {shots.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => scrollToIndex(index - 1)}
                      aria-label={labels.prev}
                      disabled={index === 0}
                      className="absolute left-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/70 text-ink backdrop-blur transition hover:border-steel disabled:opacity-0 md:left-3"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToIndex(index + 1)}
                      aria-label={labels.next}
                      disabled={index === shots.length - 1}
                      className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/70 text-ink backdrop-blur transition hover:border-steel disabled:opacity-0 md:right-3"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Puntos estilo Instagram */}
              {shots.length > 1 && (
                <div className="flex items-center gap-2">
                  {shots.map((s, i) => (
                    <button
                      key={s.src}
                      type="button"
                      onClick={() => scrollToIndex(i)}
                      aria-label={`${i + 1} / ${shots.length}`}
                      aria-current={i === index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === index ? "w-5 bg-ember" : "w-1.5 bg-ink2/40 hover:bg-ink2"
                      }`}
                    />
                  ))}
                </div>
              )}

              <p className="text-center font-mono text-xs text-ink2">{shots[index]?.cap}</p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
