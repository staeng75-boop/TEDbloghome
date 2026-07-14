"use client";

import { useEffect, useState } from "react";
import type { ResourceItem } from "@/lib/resources";

// 자료실 접근 비밀번호의 SHA-256 해시.
// 비밀번호 변경: node -e "const c=require('crypto');console.log(c.createHash('sha256').update('새비밀번호').digest('hex'))"
const PASS_HASH =
  "c03a33575308f963c51875e848bbecff59925397287fd6ae9c05628abbf3bea3";

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function ResourceVault({
  categories,
  items,
}: {
  categories: Record<string, string>;
  items: ResourceItem[];
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    if (sessionStorage.getItem("vault") === PASS_HASH) setUnlocked(true);
  }, []);

  const tryUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    const hash = await sha256Hex(input);
    if (hash === PASS_HASH) {
      sessionStorage.setItem("vault", hash);
      setUnlocked(true);
      setError("");
    } else {
      setError("비밀번호가 일치하지 않습니다.");
    }
  };

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mist-100 text-brand">
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <h2 className="mt-5 text-lg font-bold text-slate-900">
          비공개 게시판입니다
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          자료실은 운영자 전용 공간입니다.
        </p>
        <form onSubmit={tryUnlock} className="mt-6">
          <label htmlFor="vault-pass" className="sr-only">
            비밀번호
          </label>
          <input
            id="vault-pass"
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="비밀번호 입력"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-center outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          {error && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-brand py-3 font-semibold text-white transition-colors hover:bg-brand-deep"
          >
            열기
          </button>
        </form>
      </div>
    );
  }

  const tabs = [
    ["all", "전체"],
    ...Object.entries(categories),
  ] as [string, string][];
  const visible =
    activeTab === "all"
      ? items
      : items.filter((it) => it.category === activeTab);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map(([key, label]) => {
          const count =
            key === "all"
              ? items.length
              : items.filter((it) => it.category === key).length;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === key
                  ? "bg-brand text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand"
              }`}
            >
              {label} <span className="opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-b-2 border-slate-800 pb-3">
        <p className="text-sm font-semibold text-slate-700">
          자료 <span className="text-brand">{visible.length}</span>건
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          이 분류에는 아직 자료가 없습니다.
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {visible.map((it) => (
            <li key={it.slug}>
              <details className="group px-2">
                <summary className="flex cursor-pointer list-none flex-col gap-1 py-4 transition-colors hover:bg-mist-50 sm:flex-row sm:items-center sm:gap-4">
                  <span className="w-40 shrink-0 text-xs font-semibold text-brand-deep">
                    [{categories[it.category]}]
                  </span>
                  <span className="flex-1 font-medium text-slate-800 group-open:text-brand">
                    {it.title}
                  </span>
                  <time className="shrink-0 text-sm text-slate-400">
                    {it.date}
                  </time>
                </summary>
                <div
                  className="prose-post border-l-2 border-mist-200 px-5 pb-6"
                  dangerouslySetInnerHTML={{ __html: it.html }}
                />
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
