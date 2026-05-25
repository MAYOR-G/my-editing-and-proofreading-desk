"use client";

import type { ReactNode } from "react";
import { useTransition } from "react";
import { adminLogout } from "@/app/actions/admin";
import { signout } from "@/app/actions/auth";

type LogoutButtonProps = {
  mode?: "user" | "admin";
  className?: string;
  children?: ReactNode;
};

export function LogoutButton({ mode = "user", className, children }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          void (mode === "admin" ? adminLogout() : signout());
        });
      }}
      className={className}
    >
      {isPending ? "Signing out..." : children || "Sign out"}
    </button>
  );
}
