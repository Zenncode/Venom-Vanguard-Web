"use client";

import dynamic from "next/dynamic";
import type { JSX, MouseEvent } from "react";
import { useCallback, useRef, useState } from "react";
import GlowButton from "@/app/components/ui/GlowButton";
import { SITE } from "@/app/constants/site";

const Hero3DScene = dynamic(() => import("./Hero3DScene"), {
  ssr: false,
  loading: () => null,
});

const HeroBanner = (): JSX.Element => {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = useRef(false);

  const handleMove = useCallback((e: MouseEvent<HTMLElement>) => {
    if (reduced.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reduced.current = true;
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px, y: py });
  }, []);

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      className="grid-bg relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,252,0,0.22) 0%, rgba(168,85,247,0.12) 45%, transparent 70%)",
          transform: `translate(calc(-50% + ${tilt.x * 40}px), calc(-50% + ${tilt.y * 40}px))`,
        }}
      />

      <div
        aria-hidden
        className="absolute inset-y-0 right-0 hidden h-full w-1/2 opacity-90 lg:block"
        style={{
          transform: `translate(${tilt.x * -18}px, ${tilt.y * -12}px)`,
          transition: "transform 200ms ease-out",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 60% 50%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 60% 50%, black 30%, transparent 75%)",
        }}
      >
        <Hero3DScene />
      </div>

      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        style={{
          transform: `translate(${tilt.x * 10}px, ${tilt.y * 8}px)`,
          transition: "transform 300ms ease-out",
        }}
      >
        <p className="mb-4 flex items-center gap-3 font-display text-xs font-bold tracking-[0.35em] text-venom uppercase">
          <span className="h-px w-10 bg-venom shadow-[0_0_8px_rgba(124,252,0,0.8)]" />
          Mobile Legends Squad
        </p>

        <h1 className="max-w-3xl font-display text-5xl leading-[1.05] font-black tracking-wide uppercase sm:text-6xl lg:text-7xl">
          <span className="text-glow block text-foreground">Venom</span>
          <span className="block bg-gradient-to-r from-venom via-venom-bright to-toxic bg-clip-text text-transparent">
            Vanguard
          </span>
        </h1>

        <p className="mt-6 max-w-xl font-body text-lg font-medium tracking-wide text-muted sm:text-xl">
          {SITE.tagline} An elite MLBB squad turning scrims into championships —
          and hunting for the next venom to join the strike team.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <GlowButton href="/recruit">Join the Squad</GlowButton>
          <GlowButton href="/matches" variant="outline">
            Match Record
          </GlowButton>
          <a
            href={SITE.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xs font-bold tracking-[0.15em] text-muted uppercase underline decoration-venom/40 underline-offset-8 transition-colors hover:text-venom"
          >
            Discord Server
          </a>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float font-body text-[10px] tracking-[0.4em] text-muted uppercase"
      >
        Scroll
      </div>
    </section>
  );
};

export default HeroBanner;
