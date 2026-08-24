"use client";

import type { JSX } from "react";
import { useState } from "react";

type FaqAccordionProps = {
  items: readonly { readonly q: string; readonly a: string }[];
};

const FaqAccordion = ({ items }: FaqAccordionProps): JSX.Element => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`clip-notch bg-surface ring-1 transition-all duration-300 ${
              isOpen ? "ring-venom/40 shadow-[0_0_20px_rgba(162, 89, 255,0.1)]" : "ring-line"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span
                className={`font-body text-base font-bold transition-colors ${
                  isOpen ? "text-venom" : "text-foreground"
                }`}
              >
                {item.q}
              </span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center font-display text-sm transition-transform duration-300 ${
                  isOpen ? "rotate-45 text-venom" : "text-muted"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 font-body text-base leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
