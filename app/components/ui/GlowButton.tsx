import type { JSX, ReactNode } from "react";
import Link from "next/link";

type GlowButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "outline";
  external?: boolean;
  className?: string;
};

const GlowButton = ({
  children,
  href,
  variant = "primary",
  external = false,
  className = "",
}: GlowButtonProps): JSX.Element => {
  const styles =
    variant === "primary"
      ? "bg-venom text-background font-bold hover:shadow-[0_0_26px_rgba(124,252,0,0.55)]"
      : "bg-transparent text-venom ring-1 ring-venom/50 hover:bg-venom/10 hover:shadow-[0_0_18px_rgba(124,252,0,0.3)] font-semibold";

  const classes = `clip-notch inline-flex items-center justify-center gap-2 px-6 py-3 font-display text-xs tracking-[0.15em] uppercase transition-all duration-300 active:scale-[0.97] ${styles} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
};

export default GlowButton;
