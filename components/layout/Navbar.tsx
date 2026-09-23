"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/hooks/useCart";
import { strings } from "@/lib/strings";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import type { Session } from "@/lib/data/types";

export function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [session, setSession] = useState<Session | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Fetch session on mount
    fetch("/api/session")
      .then((r) => r.json())
      .then((data) => setSession(data.session || null))
      .catch(() => {});
  }, [pathname]);

  const isAdmin = pathname.startsWith("/admin");

  const navLinks = [
    { href: "/", label: strings.navHome },
    { href: "/types", label: strings.navTypes },
  ];

  return (
    <header className="sticky top-0 z-40 glass">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-lg font-bold tracking-tight text-primary focus-ring rounded-input"
        >
          {strings.siteName}
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-[--transition-fast] focus-ring rounded-input px-2 py-1",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Order link with count */}
          <Link
            href="/order-summary"
            className={cn(
              "relative text-sm font-medium transition-colors duration-[--transition-fast] focus-ring rounded-input px-2 py-1",
              pathname === "/order-summary"
                ? "text-primary"
                : "text-muted hover:text-primary"
            )}
          >
            {strings.navOrderSummary}
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-3 bg-lime text-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Auth / Admin */}
          {session?.role === "admin" && (
            <Link
              href="/admin"
              className={cn(
                "text-sm font-medium transition-colors duration-[--transition-fast] focus-ring rounded-input px-2 py-1",
                isAdmin ? "text-primary" : "text-muted hover:text-primary"
              )}
            >
              {strings.navAdmin}
            </Link>
          )}

          {session ? (
            <form action="/api/logout" method="POST">
              <button
                type="submit"
                className="text-sm text-muted hover:text-primary transition-colors duration-[--transition-fast] focus-ring rounded-input px-2 py-1 cursor-pointer"
              >
                {strings.navLogout}
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className={cn(
                "text-sm font-medium transition-colors duration-[--transition-fast] focus-ring rounded-input px-2 py-1",
                pathname === "/login"
                  ? "text-primary"
                  : "text-muted hover:text-primary"
              )}
            >
              {strings.navLogin}
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="sm:hidden p-2 focus-ring rounded-input cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden glass border-t border-border px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-primary py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/order-summary"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-medium text-primary py-1"
          >
            {strings.navOrderSummary}
            {itemCount > 0 && (
              <span className="ml-2 bg-lime text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
          {session?.role === "admin" && (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-primary py-1"
            >
              {strings.navAdmin}
            </Link>
          )}
          {session ? (
            <form action="/api/logout" method="POST">
              <button
                type="submit"
                className="block text-sm text-muted py-1 cursor-pointer"
              >
                {strings.navLogout}
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-primary py-1"
            >
              {strings.navLogin}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
