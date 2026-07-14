import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

const resourcesDir = path.join(process.cwd(), "content", "resources");

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

export function getAllResources(): ResourceItem[] {
  if (!fs.existsSync(resourcesDir)) return [];
  return fs
    .readdirSync(resourcesDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(resourcesDir, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        category: RESOURCE_CATEGORIES[data.category] ? data.category : "etc",
        html: DOMPurify.sanitize(marked.parse(content) as string),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
