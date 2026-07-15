import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// 글쓰기와 동일한 비밀번호로 보호되는 삭제 API.
// 글 본문에 첨부파일(Storage 공개 URL)이 있으면 함께 삭제한다.
const WRITE_HASH =
  "b82b5670b2bccf9f586e2243a5355f3c5d101a6a00ae8286c63df0e8937b91c4";

export async function POST(req: Request) {
  let body: { password?: string; slug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { password, slug } = body;
  if (
    !password ||
    createHash("sha256").update(password).digest("hex") !== WRITE_HASH
  ) {
    return NextResponse.json(
      { error: "비밀번호가 일치하지 않습니다." },
      { status: 401 }
    );
  }
  if (!slug?.trim()) {
    return NextResponse.json({ error: "대상이 없습니다." }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const { data: row, error: findError } = await supabase
    .from("entries")
    .select("content")
    .eq("slug", slug)
    .maybeSingle();
  if (findError || !row) {
    return NextResponse.json(
      { error: "글을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  // 본문 속 첨부파일 경로 추출 후 스토리지에서 삭제
  const filePaths = [
    ...row.content.matchAll(
      /\/storage\/v1\/object\/public\/files\/([^)?\s"]+)/g
    ),
  ].map((m) => decodeURIComponent(m[1]));
  if (filePaths.length > 0) {
    await supabase.storage.from("files").remove(filePaths);
  }

  const { error: deleteError } = await supabase
    .from("entries")
    .delete()
    .eq("slug", slug);
  if (deleteError) {
    console.error("Supabase delete failed:", deleteError.message);
    return NextResponse.json(
      { error: "삭제에 실패했습니다." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, message: "삭제되었습니다." });
}
