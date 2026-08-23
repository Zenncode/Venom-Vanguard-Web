import type { JSX } from "react";
import { ROLE_META, type Role } from "@/app/data/squad";

type RoleBadgeProps = {
  role: Role;
};

const RoleBadge = ({ role }: RoleBadgeProps): JSX.Element => {
  const meta = ROLE_META[role];
  return (
    <span
      className="clip-notch-sm inline-flex w-fit items-center gap-1.5 px-2.5 py-1 font-display text-[10px] font-bold tracking-[0.18em] uppercase"
      style={{
        color: meta.color,
        background: `${meta.color}14`,
        boxShadow: `inset 0 0 0 1px ${meta.color}55`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: meta.color, boxShadow: `0 0 6px ${meta.color}` }}
      />
      {meta.label}
    </span>
  );
};

export default RoleBadge;
