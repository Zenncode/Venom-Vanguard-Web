"use client";

import type { JSX } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryItem } from "@/app/data/squad";

const CATEGORIES = ["All", "screenshot", "event", "meme"] as const;
type Category = (typeof CATEGORIES)[number];

const TYPE_STYLES: Record<GalleryItem["type"], { from: string; to: string; icon: string }> = {
  screenshot: { from: "#123524", to: "#0a1f14", icon: "IMG" },
  event: { from: "#2a1548", to: "#160b26", icon: "EVENT" },
  meme: { from: "#3a2a08", to: "#1f1704", icon: "LOL" },
};

function Tile({ item }: { item: GalleryItem }) {
  const style = TYPE_STYLES[item.type];
  return (
    <div
      className="relative flex h-full min-h-44 w-full items-end overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${style.from} 0%, ${style.to} 100%)`,
      }}
    >
      <div className="grid-bg absolute inset-0 opacity-60" />
      <span className="absolute top-3 left-3 bg-background/70 px-2 py-0.5 font-display text-[9px] font-bold tracking-[0.25em] text-venom/90 uppercase backdrop-blur-sm">
        {style.icon}
      </span>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-5xl font-black text-venom/10">
        VV
      </span>
      {item.caption && (
        <p className="relative w-full bg-gradient-to-t from-black/80 to-transparent px-4 pt-8 pb-3 font-body text-sm font-semibold text-foreground/90">
          {item.caption}
        </p>
      )}
    </div>
  );
}

type GalleryGridProps = {
  items: GalleryItem[];
};

const GalleryGrid = ({ items }: GalleryGridProps): JSX.Element => {
  const [category, setCategory] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => items.filter((i) => category === "All" || i.type === category),
    [category, items],
  );

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((cur) =>
        cur === null ? cur : (cur + dir + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`clip-notch-sm px-4 py-2 font-display text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300 ${
              category === c
                ? "bg-venom text-background shadow-[0_0_18px_rgba(124,252,0,0.4)]"
                : "bg-surface text-muted ring-1 ring-line hover:text-foreground hover:ring-venom/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((item, i) => (
          <button
            key={`${category}-${item.id}`}
            type="button"
            onClick={() => setLightbox(i)}
            aria-label={item.caption ?? "Open gallery item"}
            className={`clip-notch animate-fade-up group relative overflow-hidden ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_0_26px_rgba(124,252,0,0.22)] hover:ring-venom/40 ${
              i % 7 === 0 ? "row-span-2" : ""
            } ${i % 5 === 2 ? "sm:col-span-2" : ""}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <Tile item={item} />
          </button>
        ))}
      </div>

      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-background/92 p-6 backdrop-blur-md"
          onClick={close}
          role="presentation"
        >
          <div
            className="clip-notch animate-zoom-in relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={filtered[lightbox].caption ?? "Gallery item"}
          >
            <div className="aspect-video w-full">
              <Tile item={filtered[lightbox]} />
            </div>
          </div>
          {filtered[lightbox].caption && (
            <p className="max-w-xl text-center font-body text-base font-semibold text-foreground/90">
              {filtered[lightbox].caption}
            </p>
          )}
          <p className="font-body text-xs tracking-[0.3em] text-muted uppercase tabular-nums">
            {lightbox + 1} / {filtered.length}
          </p>
          <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous item"
              className="clip-notch-sm flex h-10 w-10 items-center justify-center bg-surface text-foreground ring-1 ring-line transition-all hover:text-venom hover:ring-venom/50"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next item"
              className="clip-notch-sm flex h-10 w-10 items-center justify-center bg-surface text-foreground ring-1 ring-line transition-all hover:text-venom hover:ring-venom/50"
            >
              →
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Close lightbox"
              className="clip-notch-sm flex h-10 w-10 items-center justify-center bg-surface text-muted ring-1 ring-line transition-all hover:text-red-400 hover:ring-red-500/40"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
