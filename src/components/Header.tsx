"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems } from "@/constants/navigation";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement | null>(null);

  // close dropdown on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!headerRef.current?.contains(el)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="flex h-19 items-center justify-between gap-3">
          <Link
            href="/"
            prefetch={false}
            className="flex items-center gap-2 focus:outline-none focus-visible:outline-none focus:ring-0 cursor-pointer"
            onClick={() => {
              setMobileOpen(false);
              setOpenDropdown(null);
            }}
          >
            <Image
              src="/images/Stats/AttoLearn_Logo.png"
              alt="Attobility"
              width={300}
              height={70}
              priority
              className="h-19 w-42 object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => {
              if ("children" in item) {
                const key = item.label;
                const isOpen = openDropdown === key;

                return (
                  <div key={key} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(isOpen ? null : key)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-[#808080] transition hover:bg-gray-50 hover:text-[#003238] focus:outline-none focus-visible:outline-none focus:ring-0"
                    >
                      <span className="inline-flex items-center gap-1">
                        {item.label}
                        <svg
                          className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>

                    {isOpen && (
                      <div className="absolute left-0 mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                        <div className="py-1">
                          {item.children.map((c) => (
                            <Link
                              key={c.label}
                              href={c.disabled ? "#" : c.href}
                              prefetch={false}
                              aria-disabled={c.disabled}
                              tabIndex={c.disabled ? -1 : 0}
                              className={`block px-4 py-2 text-sm transition focus:outline-none focus-visible:outline-none focus:ring-0 ${
                                c.disabled
                                  ? "cursor-not-allowed bg-gray-50 text-gray-400"
                                  : "text-[#077784] hover:bg-gray-50 hover:text-[#003238]"
                              }`}
                              onClick={(e) => {
                                if (c.disabled) {
                                  e.preventDefault();
                                  return;
                                }
                                setMobileOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  prefetch={false}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:outline-none focus:ring-0 ${
                    active
                      ? "bg-gray-50 font-semibold text-[#4fb4c0]"
                      : "text-[#808080] hover:bg-gray-50 hover:text-[#003238]"
                  }`}
                  onClick={() => {
                    setMobileOpen(false);
                    setOpenDropdown(null);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            <a
              href="https://portal.attolearn.com/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center justify-center rounded-lg bg-[#077784] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005e66] focus:outline-none focus-visible:outline-none focus:ring-0"
              onClick={() => {
                setMobileOpen(false);
                setOpenDropdown(null);
              }}
            >
              Sign In / Sign Up
            </a>
            {/* <Link
              href="/choose-module"
              prefetch={false}
              className="ml-2 inline-flex items-center justify-center rounded-lg bg-[#077784] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005e66] focus:outline-none focus-visible:outline-none focus:ring-0"
              onClick={() => {
                setMobileOpen(false);
                setOpenDropdown(null);
              }}
            >
              Sign In / Sign Up
            </Link> */}
          </nav>

          {/* Mobile Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:outline-none focus:ring-0 xl:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white xl:hidden">
          <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4 lg:px-6">
            <div className="space-y-2">
              {navItems.map((item) => {
                if ("children" in item) {
                  const key = item.label;
                  const isOpen = openDropdown === key;

                  return (
                    <div
                      key={key}
                      className="overflow-hidden rounded-xl border border-gray-200"
                    >
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-gray-50 px-3 py-2 text-left text-sm font-semibold text-[#077784] focus:outline-none focus-visible:outline-none focus:ring-0"
                        onClick={() => setOpenDropdown(isOpen ? null : key)}
                      >
                        {item.label}
                        <svg
                          className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {isOpen && (
                        <div className="bg-white">
                          {item.children.map((c) => (
                            <Link
                              key={c.label}
                              href={c.disabled ? "#" : c.href}
                              prefetch={false}
                              aria-disabled={c.disabled}
                              tabIndex={c.disabled ? -1 : 0}
                              className={`block border-t border-gray-100 px-3 py-2 text-sm focus:outline-none focus-visible:outline-none focus:ring-0 ${
                                c.disabled
                                  ? "cursor-not-allowed bg-gray-50 text-gray-400"
                                  : "text-[#077784] hover:bg-gray-50 hover:text-[#003238]"
                              }`}
                              onClick={(e) => {
                                if (c.disabled) {
                                  e.preventDefault();
                                  return;
                                }
                                setMobileOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    prefetch={false}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:outline-none focus:ring-0 ${
                      active
                        ? "bg-gray-50 font-semibold text-[#4fb4c0]"
                        : "text-[#077784] hover:bg-gray-50 hover:text-[#003238]"
                    }`}
                    onClick={() => {
                      setMobileOpen(false);
                      setOpenDropdown(null);
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <a
                href="https://portal.attolearn.com/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#077784] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005e66] focus:outline-none focus-visible:outline-none focus:ring-0"
                onClick={() => {
                  setMobileOpen(false);
                  setOpenDropdown(null);
                }}
              >
                Sign In / Sign Up
              </a>

              {/* <Link
                href="/choose-module"
                prefetch={false}
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#077784] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#005e66] focus:outline-none focus-visible:outline-none focus:ring-0"
                onClick={() => {
                  setMobileOpen(false);
                  setOpenDropdown(null);
                }}
              >
                Sign In / Sign Up
              </Link> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
