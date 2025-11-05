"use client";
import Link from "next/link";
import { useUiStore } from "@/store/theme";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen, toggleSidebar } = useUiStore();
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      <aside
        className={`border-r border-border bg-surface/60 backdrop-blur-xs ${
          sidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="h-14 flex items-center px-4 border-b border-border/60">
          <span className="text-text-primary font-semibold">FinX</span>
        </div>
        <nav className="p-3 space-y-1">
          <Link href="/" className="block px-3 py-2 rounded hover:bg-surface-hover">
            Overview
          </Link>
          <Link
            href="/portfolio"
            className="block px-3 py-2 rounded hover:bg-surface-hover"
          >
            Portfolio
          </Link>
          <Link
            href="/markets"
            className="block px-3 py-2 rounded hover:bg-surface-hover"
          >
            Markets
          </Link>
        </nav>
      </aside>
      <div className="min-h-screen flex flex-col">
        <header className="h-14 flex items-center justify-between px-4 border-b border-border/60">
          <button
            onClick={toggleSidebar}
            className="lg:hidden inline-flex items-center gap-2 text-text-secondary hover:text-text-primary"
          >
            <Menu size={18} />
            Menu
          </button>
          <div className="text-sm text-text-secondary">Dark Space Purple Theme</div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
