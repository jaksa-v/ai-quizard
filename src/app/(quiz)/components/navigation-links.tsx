"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationLinks() {
  const pathname = usePathname();

  return (
    <div className="flex gap-x-2">
      <Link href="/">
        <Button variant="link" className={cn(pathname === "/" && "underline")}>
          Home
        </Button>
      </Link>
      <Link href="/my">
        <Button
          variant="link"
          className={cn(pathname === "/my" && "underline")}
        >
          My Quizzes
        </Button>
      </Link>
    </div>
  );
}
