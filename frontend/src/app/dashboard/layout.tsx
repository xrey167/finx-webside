"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: CurrencyDollarIcon },
  { name: "Charts", href: "/dashboard/charts", icon: ChartBarIcon },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <nav className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-border p-4">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-bold gradient-text">FinX</h1>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}

      <nav className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-surface lg:border-r lg:border-border lg:p-4 lg:block">
        <div className="mb-8">
          <h1 className="text-xl font-bold gradient-text">FinX</h1>
        </div>
        <div className="space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center px-3 py-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="lg:ml-64">
        <header className="bg-surface border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Bars3Icon className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-text-secondary">Welcome, {user?.email}</span>
              <Button variant="secondary" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
