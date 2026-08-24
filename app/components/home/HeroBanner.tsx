"use client";

import type { JSX, MouseEvent } from "react";
import { useCallback, useRef, useState } from "react";
import GlowButton from "@/app/components/ui/GlowButton";
import { SITE } from "@/app/constants/site";
import OrgEmblemHero from "./OrgEmblemHero";

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
      className="grid-bg relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden py-12 lg:py-16"
    >
      {/* Background Ambient Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247,0.22) 0%, rgba(217, 70, 239,0.14) 50%, transparent 75%)",
          transform: `translate(calc(-50% + ${tilt.x * 40}px), calc(-50% + ${tilt.y * 40}px))`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 right-10 h-[420px] w-[420px] rounded-full opacity-40 blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(192, 132, 252,0.22) 0%, transparent 70%)",
          transform: `translate(${tilt.x * -25}px, ${tilt.y * -20}px)`,
        }}
      />

      {/* Main 2-Column Responsive Layout */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Left Column: Headline, Squad Tagline, CTAs */}
        <div
          className="lg:col-span-7"
          style={{
            transform: `translate(${tilt.x * 10}px, ${tilt.y * 8}px)`,
            transition: "transform 300ms ease-out",
          }}
        >
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-venom/30 bg-surface/70 px-3.5 py-1 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-venom shadow-[0_0_8px_rgba(192, 132, 252,0.8)]" />
            <span className="font-display text-xs font-bold tracking-[0.25em] text-venom uppercase">
              Mobile Legends: Bang Bang Squad
            </span>
          </div>

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

        {/* Right Column: Option 5 Pro-Team Minimalist Org Emblem */}
        <div
          className="lg:col-span-5 flex items-center justify-center"
          style={{
            transform: `translate(${tilt.x * -12}px, ${tilt.y * -10}px)`,
            transition: "transform 250ms ease-out",
          }}
        >
          <OrgEmblemHero />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
