import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** Internal paths built at runtime. The router accepts them; the union is too wide to list here. */
export function AppLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to as never} className={className}>
      {children}
    </Link>
  );
}
