import type { JSX } from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps): JSX.Element => {
  const iconSize =
    size === "lg"
      ? "h-14 w-14 sm:h-16 sm:w-16"
      : size === "sm"
      ? "h-9 w-9"
      : "h-11 w-11 sm:h-12 sm:w-12";

  const textSize =
    size === "lg"
      ? "text-xl sm:text-2xl"
      : size === "sm"
      ? "text-sm"
      : "text-base sm:text-lg";

  return (
    <Link href="/" className="group inline-flex items-center gap-3 select-none">
      {/* High-Impact Cyber Viper Crest Icon */}
      <div
        className={`relative ${iconSize} flex-shrink-0 transition-all duration-300 drop-shadow-[0_0_12px_rgba(207, 107, 255,0.55)] group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(207, 107, 255,0.9)]`}
      >
        <Image
          src="/images/venom-viper-icon.png"
          alt="Venom Vanguard Logo"
          fill
          priority
          sizes="64px"
          className="object-contain object-center"
        />
      </div>

      {showText && (
        <span
          className={`font-display ${textSize} font-black tracking-widest text-foreground uppercase transition-colors group-hover:text-glow`}
        >
          Venom<span className="text-venom">Vanguard</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
