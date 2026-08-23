"use client";

import type { JSX, MouseEvent } from "react";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";

export default function OrgEmblemHero(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: y * -18 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto flex w-full max-w-[500px] items-center justify-center p-2 select-none cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      {/* Volumetric Neon Toxic Backlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[360px] w-[360px] rounded-full opacity-60 blur-[100px] transition-all duration-700 sm:h-[450px] sm:w-[450px]"
        style={{
          background: hovered
            ? "radial-gradient(circle, rgba(57,255,20,0.55) 0%, rgba(168,85,247,0.3) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(57,255,20,0.32) 0%, rgba(168,85,247,0.18) 45%, transparent 70%)",
          transform: `translate(${tilt.x * 0.4}px, ${tilt.y * -0.4}px) scale(${hovered ? 1.15 : 1.0})`,
        }}
      />

      {/* Floating 3D Tilting Monogram Frame */}
      <div
        className="relative flex h-[350px] w-[350px] items-center justify-center animate-float sm:h-[430px] sm:w-[430px]"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: "transform 150ms ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Kinetic Orbital Backlight Rings */}
        <div
          aria-hidden
          className={`pointer-events-none absolute h-[330px] w-[330px] rounded-full border border-venom/20 transition-all duration-1000 sm:h-[410px] sm:w-[410px] ${
            hovered
              ? "scale-110 rotate-90 border-venom/50 shadow-[0_0_35px_rgba(57,255,20,0.4)]"
              : "scale-100 rotate-0"
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute h-[270px] w-[270px] rounded-full border border-dashed border-purple-500/30 transition-all duration-1000 sm:h-[340px] sm:w-[340px] ${
            hovered
              ? "scale-90 -rotate-90 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
              : "scale-100 rotate-0"
          }`}
        />

        {/* ── 100% TRUE TRANSPARENT PNG CYBER VIPER "V" CREST (NO BG, NO TEXT) ── */}
        <div
          className={`relative h-[310px] w-[310px] sm:h-[390px] sm:w-[390px] transition-all duration-500 ${
            hovered
              ? "scale-105 drop-shadow-[0_0_45px_rgba(57,255,20,0.95)]"
              : "scale-100 drop-shadow-[0_0_25px_rgba(57,255,20,0.6)]"
          }`}
        >
          <Image
            src="/images/venom-viper-icon.png"
            alt="Venom Vanguard Cyber Viper Crest"
            fill
            priority
            sizes="(max-width: 768px) 310px, 390px"
            className="object-contain object-center"
          />
        </div>
      </div>
    </div>
  );
}
