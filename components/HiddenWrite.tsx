"use client";

import { useState } from "react";

// 트리거 텍스트("전체 글"/"자료")를 클릭하면 비밀번호 확인 후
// 글 등록 폼이 열리고, /api/write 를 통해 실제 저장된다.
export default function HiddenWrite({
  type,
  count,
  unit,
  triggerText,
  categories,
  defaultCategory,
}: {
  type: "post" | "resource";
  count: number;
  unit: string;
  triggerText: string;
  categories: Record<string, string>;
  defaultCategory?: string;
}) {
  const [mode, setMode] = useState<"closed" | "auth" | "open" | "done">(
    "closed"
  );
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(
    defaultCategory ?? Object.keys(categories)[0]
  );
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [doneMsg, setDoneMsg] = useState("");

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.slice(result.indexOf(",") + 1));
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const tryAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, type, title: "", content: "" }),
      });
      if (res.status === 401) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setMode("open");
      }
    } catch {
      setError("확인 중 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const fileBase64 = file ? await fileToBase64(file) : undefined;
      const res = await fetch("/api/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          type,
          title,
          category,
          content,
          fileBase64,
          fileName: file?.name,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setDoneMsg(data.message ?? "저장되었습니다.");
        setMode("done");
        setTitle("");
        setContent("");
        setFile(null);
      } else {
        setError(data.error ?? "저장에 실패했습니다.");
      }
    } catch {
      setError("저장 중 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };

  const close = () => {
    setMode("closed");
    setPassword("");
    setError("");
  };

  return (
    <div>
      <div className="border-b-2 border-slate-800 pb-3">
        <p className="text-sm font-semibold text-slate-700">
          <button
            type="button"
            onClick={() => mode === "closed" && setMode("auth")}
            className="cursor-text font-semibold text-slate-700"
            aria-label={triggerText}
          >
            {triggerText}
          </button>{" "}
          <span className="text-brand">{count}</span>
          {unit}
        </p>
      </div>

      {mode === "auth" && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold text-slate-900">
            글 등록은 운영자 전용입니다
          </p>
          <form onSubmit={tryAuth} className="mt-3 flex flex-wrap gap-2">
            <label htmlFor={`hw-pass-${type}`} className="sr-only">
              비밀번호
            </label>
            <input
              id={`hw-pass-${type}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-56 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep disabled:opacity-50"
            >
              {busy ? "확인 중..." : "확인"}
            </button>
            <button
              type="button"
              onClick={close}
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

      {mode === "open" && (
        <form
          onSubmit={submit}
          className="mt-4 rounded-2xl border border-brand/30 bg-mist-50 p-6"
        >
          <p className="text-sm font-semibold text-slate-900">새 글 등록</p>
          <p className="mt-1 text-xs text-slate-500">
            등록하면 사이트에 바로 반영됩니다. 내용은 마크다운 문법을
            지원합니다.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`hw-title-${type}`}
                className="block text-xs font-semibold text-slate-700"
              >
                제목
              </label>
              <input
                id={`hw-title-${type}`}
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
            <div>
              <label
                htmlFor={`hw-cat-${type}`}
                className="block text-xs font-semibold text-slate-700"
              >
                분류
              </label>
              <select
                id={`hw-cat-${type}`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              >
                {Object.entries(categories).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor={`hw-body-${type}`}
              className="block text-xs font-semibold text-slate-700"
            >
              내용
            </label>
            <textarea
              id={`hw-body-${type}`}
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor={`hw-file-${type}`}
              className="block text-xs font-semibold text-slate-700"
            >
              파일 첨부 (선택, 최대 4MB)
            </label>
            <p className="mt-1 text-xs text-slate-500">
              이미지는 본문에 바로 표시되고, 문서·압축 파일은 다운로드
              링크로 첨부됩니다. (이미지, PDF, HWP/HWPX, DOC/DOCX,
              XLS/XLSX, PPT/PPTX, ZIP, TXT)
            </p>
            <input
              id={`hw-file-${type}`}
              type="file"
              accept="image/*,.pdf,.hwp,.hwpx,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-1.5 w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-mist-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-deep hover:file:bg-mist-200"
            />
            {file && (
              <p className="mt-1.5 text-xs text-slate-500">
                선택됨: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
              </p>
            )}
          </div>
          {error && (
            <p role="alert" className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep disabled:opacity-50"
            >
              {busy ? "저장 중..." : "등록"}
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-500 hover:border-slate-400"
            >
              닫기
            </button>
          </div>
        </form>
      )}

      {mode === "done" && (
        <div className="mt-4 rounded-2xl border border-brand/30 bg-mist-50 p-6 text-sm">
          <p className="font-semibold text-brand-deep">✓ {doneMsg}</p>
          <button
            type="button"
            onClick={() => setMode("open")}
            className="mt-3 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-600 hover:border-brand hover:text-brand"
          >
            글 더 쓰기
          </button>
          <button
            type="button"
            onClick={close}
            className="ml-2 mt-3 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-500 hover:border-slate-400"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
