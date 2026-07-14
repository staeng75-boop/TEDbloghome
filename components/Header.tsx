"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/certifications", label: "인증·평가" },
  { href: "/infrastructure", label: "기반시설·전자금융" },
  { href: "/insights", label: "보안 인사이트" },
  { href: "/resources", label: "자료실" },
  { href: "/about", label: "소개" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="text-xl font-extrabold tracking-tight text-brand-navy">
            TED BLOG
          </span>
          <span className="text-xl font-light tracking-tight text-brand">
            Security
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[15px] font-medium transition-colors hover:text-brand ${
                pathname.startsWith(item.href)
                  ? "text-brand"
                  : "text-slate-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-brand px-5 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            문의
          </Link>
        </nav>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-md text-slate-700 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-content flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-slate-100 py-3.5 text-[15px] font-medium ${
                  pathname.startsWith(item.href)
                    ? "text-brand"
                    : "text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-brand py-3 text-center text-[15px] font-semibold text-white"
            >
              문의
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
