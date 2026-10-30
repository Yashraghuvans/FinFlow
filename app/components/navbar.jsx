"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  History,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, role, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const getDashboardLink = () => {
    if (!user) return "/signin";
    return role === "contractor" ? "/dashboard/contractor" : "/dashboard/user";
  };

  const authNavLinks = [
    { name: "Dashboard", href: getDashboardLink(), icon: LayoutDashboard },
  ];

  if (role === "user") {
    authNavLinks.push({ name: "Ledger", href: "/ledger", icon: History });
    authNavLinks.push({
      name: "Scenarios",
      href: "/scenarios",
      icon: TrendingUp,
    });
  }

  const linkActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300 ${
        isScrolled || isMenuOpen
          ? "border-b border-[color:var(--surface-border)] bg-[var(--background)]/90 shadow-sm shadow-black/20 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="page-container flex h-[var(--nav-height)] items-center justify-between"
        aria-label="Main"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 text-sm font-semibold text-indigo-300 transition-colors group-hover:bg-indigo-500/25">
            F
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            FinFlow
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {user ? (
            <>
              {authNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    linkActive(link.href)
                      ? "bg-white/10 text-white"
                      : "text-[var(--muted)] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <span className="mx-2 h-4 w-px bg-white/10" aria-hidden />
              <button
                type="button"
                onClick={handleLogout}
                className="btn-ghost px-3 py-2 text-red-400/90 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn-ghost px-4">
                Sign in
              </Link>
              <Link href="/signin" className="btn-primary ml-1 px-5">
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X size={22} strokeWidth={1.75} />
          ) : (
            <Menu size={22} strokeWidth={1.75} />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-nav"
          className="animate-slide-down border-t border-[color:var(--surface-border)] bg-[var(--background)] md:hidden"
        >
          <div className="page-container flex flex-col gap-1 py-4 pb-6">
            {user ? (
              <>
                {authNavLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium ${
                        linkActive(link.href)
                          ? "bg-white/10 text-white"
                          : "text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-5 w-5 opacity-60" aria-hidden />
                      {link.name}
                    </Link>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="h-5 w-5" aria-hidden />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-xl px-4 py-3 text-center text-base font-medium text-zinc-300 hover:bg-white/5"
                >
                  Sign in
                </Link>
                <Link href="/signin" className="btn-primary mt-2 w-full py-3">
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
