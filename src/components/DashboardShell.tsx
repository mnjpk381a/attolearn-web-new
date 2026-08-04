"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { deleteCookie } from "cookies-next";
import {
  FaBars,
  FaBell,
  FaChevronDown,
  FaRegUserCircle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { useAuthStore } from "@/store/useAuthStore";
import {
  getNavLinks,
  getRoleLabel,
  getWorkspaceLabel,
  roleHomeByType,
} from "@/components/dashboardNav";

const sidebarBackgroundStyle = {
  backgroundColor: "#0b6671",
  backgroundImage: "linear-gradient(180deg, #084a54 0%, #0b6671 100%)",
};

const mainBackgroundStyle = {
  backgroundColor: "#f3f6f8",
  backgroundImage:
    "radial-gradient(circle at top right, rgba(0,115,129,0.08), transparent 22%)",
};

const headerBackgroundStyle = {
  backgroundColor: "#0b6671",
  backgroundImage:
    "linear-gradient(90deg, #0a5861 0%, #0b6671 45%, #0d7682 100%)",
};

function matchesPath(pathname: string, path: string) {
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const sessionToken = useAuthStore((state) => state.sessionToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const roleLabel = getRoleLabel(user?.typeId);
  const workspaceLabel = getWorkspaceLabel(user?.typeId);
  const homeHref = roleHomeByType[user?.typeId ?? -1] ?? "/login";
  const navLinks = useMemo(() => getNavLinks(user?.typeId), [user?.typeId]);
  const activeItem = navLinks.find((item) => matchesPath(pathname, item.path));
  const pageTitle = activeItem?.label || roleLabel;
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`
    .toUpperCase()
    .trim();

  useEffect(() => {
    if (isHydrated && (!user || !sessionToken)) {
      router.replace("/login");
    }
  }, [isHydrated, router, sessionToken, user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearAuth();
    deleteCookie("sessionToken");
    router.replace("/login");
  };

  if (!isHydrated || !user || !sessionToken) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100">
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 text-sm font-medium text-slate-600 shadow-sm">
          Loading workspace...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-white text-black">
      <div className="flex h-screen overflow-hidden bg-slate-100">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col text-white shadow-xl transition-transform duration-300 ease-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:static md:translate-x-0`}
          style={sidebarBackgroundStyle}
        >
          <Link
            href={homeHref}
            onClick={() => {
              setIsSidebarOpen(false);
              setIsUserMenuOpen(false);
            }}
            className="flex items-center gap-3 border-b border-white/10 p-4 transition hover:bg-white/4"
          >
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image
                src="/images/Stats/AttoLearn-Logo_footer.png"
                alt="AttoLearn"
                width={44}
                height={44}
                className="h-11 w-11 object-contain p-1"
                priority
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm leading-tight font-semibold text-white">
                {workspaceLabel}
              </h2>
              <p className="mt-1 truncate text-[10px] font-semibold tracking-[0.18em] text-white/55 uppercase">
                {roleLabel}
              </p>
            </div>
          </Link>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.22em] text-white/45 uppercase">
              Menu
            </p>
            <ul className="space-y-0.5">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = matchesPath(pathname, item.path);

                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => {
                        setIsSidebarOpen(false);
                        setIsUserMenuOpen(false);
                      }}
                      className={`group relative flex items-center gap-3 rounded-md py-2 pr-2 pl-3 text-sm transition-colors ${
                        isActive
                          ? "bg-white/12 font-semibold text-white"
                          : "font-medium text-white/75 hover:bg-white/6 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-r-full bg-white" />
                      )}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-white/60 group-hover:text-white"
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-white/10 px-5 py-4">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-white/55 uppercase">
              Access
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="truncate text-sm font-semibold text-white">
                {roleLabel}
              </p>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Active
              </span>
            </div>
          </div>
        </aside>

        <div
          className="flex min-w-0 flex-1 flex-col"
          style={mainBackgroundStyle}
        >
          <header
            className="sticky top-0 z-30 border-b border-white/10 backdrop-blur-xl"
            style={headerBackgroundStyle}
          >
            <div className="flex h-18 items-center justify-between gap-3 px-3 sm:h-20 sm:px-4 md:px-6">
              <div className="flex min-w-0 items-center gap-3 md:gap-4">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen((prev) => !prev)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/95 text-slate-700 shadow-sm transition hover:border-white/30 hover:text-[#007381] md:hidden"
                  aria-label="Toggle sidebar"
                >
                  {isSidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <h1 className="truncate text-lg font-semibold text-white sm:text-xl md:text-2xl">
                      {pageTitle}
                    </h1>
                  </div>
                  <p className="hidden truncate text-sm text-white/82 md:block">
                    A cleaner workspace for daily learning operations and
                    planning.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 md:gap-3">
                <button
                  type="button"
                  className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white shadow-[0_16px_35px_-24px_rgba(15,23,42,0.9)] backdrop-blur-md transition hover:border-white/30 hover:bg-white/14 hover:text-amber-200 sm:h-11 sm:w-11"
                  title="Notifications"
                >
                  <FaBell size={17} />
                  <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-[#0b6671] sm:top-3 sm:right-3" />
                </button>

                <div ref={userMenuRef} className="relative shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/10 pr-1.5 pl-0.5 text-left text-white shadow-[0_16px_35px_-24px_rgba(15,23,42,0.9)] backdrop-blur-md transition hover:border-white/30 hover:bg-white/14 sm:h-11 sm:gap-2.5 sm:pr-2"
                  >
                    {user.photo ? (
                      <Image
                        src={user.photo}
                        alt={`${fullName || "User"} profile`}
                        width={36}
                        height={36}
                        className="h-8 w-8 rounded-full border border-white/25 object-cover sm:h-9 sm:w-9"
                        unoptimized
                      />
                    ) : initials ? (
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xs font-semibold text-[#0b6671] sm:h-9 sm:w-9 sm:text-sm">
                        {initials}
                      </span>
                    ) : (
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 sm:h-9 sm:w-9">
                        <FaRegUserCircle size={20} />
                      </span>
                    )}

                    <FaChevronDown
                      className={`hidden text-white/70 transition sm:block ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                      size={14}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 z-50 mt-3 w-[min(18rem,calc(100vw-1rem))] overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.22)]">
                      <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#0a6a75_0%,#0f8894_100%)] p-4 text-white">
                        <p className="text-[11px] font-semibold tracking-[0.24em] text-white/75 uppercase">
                          Signed in as
                        </p>
                        <p className="mt-2 text-base font-semibold">
                          {fullName || "AttoLearn User"}
                        </p>
                        <p className="mt-1 text-sm text-white/90">
                          {roleLabel}
                        </p>
                      </div>

                      <div className="space-y-3 bg-white p-4 text-slate-900">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                            Workspace
                          </p>
                          <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                            {workspaceLabel}
                          </p>
                          {user.email && (
                            <p className="mt-1 truncate text-xs text-slate-500">
                              {user.email}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                          <FaSignOutAlt size={14} />
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto px-2 pt-3 pb-20 md:px-3 md:pt-3 md:pb-24">
            <div className="mx-auto w-full max-w-400">{children}</div>
          </main>
        </div>
      </div>

      <footer className="fixed bottom-0 z-40 w-full bg-[#007381] text-center text-white">
        <p className="p-4 text-sm">© 2026 Attolearn. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
