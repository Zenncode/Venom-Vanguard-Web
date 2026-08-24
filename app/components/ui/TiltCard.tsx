"use client";

import type { CSSProperties, JSX, MouseEvent, ReactNode } from "react";
import { useCallback, useRef, useState } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
};

const TiltCard = ({
  children,
  className = "",
  maxTilt = 8,
  glare = true,
}: TiltCardProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [glaring, setGlaring] = useState(false);
  const reduced = useRef(false);

  const handleMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || reduced.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        reduced.current = true;
        return;
      }
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * maxTilt;
      const ry = (px - 0.5) * maxTilt;
      setStyle({
        transform: `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(6px)`,
        transition: "transform 60ms linear",
      });
      setGlarePos({ x: px * 100, y: py * 100 });
    },
    [maxTilt],
  );

  const handleEnter = useCallback(() => setGlaring(true), []);

  const handleLeave = useCallback(() => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)",
      transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
    });
    setGlaring(false);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={style}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
            glaring ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(162, 89, 255,0.12), transparent 55%)`,
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;
