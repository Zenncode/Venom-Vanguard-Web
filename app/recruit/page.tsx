import type { Metadata } from "next";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ScrollReveal from "@/app/components/ui/ScrollReveal";
import GlowButton from "@/app/components/ui/GlowButton";
import RoleBadge from "@/app/components/ui/RoleBadge";
import FaqAccordion from "@/app/components/recruit/FaqAccordion";
import { faqs, recruitment } from "@/app/data/squad";
import { SITE } from "@/app/constants/site";

export const metadata: Metadata = {
  title: "Recruitment",
  description:
    "Try out for Venom Vanguard. Requirements, open roles, and how to apply — Mythic+ players wanted.",
};

const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
  "VV Tryout Application",
)}&body=${encodeURIComponent(
  "IGN:\nRole:\nCurrent rank + screenshot link:\nTop 3 heroes + win rates:\nAvailability:\nBest clips (optional):",
)}`;

export default function RecruitPage() {
  return (
    <section className="grid-bg mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        kicker="Tryouts Open"
        title="Join the Venom"
        description="We&apos;re recruiting disciplined Mythic+ players who want to grind scrims, review VODs, and win tournaments."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <ScrollReveal>
          <div className="clip-notch h-full bg-surface p-7 ring-1 ring-line">
            <h3 className="font-display text-sm font-bold tracking-[0.25em] text-venom uppercase">
              Requirements
            </h3>
            <ul className="mt-6 space-y-4">
              {recruitment.requirements.map((req) => (
                <li key={req.title} className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center bg-venom/15 text-xs font-black text-venom ring-1 ring-venom/40 clip-notch-sm">
                    ✓
                  </span>
                  <div>
                    <p className="font-body text-base font-bold">{req.title}</p>
                    <p className="font-body text-sm leading-relaxed text-muted">
                      {req.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-6">
          <ScrollReveal delay={120}>
            <div className="clip-notch bg-surface p-7 ring-1 ring-line">
              <h3 className="font-display text-sm font-bold tracking-[0.25em] text-toxic uppercase">
                Open Positions
              </h3>
              {recruitment.openRoles.length > 0 ? (
                <>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {recruitment.openRoles.map((role) => (
                      <RoleBadge key={role} role={role} />
                    ))}
                  </div>
                  <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                    Starter slots are full — we&apos;re adding subs for rotation weeks.
                    Subs get equal scrim reps and first call on open starters.
                  </p>
                </>
              ) : (
                <p className="mt-5 font-body text-sm text-muted">
                  All starter and sub slots are currently filled. Watch this space —
                  it opens fast after roster moves.
                </p>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <div className="clip-notch h-full bg-surface p-7 ring-1 ring-venom/30">
              <h3 className="font-display text-sm font-bold tracking-[0.25em] text-venom uppercase">
                How to Apply
              </h3>
              <ol className="mt-5 space-y-2.5">
                {recruitment.applyInfo.map((info, i) => (
                  <li key={info} className="flex items-baseline gap-3">
                    <span className="font-display text-xs font-black text-venom/70 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-sm text-muted">{info}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-col gap-3">
                <GlowButton href={SITE.discord} external className="w-full">
                  Apply via Discord
                </GlowButton>
                <a
                  href={mailto}
                  className="clip-notch-sm block w-full px-6 py-3 text-center font-display text-xs tracking-[0.15em] text-muted uppercase ring-1 ring-line transition-all hover:text-foreground hover:ring-venom/40"
                >
                  Or apply by email
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-3xl">
        <SectionHeading kicker="FAQ" title="Before You Ask" />
        <div className="mt-10">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
