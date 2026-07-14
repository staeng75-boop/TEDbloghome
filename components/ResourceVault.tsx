"use client";

import { useState } from "react";
import type { ResourceItem } from "@/lib/resources";
import HiddenWrite from "@/components/HiddenWrite";

export default function ResourceVault({
  categories,
  items,
}: {
  categories: Record<string, string>;
  items: ResourceItem[];
}) {
  const [activeTab, setActiveTab] = useState<string>("all");

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

      <div className="mt-6">
        <HiddenWrite
          type="resource"
          count={visible.length}
          unit="건"
          triggerText="자료"
          categories={categories}
          defaultCategory={activeTab === "all" ? undefined : activeTab}
        />
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
