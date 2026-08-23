"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";
import Logo from "@/app/components/ui/Logo";
import { SITE } from "@/app/constants/site";

type NavItem = { href: string; label: string };

const PRIMARY_LINKS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/roster", label: "Roster" },
  { href: "/matches", label: "Matches" },
  { href: "/schedule", label: "Schedule" },
  { href: "/news", label: "News" },
  { href: "/recruit", label: "Recruit" },
];

const MORE_LINKS: NavItem[] = [
  { href: "/gallery", label: "Gallery" },
  { href: "/stats", label: "Stats" },
  { href: "/highlights", label: "Highlights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const ALL_LINKS: NavItem[] = [...PRIMARY_LINKS.slice(1), ...MORE_LINKS];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

const Navbar = (): JSX.Element => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: globalThis.MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  const moreActive = MORE_LINKS.some((l) => isActive(pathname, l.href));

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-0.5 lg:flex">
          {PRIMARY_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`group relative block px-3 py-2 font-body text-sm font-semibold tracking-wide uppercase transition-colors ${
                  isActive(pathname, link.href)
                    ? "text-venom"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left bg-venom shadow-[0_0_8px_rgba(124,252,0,0.7)] transition-transform duration-300 ${
                    isActive(pathname, link.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            </li>
          ))}

          <li className="relative" ref={moreRef}>
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-haspopup="true"
              onClick={() => setMoreOpen((v) => !v)}
              className={`flex items-center gap-1 px-3 py-2 font-body text-sm font-semibold tracking-wide uppercase transition-colors ${
                moreActive ? "text-venom" : "text-muted hover:text-foreground"
              }`}
            >
              More
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`h-3 w-3 transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              className={`clip-notch absolute right-0 w-44 overflow-hidden bg-surface ring-1 ring-line shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-200 ${
                moreOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              }`}
            >
              {MORE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMoreOpen(false)}
                  className={`block px-4 py-2.5 font-body text-sm font-semibold tracking-wide uppercase transition-colors ${
                    isActive(pathname, link.href)
                      ? "bg-venom/10 text-venom"
                      : "text-muted hover:bg-surface-raised hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={SITE.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="clip-notch-sm hidden items-center gap-2 bg-venom px-4 py-2 font-display text-xs font-bold tracking-wider text-background uppercase transition-all hover:shadow-[0_0_22px_rgba(124,252,0,0.55)] sm:flex"
          >
            Join Discord
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="clip-notch-sm flex h-9 w-9 flex-col items-center justify-center gap-1.5 ring-1 ring-line lg:hidden"
          >
            <span
              className={`h-0.5 w-4 bg-foreground transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-4 bg-foreground transition-transform duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-line bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="grid grid-cols-2 gap-1.5 px-4 py-4 sm:max-w-md">
          {ALL_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block clip-notch-sm px-4 py-2.5 font-body text-sm font-semibold tracking-wide uppercase ${
                  isActive(pathname, link.href)
                    ? "bg-venom/10 text-venom"
                    : "text-muted hover:bg-surface hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="col-span-2 pt-1">
            <a
              href={SITE.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="clip-notch-sm block bg-venom px-4 py-2.5 text-center font-display text-xs font-bold tracking-wider text-background uppercase"
            >
              Join Discord
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
