import matter from "gray-matter";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { listMarkdownFiles, getMarkdownFile } from "@/lib/github";

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

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await listMarkdownFiles("content/posts");
  return files
    .map((file) => {
      const slug = file.name.replace(/\.md$/, "");
      const { data } = matter(file.text);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        category: data.category ?? "insight",
        categoryLabel: CATEGORIES[data.category] ?? "보안 인사이트",
        excerpt: data.excerpt ?? "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostsByCategory(
  category: string
): Promise<PostMeta[]> {
  return (await getAllPosts()).filter((p) => p.category === category);
}

export async function getPost(slug: string): Promise<Post | null> {
  const text = await getMarkdownFile("content/posts", slug);
  if (text === null) return null;
  const { data, content } = matter(text);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    category: data.category ?? "insight",
    categoryLabel: CATEGORIES[data.category] ?? "보안 인사이트",
    excerpt: data.excerpt ?? "",
    html: DOMPurify.sanitize(marked.parse(content) as string),
  };
}
