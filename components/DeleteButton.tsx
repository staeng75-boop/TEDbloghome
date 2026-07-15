"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 운영자 인증(HiddenWrite 비밀번호 확인) 후에만 목록에 나타나는 삭제 버튼.
export default function DeleteButton({
  slug,
  title,
  password,
}: {
  slug: string;
  title: string;
  password: string;
}) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  const remove = async () => {
    if (!window.confirm(`"${title}" 글을 삭제할까요?\n첨부파일도 함께 삭제됩니다.`))
      return;
    setBusy(true);
    try {
      const res = await fetch("/api/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, slug }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        window.alert(data.error ?? "삭제에 실패했습니다.");
      }
    } catch {
      window.alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={remove}
      disabled={busy}
      className="shrink-0 rounded-md border border-red-200 px-2 py-1 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
      aria-label={`${title} 삭제`}
    >
      {busy ? "삭제 중" : "삭제"}
    </button>
  );
}
