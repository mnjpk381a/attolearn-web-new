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
        <div className="flex h-16 items-center justify-between gap-3 sm:h-19">
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
              src="/images/EducationIcon/AttoLearn_Logo.png"
              alt="Attobility"
              width={300}
              height={70}
              priority
              className="h-14 w-36 object-contain sm:h-19 sm:w-42"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden min-w-0 translate-y-1 items-center gap-0.5 xl:flex 2xl:gap-2">
            {navItems.map((item) => {
              if ("children" in item) {
                const key = item.label;
                const isOpen = openDropdown === key;

                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(key)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(isOpen ? null : key)}
                      className="whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] font-semibold text-black transition hover:bg-gray-50 focus:outline-none focus-visible:outline-none focus:ring-0 2xl:px-3 2xl:text-sm"
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
                      <div className="absolute left-0 top-full z-10 w-64 pt-2">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                          {item.children.map((c) => (
                            <Link
                              key={c.label}
                              href={c.disabled ? "#" : c.href}
                              prefetch={false}
                              aria-disabled={c.disabled}
                              tabIndex={c.disabled ? -1 : 0}
                              className={`block px-4 py-2 transition focus:outline-none focus-visible:outline-none focus:ring-0 ${
                                c.disabled
                                  ? "cursor-not-allowed bg-gray-50 text-gray-400"
                                  : "text-black hover:bg-gray-50"
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
                              <span className="block text-sm font-semibold">
                                {c.label}
                              </span>
                              {c.description && (
                                <span className="mt-0.5 block text-xs font-normal text-gray-500">
                                  {c.description}
                                </span>
                              )}
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
                  className={`whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] font-semibold transition focus:outline-none focus-visible:outline-none focus:ring-0 2xl:px-3 2xl:text-sm ${
                    active
                      ? "bg-gray-50 font-semibold text-black"
                      : "text-black hover:bg-gray-50"
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
          <a
            href="https://portal.attolearn.com/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden translate-y-1 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#077784] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#005e66] focus:outline-none focus-visible:outline-none focus:ring-0 xl:inline-flex 2xl:text-sm"
            onClick={() => {
              setMobileOpen(false);
              setOpenDropdown(null);
            }}
          >
            Log In
          </a>

          {/* Mobile Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:outline-none focus:ring-0 xl:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
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
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-gray-200 bg-white sm:max-h-[calc(100dvh-4.75rem)] xl:hidden"
        >
          <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
            <div className="space-y-3">
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
                        className="flex w-full items-center justify-between bg-gray-50 px-3 py-2 text-left text-sm font-semibold text-black focus:outline-none focus-visible:outline-none focus:ring-0"
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
                              className={`block border-t border-gray-100 px-3 py-2 focus:outline-none focus-visible:outline-none focus:ring-0 ${
                                c.disabled
                                  ? "cursor-not-allowed bg-gray-50 text-gray-400"
                                  : "text-black hover:bg-gray-50"
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
                              <span className="block text-sm font-semibold">
                                {c.label}
                              </span>
                              {c.description && (
                                <span className="mt-0.5 block text-xs font-normal text-gray-500">
                                  {c.description}
                                </span>
                              )}
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
                    className={`block rounded-lg px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:outline-none focus:ring-0 ${
                      active
                        ? "bg-gray-50 font-semibold text-black"
                        : "text-black hover:bg-gray-50"
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
                Log In
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
