import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { supabaseAdmin, type EntryRow } from "@/lib/supabase";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  categoryLabel: string;
  excerpt: string;
};

export type Post = PostMeta & { html: string };

export const CATEGORIES: Record<string, string> = {
  certification: "인증·평가",
  infrastructure: "기반시설·전자금융",
  insight: "보안 인사이트",
};

function toMeta(row: EntryRow): PostMeta {
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    category: row.category,
    categoryLabel: CATEGORIES[row.category] ?? "보안 인사이트",
    excerpt: row.excerpt ?? "",
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const { data, error } = await supabaseAdmin()
    .from("entries")
    .select("*")
    .eq("type", "post")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as EntryRow[]).map(toMeta);
}

export async function getPostsByCategory(
  category: string
): Promise<PostMeta[]> {
  const { data, error } = await supabaseAdmin()
    .from("entries")
    .select("*")
    .eq("type", "post")
    .eq("category", category)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as EntryRow[]).map(toMeta);
}

export async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabaseAdmin()
    .from("entries")
    .select("*")
    .eq("type", "post")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  const row = data as EntryRow;
  return {
    ...toMeta(row),
    html: DOMPurify.sanitize(marked.parse(row.content) as string),
  };
}
