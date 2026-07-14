"use client";

import { useState } from "react";
import type { ResourceItem } from "@/lib/resources";

// 자료실 글쓰기 비밀번호의 SHA-256 해시.
// 비밀번호 변경: node -e "const c=require('crypto');console.log(c.createHash('sha256').update('새비밀번호').digest('hex'))"
const WRITE_HASH =
  "b82b5670b2bccf9f586e2243a5355f3c5d101a6a00ae8286c63df0e8937b91c4";

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
  const [activeTab, setActiveTab] = useState<string>("all");
  const [writeMode, setWriteMode] = useState<"closed" | "auth" | "open">(
    "closed"
  );
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const tryAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const hash = await sha256Hex(pass);
    if (hash === WRITE_HASH) {
      setWriteMode("open");
      setError("");
      setPass("");
    } else {
      setError("비밀번호가 일치하지 않습니다.");
    }
  };

  const tabs = [["all", "전체"], ...Object.entries(categories)] as [
    string,
    string,
  ][];
  const visible =
    activeTab === "all"
      ? items
      : items.filter((it) => it.category === activeTab);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
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
        {writeMode === "closed" && (
          <button
            onClick={() => setWriteMode("auth")}
            className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-brand hover:text-brand"
          >
            ✎ 글쓰기
          </button>
        )}
      </div>

      {writeMode === "auth" && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-900">
            글쓰기는 운영자 전용입니다
          </p>
          <form onSubmit={tryAuth} className="mt-3 flex flex-wrap gap-2">
            <label htmlFor="write-pass" className="sr-only">
              글쓰기 비밀번호
            </label>
            <input
              id="write-pass"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-56 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
            >
              확인
            </button>
            <button
              type="button"
              onClick={() => {
                setWriteMode("closed");
                setError("");
              }}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-500 hover:border-slate-400"
            >
              취소
            </button>
          </form>
          {error && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      )}

      {writeMode === "open" && (
        <form
          action="https://formsubmit.co/staeng75@gmail.com"
          method="POST"
          className="mt-6 rounded-2xl border border-brand/30 bg-mist-50 p-6"
        >
          <input
            type="hidden"
            name="_subject"
            value="[TED BLOG Security] 자료실 등록 요청"
          />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_next"
            value="https://tedbloghome.vercel.app/resources"
          />
          <p className="text-sm font-semibold text-slate-900">새 자료 등록</p>
          <p className="mt-1 text-xs text-slate-500">
            등록 요청이 운영자 메일로 전송되며, 검토 후 자료실에
            게시됩니다.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="res-title"
                className="block text-xs font-semibold text-slate-700"
              >
                제목
              </label>
              <input
                id="res-title"
                name="제목"
                type="text"
                required
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label
                htmlFor="res-cat"
                className="block text-xs font-semibold text-slate-700"
              >
                분류
              </label>
              <select
                id="res-cat"
                name="분류"
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                {Object.values(categories).map((label) => (
                  <option key={label}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="res-body"
              className="block text-xs font-semibold text-slate-700"
            >
              내용 (링크·설명)
            </label>
            <textarea
              id="res-body"
              name="내용"
              required
              rows={4}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
            >
              등록 요청 보내기
            </button>
            <button
              type="button"
              onClick={() => setWriteMode("closed")}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-500 hover:border-slate-400"
            >
              닫기
            </button>
          </div>
        </form>
      )}

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
                  <span className="w-44 shrink-0 text-xs font-semibold text-brand-deep">
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
