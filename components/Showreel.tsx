"use client";

import {useEffect, useRef, useState} from "react";
import Reveal from "@/components/Reveal";

/**
 * Showreel de disciplinas. Elige el formato del video según el dispositivo:
 * 16:9 en desktop, 9:16 en celular. Autoplay silenciado con botón de sonido.
 */
export default function Showreel() {
  const [src, setSrc] = useState<string | null>(null);
  const [muted, setMuted] = useState(true);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setSrc(isDesktop ? "/video/landing-desktop.mp4" : "/video/landing-mobile.mp4");
  }, []);

  const isMobile = src?.includes("mobile");

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => {});
    setMuted(v.muted);
  };

  return (
    <section
      id="showreel"
      className="relative z-[1] border-t border-line px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.16em] text-steel">
            Showreel
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div
            className={`relative mx-auto overflow-hidden rounded-2xl border border-line bg-elev shadow-[0_50px_120px_-30px_rgba(0,0,0,0.8)] ${
              isMobile ? "max-w-[430px]" : "w-full"
            }`}
          >
            {src && (
              <video
                ref={ref}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="block w-full"
              />
            )}
            {src && (
              <button
                type="button"
                onClick={toggle}
                aria-label={muted ? "Activar sonido" : "Silenciar"}
                className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full border border-line bg-bg/70 text-ink backdrop-blur transition hover:border-steel"
              >
                {muted ? (
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5 6 9H2v6h4l5 4V5z" />
                    <path d="M23 9l-6 6M17 9l6 6" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5 6 9H2v6h4l5 4V5z" />
                    <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
