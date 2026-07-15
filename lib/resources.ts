import { marked } from "marked";
import { sanitize } from "@/lib/sanitize";
import { supabaseAdmin, type EntryRow } from "@/lib/supabase";

export const RESOURCE_CATEGORIES: Record<string, string> = {
  ismsp: "ISMS-P",
  csap: "CSAP",
  iso: "ISO 27001/27701",
  infra: "주요정보통신기반시설",
  efin: "전자금융",
  etc: "기타",
};

export type ResourceItem = {
  slug: string;
  title: string;
  date: string;
  category: string;
  html: string;
};

export async function getAllResources(): Promise<ResourceItem[]> {
  const { data, error } = await supabaseAdmin()
    .from("entries")
    .select("*")
    .eq("type", "resource")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as EntryRow[]).map((row) => ({
    slug: row.slug,
    title: row.title,
    date: row.date,
    category: RESOURCE_CATEGORIES[row.category] ? row.category : "etc",
    html: sanitize(marked.parse(row.content) as string),
  }));
}
