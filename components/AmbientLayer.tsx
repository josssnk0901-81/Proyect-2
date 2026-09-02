"use client";

import {useEffect, useRef} from "react";

/**
 * Capa ambiental de la landing (reiatsu): noche estrellada cayendo, aura naranja
 * del marco (reactiva al scroll, ondas al reposo), cursor flama y fase lunar.
 * Todo canvas 2D a mano — sin librerías. Guardas de touch/reduced-motion y
 * cleanup estricto (sin listeners ni rAF colgados).
 */
export default function AmbientLayer() {
  const starsRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLCanvasElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const aura2Ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // ---- fase lunar por scroll ----
    const fill = fillRef.current;
    if (fill) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const p = max > 0 ? Math.min(1, scrollY / max) : 0;
        fill.setAttribute("cx", String(30 - p * 28));
      };
      addEventListener("scroll", onScroll, {passive: true});
      onScroll();
      cleanups.push(() => removeEventListener("scroll", onScroll));
    }

    // ---- noche estrellada cayendo ----
    const starsCanvas = starsRef.current;
    if (starsCanvas) {
      const ctx = starsCanvas.getContext("2d")!;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      let W = 0;
      let H = 0;
      let lastW = innerWidth;
      let raf = 0;
      let stars: {x: number; y: number; r: number; sp: number; dx: number; a: number; tw: number}[] = [];

      const size = () => {
        W = starsCanvas.width = innerWidth * dpr;
        H = starsCanvas.height = innerHeight * dpr;
        starsCanvas.style.width = `${innerWidth}px`;
        starsCanvas.style.height = `${innerHeight}px`;
      };
      const seed = () => {
        const n = Math.round((innerWidth * innerHeight) / 9000);
        stars = Array.from({length: n}, () => ({
          x: Math.random() * W,
          y: Math.random() * H,
          r: (0.4 + Math.random() * 1.25) * dpr,
          sp: (0.12 + Math.random() * 0.5) * dpr,
          dx: (Math.random() - 0.5) * 0.1 * dpr,
          a: 0.22 + Math.random() * 0.55,
          tw: Math.random() * 6.28,
        }));
      };
      const draw = (anim: boolean) => {
        ctx.clearRect(0, 0, W, H);
        for (const s of stars) {
          if (anim) {
            s.y += s.sp;
            s.x += s.dx;
            if (s.y > H + 2) {
              s.y = -2;
              s.x = Math.random() * W;
            }
            s.tw += 0.03;
          }
          ctx.globalAlpha = s.a * (anim ? 0.6 + 0.4 * Math.sin(s.tw) : 1);
          ctx.fillStyle = "#e8e6e1";
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, 7);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      };

      size();
      seed();
      // Re-siembra SOLO al cambiar el ancho (no en el resize por scroll móvil).
      const onResize = () => {
        size();
        if (Math.abs(innerWidth - lastW) > 80) {
          lastW = innerWidth;
          seed();
        }
      };
      addEventListener("resize", onResize);
      cleanups.push(() => removeEventListener("resize", onResize));

      if (reduced) {
        draw(false);
      } else {
        const loop = () => {
          draw(true);
          raf = requestAnimationFrame(loop);
        };
        loop();
        cleanups.push(() => cancelAnimationFrame(raf));
      }
    }

    // ---- aura del marco: intensifica con scroll, ondas al reposo ----
    const aura = auraRef.current;
    const aura2 = aura2Ref.current;
    if (!reduced && aura && aura2) {
      const els = [aura, aura2];
      let t: ReturnType<typeof setTimeout>;
      const idle = () =>
        els.forEach((e) => {
          e.classList.remove("scrolling");
          e.classList.add("idle");
        });
      const wake = () => {
        els.forEach((e) => {
          e.classList.add("scrolling");
          e.classList.remove("idle");
        });
        clearTimeout(t);
        t = setTimeout(idle, 1100);
      };
      addEventListener("scroll", wake, {passive: true});
      idle();
      cleanups.push(() => {
        removeEventListener("scroll", wake);
        clearTimeout(t);
      });
    }

    // ---- cursor flama con aura naranja que se desprende al moverse ----
    const cursorCanvas = cursorRef.current;
    if (fine && !reduced && cursorCanvas) {
      document.documentElement.classList.add("fine-pointer");
      const ctx = cursorCanvas.getContext("2d")!;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      let W = 0;
      let H = 0;
      let raf = 0;
      const size = () => {
        W = cursorCanvas.width = innerWidth * dpr;
        H = cursorCanvas.height = innerHeight * dpr;
        cursorCanvas.style.width = `${innerWidth}px`;
        cursorCanvas.style.height = `${innerHeight}px`;
      };
      size();
      const onResize = () => size();
      addEventListener("resize", onResize);

      let mx = innerWidth / 2;
      let my = innerHeight / 2;
      let cx = mx;
      let cy = my;
      let lx = mx;
      let ly = my;
      const parts: {x: number; y: number; vx: number; vy: number; r: number; life: number; decay: number}[] = [];
      const onMove = (e: PointerEvent) => {
        mx = e.clientX;
        my = e.clientY;
      };
      addEventListener("pointermove", onMove, {passive: true});

      const emit = (n: number, bias: number) => {
        for (let i = 0; i < n; i++) {
          parts.push({
            x: cx + (Math.random() - 0.5) * 7,
            y: cy + (Math.random() - 0.5) * 7,
            vx: bias * 0.28 + (Math.random() - 0.5) * 0.5,
            vy: -(0.25 + Math.random() * 0.85),
            r: 3 + Math.random() * 5,
            life: 1,
            decay: 0.013 + Math.random() * 0.02,
          });
        }
      };
      const tick = () => {
        cx += (mx - cx) * 0.2;
        cy += (my - cy) * 0.2;
        const dx = cx - lx;
        const sp = Math.hypot(dx, cy - ly);
        lx = cx;
        ly = cy;
        emit(1 + Math.min(5, Math.floor(sp / 3)), dx);

        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = "lighter";
        for (let i = parts.length - 1; i >= 0; i--) {
          const p = parts[i];
          p.vy -= 0.006;
          p.vx *= 0.95;
          p.x += p.vx;
          p.y += p.vy;
          p.life -= p.decay;
          if (p.life <= 0) {
            parts.splice(i, 1);
            continue;
          }
          const r = p.r * p.life * dpr * 2.4;
          const g = ctx.createRadialGradient(p.x * dpr, p.y * dpr, 0, p.x * dpr, p.y * dpr, r);
          g.addColorStop(0, `rgba(255,198,128,${0.5 * p.life})`);
          g.addColorStop(0.4, `rgba(193,64,31,${0.4 * p.life})`);
          g.addColorStop(1, "rgba(193,64,31,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x * dpr, p.y * dpr, r, 0, 7);
          ctx.fill();
        }
        const core = ctx.createRadialGradient(cx * dpr, cy * dpr, 0, cx * dpr, cy * dpr, 14 * dpr);
        core.addColorStop(0, "rgba(255,228,190,.95)");
        core.addColorStop(0.4, "rgba(232,116,48,.7)");
        core.addColorStop(1, "rgba(193,64,31,0)");
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(cx * dpr, cy * dpr, 14 * dpr, 0, 7);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        raf = requestAnimationFrame(tick);
      };
      tick();

      cleanups.push(() => {
        document.documentElement.classList.remove("fine-pointer");
        removeEventListener("resize", onResize);
        removeEventListener("pointermove", onMove);
        cancelAnimationFrame(raf);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <canvas id="stars" ref={starsRef} aria-hidden="true" />
      <div className="aura" ref={auraRef} aria-hidden="true" />
      <div className="aura2" ref={aura2Ref} aria-hidden="true" />
      <canvas id="cursor" ref={cursorRef} aria-hidden="true" />
      <div className="phase" aria-hidden="true">
        <svg viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="15" fill="#1b1c22" stroke="#23242c" />
          <clipPath id="moon-clip">
            <circle cx="16" cy="16" r="15" />
          </clipPath>
          <g clipPath="url(#moon-clip)">
            <circle ref={fillRef} cx="30" cy="16" r="15" fill="#e8e6e1" />
          </g>
        </svg>
      </div>
    </>
  );
}
