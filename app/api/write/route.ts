import { createHash } from "crypto";
import { NextResponse } from "next/server";

// 글쓰기 비밀번호의 SHA-256 해시 (ResourceVault.tsx의 WRITE_HASH와 동일)
const WRITE_HASH =
  "b82b5670b2bccf9f586e2243a5355f3c5d101a6a00ae8286c63df0e8937b91c4";

const REPO = "staeng75-boop/TEDbloghome";

const POST_CATEGORIES = new Set(["certification", "infrastructure", "insight"]);
const RESOURCE_CATEGORIES = new Set([
  "ismsp",
  "csap",
  "iso",
  "infra",
  "efin",
  "etc",
]);

function kstDate(): string {
  return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

function safeTitleFor(title: string): string {
  return title.trim().replace(/"/g, "'");
}

export async function POST(req: Request) {
  let body: {
    password?: string;
    type?: string;
    title?: string;
    category?: string;
    content?: string;
    imageBase64?: string;
    imageName?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { password, type, title, category, content, imageBase64, imageName } =
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

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "서버에 저장 토큰이 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const date = kstDate();
  const stamp = Date.now().toString(36);
  const dir = isPost ? "content/posts" : "content/resources";
  const slug = `${isPost ? "p" : "r"}-${date}-${stamp}`;

  let bodyContent = content.trim();

  if (imageBase64 && imageName) {
    const ext = imageName.split(".").pop()?.toLowerCase() ?? "";
    const allowedExt = new Set(["jpg", "jpeg", "png", "gif", "webp"]);
    if (!allowedExt.has(ext)) {
      return NextResponse.json(
        { error: "지원하지 않는 이미지 형식입니다." },
        { status: 400 }
      );
    }
    // base64 문자열 길이로 대략적 용량 검사 (4MB 제한)
    if (imageBase64.length > 5_600_000) {
      return NextResponse.json(
        { error: "이미지 용량은 4MB 이하만 가능합니다." },
        { status: 400 }
      );
    }

    const imagePath = `${dir}/images/${slug}.${ext}`;
    const imgRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${imagePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `이미지 첨부: ${safeTitleFor(title)}`,
          content: imageBase64,
        }),
      }
    );
    if (!imgRes.ok) {
      const detail = await imgRes.text();
      console.error("GitHub image commit failed:", imgRes.status, detail.slice(0, 300));
      return NextResponse.json(
        { error: "이미지 저장에 실패했습니다." },
        { status: 502 }
      );
    }
    const imageUrl = `https://raw.githubusercontent.com/${REPO}/main/${imagePath}`;
    bodyContent = `![](${imageUrl})\n\n${bodyContent}`;
  }

  const safeTitle = safeTitleFor(title);
  const excerpt = bodyContent
    .replace(/[#>*`\[\]|-]/g, " ")
    .replace(/\s+/g, " ")
    .slice(0, 100);

  const md = isPost
    ? `---\ntitle: "${safeTitle}"\ndate: "${date}"\ncategory: "${category}"\nexcerpt: "${excerpt}"\n---\n\n${bodyContent}\n`
    : `---\ntitle: "${safeTitle}"\ndate: "${date}"\ncategory: "${category}"\n---\n\n${bodyContent}\n`;

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${dir}/${slug}.md`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `게시: ${safeTitle}`,
        content: Buffer.from(md, "utf-8").toString("base64"),
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    console.error("GitHub commit failed:", res.status, detail.slice(0, 300));
    return NextResponse.json(
      { error: "저장에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 }
    );
  }

  const hook = process.env.DEPLOY_HOOK_URL;
  if (hook) {
    fetch(hook, { method: "POST" }).catch(() => {});
  }

  return NextResponse.json({
    ok: true,
    message: "저장되었습니다. 1~2분 후 사이트에 반영됩니다.",
  });
}
