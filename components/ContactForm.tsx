"use client";

import { useState } from "react";

const TOPICS = [
  "ISMS-P 인증 준비",
  "CSAP 클라우드 보안인증",
  "ISO 27001 / 27701",
  "주요정보통신기반시설 취약점 분석·평가",
  "전자금융기반시설 보안 취약점 평가",
  "개인정보보호 체계 진단",
  "블로그 주제 제안",
  "기타",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          topic: data.get("topic"),
          message: data.get("message"),
          honey: data.get("honey"),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || "전송에 실패했습니다.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setErrorMsg("네트워크 오류로 전송에 실패했습니다.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-brand/30 bg-mist-50 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h2 className="mt-5 text-xl font-bold text-slate-900">
          문의가 접수되었습니다
        </h2>
        <p className="mt-2 text-slate-600">
          개인적인 블로그이므로 답변이 다소 늦을 수 있는 점 양해 부탁드립니다.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-block font-semibold text-brand hover:text-brand-deep"
        >
          새 문의 작성 →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9"
    >
      <input
        type="text"
        name="honey"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-slate-900"
          >
            성함 / 소속 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="홍길동 / OO기관"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-900"
          >
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="reply@example.com"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </div>
      <div className="mt-6">
        <label
          htmlFor="topic"
          className="block text-sm font-semibold text-slate-900"
        >
          문의 분야
        </label>
        <select
          id="topic"
          name="topic"
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="mt-6">
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-slate-900"
        >
          문의 내용 <span className="text-red-500">*</span>
        </label>
        <p className="mt-1 text-sm text-slate-500">
          상담 문의라면 기관 규모와 준비 일정을 함께 적어주시면 더 정확한
          안내가 가능합니다.
        </p>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>
      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-7 w-full rounded-full bg-brand py-3.5 font-semibold text-white transition-colors hover:bg-brand-deep disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "loading" ? "보내는 중..." : "문의 보내기"}
      </button>
    </form>
  );
}
