"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects/new", label: "New Project", icon: PlusCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 border-r bg-muted/30 md:block">
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === href || pathname.startsWith(href + "/")
                ? "bg-venture/10 text-venture"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex border-t bg-background md:hidden">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium",
            pathname === href || pathname.startsWith(href + "/")
              ? "text-venture"
              : "text-muted-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </Link>
      ))}
      <Link
        href="/dashboard"
        className={cn(
          "flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium",
          pathname.startsWith("/projects/") && !pathname.includes("/new")
            ? "text-venture"
            : "text-muted-foreground"
        )}
      >
        <FolderOpen className="h-5 w-5" />
        Projects
      </Link>
    </nav>
  );
}
