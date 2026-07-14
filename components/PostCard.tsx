import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
    >
      <div className="flex items-center gap-3 text-xs">
        <span className="rounded-full bg-mist-100 px-2.5 py-1 font-semibold text-brand-deep">
          {post.categoryLabel}
        </span>
        <time className="text-slate-400">{post.date}</time>
      </div>
      <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-brand">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
        {post.excerpt}
      </p>
      <span className="mt-4 text-sm font-semibold text-brand">
        자세히 보기 →
      </span>
    </Link>
  );
}
