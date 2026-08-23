import type { JSX } from "react";
import Link from "next/link";

const Logo = (): JSX.Element => (
  <Link href="/" className="group inline-flex items-center gap-2.5">
    <span className="clip-notch-sm flex h-9 w-9 items-center justify-center bg-venom/15 font-display text-sm font-bold text-venom ring-1 ring-venom/40 transition-all group-hover:bg-venom/25 group-hover:shadow-[0_0_16px_rgba(124,252,0,0.4)]">
      VV
    </span>
    <span className="font-display text-base font-bold tracking-widest text-foreground uppercase">
      Venom<span className="text-venom">Vanguard</span>
    </span>
  </Link>
);

export default Logo;
