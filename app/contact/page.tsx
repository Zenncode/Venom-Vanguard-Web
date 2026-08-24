import type { Metadata } from "next";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ScrollReveal from "@/app/components/ui/ScrollReveal";
import { players } from "@/app/data/squad";
import { SITE } from "@/app/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Venom Vanguard — tryouts, scrims, partnerships, and media inquiries.",
};

const CONTACT_CARDS = [
  {
    title: "Tryouts & Recruitment",
    description: "Applications, tryout slots, and roster questions.",
    action: { label: "Apply on Discord", href: SITE.discord, external: true },
  },
  {
    title: "Scrims & Match Bookings",
    description: "Teams looking to book scrim blocks against our roster.",
    action: { label: `Email ${SITE.email}`, href: `mailto:${SITE.email}`, external: false },
  },
  {
    title: "Partnerships & Media",
    description: "Sponsorships, collabs, and content permissions.",
    action: { label: "Message on Facebook", href: SITE.facebook, external: true },
  },
];

const SOCIALS = [
  { href: SITE.discord, label: "Discord", handle: "discord.gg/venomvanguard" },
  { href: SITE.facebook, label: "Facebook", handle: "fb.com/venomvanguard" },
  { href: SITE.tiktok, label: "TikTok", handle: "@venomvanguard" },
];

export default function ContactPage() {
  const captain = players.find((p) => p.captain);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        kicker="Reach the Den"
        title="Contact Us"
        description="Tryouts, scrim bookings, or partnership pitches — here's how to reach us."
      />

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
        {CONTACT_CARDS.map((card, i) => (
          <ScrollReveal key={card.title} delay={i * 100}>
            <div className="clip-notch flex h-full flex-col bg-surface p-6 ring-1 ring-line">
              <h2 className="font-display text-sm font-bold tracking-[0.15em] text-venom uppercase">
                {card.title}
              </h2>
              <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-muted">
                {card.description}
              </p>
              <a
                href={card.action.href}
                {...(card.action.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="clip-notch-sm mt-5 inline-block bg-surface-raised px-4 py-2.5 text-center font-display text-[11px] font-bold tracking-wider text-foreground uppercase ring-1 ring-line transition-all hover:text-venom hover:shadow-[0_0_16px_rgba(162, 89, 255,0.25)] hover:ring-venom/50"
              >
                {card.action.label}
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {captain && (
        <ScrollReveal className="mx-auto mt-8 max-w-5xl">
          <div className="clip-notch flex flex-col items-center gap-5 bg-surface p-7 ring-1 ring-venom/25 sm:flex-row">
            <span className="clip-notch flex h-14 w-14 shrink-0 items-center justify-center bg-venom/10 font-display text-base font-black text-venom ring-1 ring-venom/40">
              {captain.ign.slice(0, 2).toUpperCase()}
            </span>
            <div className="text-center sm:text-left">
              <p className="font-display text-[10px] font-bold tracking-[0.25em] text-muted uppercase">
                Team Captain
              </p>
              <p className="mt-1 font-body text-lg font-bold">
                {captain.ign} handles all final roster decisions and scrim bookings.
              </p>
              <p className="mt-1 font-body text-sm text-muted">
                Fastest response is via Discord DM — mention your team and format.
              </p>
            </div>
          </div>
        </ScrollReveal>
      )}

      <div className="mx-auto mt-12 max-w-5xl">
        <ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="clip-notch group bg-surface p-6 text-center ring-1 ring-line transition-all hover:shadow-[0_0_22px_rgba(162, 89, 255,0.18)] hover:ring-venom/40"
              >
                <p className="font-display text-base font-bold tracking-wider uppercase transition-colors group-hover:text-venom">
                  {social.label}
                </p>
                <p className="mt-1.5 font-body text-xs text-muted">{social.handle}</p>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
