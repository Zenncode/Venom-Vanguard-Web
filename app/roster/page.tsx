import type { Metadata } from "next";
import { Suspense } from "react";
import SectionHeading from "@/app/components/ui/SectionHeading";
import RosterGrid from "@/app/components/roster/RosterGrid";
import { players } from "@/app/data/squad";

export const metadata: Metadata = {
  title: "Roster",
  description:
    "Meet the Venom Vanguard strike team — every lane covered, from jungle to roam.",
};

export default function RosterPage() {
  return (
    <section className="grid-bg mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        kicker="The Strike Team"
        title="Squad Roster"
        description="Five lanes. Six players. Zero gaps. Tap a member to inspect their full profile."
      />
      <div className="mt-12">
        <Suspense fallback={null}>
          <RosterGrid players={players} />
        </Suspense>
      </div>
    </section>
  );
}
