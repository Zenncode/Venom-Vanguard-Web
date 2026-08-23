import Link from "next/link";
import GlowButton from "@/app/components/ui/GlowButton";

export default function NotFound() {
  return (
    <section className="grid-bg flex min-h-[70dvh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-black text-venom/15 sm:text-9xl">404</p>
      <h1 className="text-glow -mt-6 font-display text-2xl font-black tracking-wide uppercase sm:text-3xl">
        Lost in the Jungle
      </h1>
      <p className="mt-4 max-w-md font-body text-base text-muted">
        This page got ganked and never respawned. Rotate back to base.
      </p>
      <div className="mt-8">
        <GlowButton href="/">Back to Home</GlowButton>
      </div>
      <Link
        href="/matches"
        className="mt-5 font-body text-sm font-semibold tracking-wide text-muted underline decoration-venom/40 underline-offset-8 transition-colors hover:text-venom"
      >
        Or check the match record instead
      </Link>
    </section>
  );
}
