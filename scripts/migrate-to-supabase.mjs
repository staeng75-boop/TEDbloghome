// 기존 마크다운 콘텐츠(content/posts, content/resources)와 첨부파일을
// Supabase entries 테이블 + files 스토리지 버킷으로 이관하는 1회용 스크립트.
// 실행: node scripts/migrate-to-supabase.mjs
// (.env.local 의 SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 사용)

import { createClient } from "@supabase/supabase-js";
import matter from "gray-matter";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";

// .env.local 로드
const envPath = join(process.cwd(), ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 가 없습니다.");
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

// 1. files 버킷 생성 (공개)
const { error: bucketError } = await supabase.storage.createBucket("files", {
  public: true,
  fileSizeLimit: "4MB",
});
if (bucketError && !/already exists/i.test(bucketError.message)) {
  console.error("버킷 생성 실패:", bucketError.message);
  process.exit(1);
}
console.log("✓ files 버킷 준비 완료");

// 2. 첨부파일 업로드 (구 GitHub raw URL → Supabase 공개 URL 매핑 생성)
const urlMap = new Map();
const filesDir = join("content", "resources", "files");
if (existsSync(filesDir)) {
  for (const name of readdirSync(filesDir)) {
    const buf = readFileSync(join(filesDir, name));
    const { error } = await supabase.storage
      .from("files")
      .upload(name, buf, { upsert: true });
    if (error) {
      console.error(`✗ 파일 업로드 실패 (${name}):`, error.message);
      continue;
    }
    const { data: pub } = supabase.storage.from("files").getPublicUrl(name);
    const oldUrl = `https://raw.githubusercontent.com/staeng75-boop/TEDbloghome/main/content/resources/files/${name}`;
    urlMap.set(oldUrl, pub.publicUrl);
    // 한글 파일명이 퍼센트 인코딩된 형태로 본문에 있을 수도 있음
    urlMap.set(
      `https://raw.githubusercontent.com/staeng75-boop/TEDbloghome/main/content/resources/files/${encodeURIComponent(name)}`,
      pub.publicUrl
    );
    console.log(`✓ 파일 업로드: ${name}`);
  }
}

function rewriteUrls(text) {
  let out = text;
  for (const [oldUrl, newUrl] of urlMap) {
    out = out.split(oldUrl).join(newUrl);
  }
  return out;
}

// 3. 마크다운 글 이관
async function migrateDir(dir, type) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".md")) continue;
    const slug = name.replace(/\.md$/, "");
    const { data, content } = matter(readFileSync(join(dir, name), "utf-8"));
    const row = {
      type,
      slug,
      title: data.title ?? slug,
      category: data.category ?? (type === "post" ? "insight" : "etc"),
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      content: rewriteUrls(content.trim()),
    };
    const { error } = await supabase
      .from("entries")
      .upsert(row, { onConflict: "slug" });
    if (error) console.error(`✗ 글 이관 실패 (${slug}):`, error.message);
    else console.log(`✓ 글 이관: [${type}] ${row.title}`);
  }
}

await migrateDir(join("content", "posts"), "post");
await migrateDir(join("content", "resources"), "resource");

const { count } = await supabase
  .from("entries")
  .select("*", { count: "exact", head: true });
console.log(`\n완료 — entries 테이블에 총 ${count}건`);
