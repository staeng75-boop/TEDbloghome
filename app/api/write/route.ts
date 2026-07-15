import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// 글쓰기 비밀번호의 SHA-256 해시 (HiddenWrite.tsx의 인증과 짝을 이룬다)
const WRITE_HASH =
  "b82b5670b2bccf9f586e2243a5355f3c5d101a6a00ae8286c63df0e8937b91c4";

const POST_CATEGORIES = new Set(["certification", "infrastructure", "insight"]);
const RESOURCE_CATEGORIES = new Set([
  "ismsp",
  "csap",
  "iso",
  "infra",
  "efin",
  "etc",
]);

const IMAGE_EXT = new Set(["jpg", "jpeg", "png", "gif", "webp"]);
const DOC_EXT = new Set([
  "pdf",
  "hwp",
  "hwpx",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "zip",
  "txt",
]);

const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  pdf: "application/pdf",
  zip: "application/zip",
  txt: "text/plain",
};

function kstDate(): string {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

export async function POST(req: Request) {
  let body: {
    password?: string;
    type?: string;
    title?: string;
    category?: string;
    content?: string;
    fileBase64?: string;
    fileName?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { password, type, title, category, content, fileBase64, fileName } =
    body;
  if (
    !password ||
    createHash("sha256").update(password).digest("hex") !== WRITE_HASH
  ) {
    return NextResponse.json(
      { error: "비밀번호가 일치하지 않습니다." },
      { status: 401 }
    );
  }
  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "제목과 내용을 입력해주세요." },
      { status: 400 }
    );
  }

  const isPost = type === "post";
  const validCats = isPost ? POST_CATEGORIES : RESOURCE_CATEGORIES;
  if (!category || !validCats.has(category)) {
    return NextResponse.json({ error: "잘못된 분류입니다." }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const date = kstDate();
  const stamp = Date.now().toString(36);
  const slug = `${isPost ? "p" : "r"}-${date}-${stamp}`;

  let bodyContent = content.trim();

  if (fileBase64 && fileName) {
    const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
    if (!IMAGE_EXT.has(ext) && !DOC_EXT.has(ext)) {
      return NextResponse.json(
        { error: "지원하지 않는 파일 형식입니다." },
        { status: 400 }
      );
    }
    // base64 문자열 길이로 대략적 용량 검사 (4MB 제한)
    if (fileBase64.length > 5_600_000) {
      return NextResponse.json(
        { error: "파일 용량은 4MB 이하만 가능합니다." },
        { status: 400 }
      );
    }

    const safeFileName = fileName.replace(/[^\w.\-가-힣]/g, "_");
    const filePath = `${slug}-${safeFileName}`;
    const { error: uploadError } = await supabase.storage
      .from("files")
      .upload(filePath, Buffer.from(fileBase64, "base64"), {
        contentType: MIME_BY_EXT[ext] ?? "application/octet-stream",
        upsert: false,
      });
    if (uploadError) {
      console.error("Supabase upload failed:", uploadError.message);
      return NextResponse.json(
        { error: "파일 저장에 실패했습니다." },
        { status: 502 }
      );
    }
    const { data: pub } = supabase.storage.from("files").getPublicUrl(filePath);
    const fileUrl = pub.publicUrl;
    bodyContent = IMAGE_EXT.has(ext)
      ? `![](${fileUrl})\n\n${bodyContent}`
      : `📎 [${fileName} 다운로드](${fileUrl})\n\n${bodyContent}`;
  }

  const excerpt = bodyContent
    .replace(/[#>*`\[\]|-]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 100);

  const { error: insertError } = await supabase.from("entries").insert({
    type: isPost ? "post" : "resource",
    slug,
    title: title.trim(),
    category,
    date,
    excerpt: isPost ? excerpt : "",
    content: bodyContent,
  });

  if (insertError) {
    console.error("Supabase insert failed:", insertError.message);
    return NextResponse.json(
      { error: "저장에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "저장되었습니다. 사이트에 바로 반영됩니다.",
  });
}
