import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function BoardPage({
  eyebrow,
  title,
  description,
  posts,
}: {
  eyebrow: string;
  title: string;
  description: string;
  posts: PostMeta[];
}) {
  return (
    <div>
      <section className="bg-gradient-to-b from-mist-100 to-white">
        <div className="container-content py-16 sm:py-20">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 section-title">{title}</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            {description}
          </p>
        </div>
      </section>
      <section className="container-content pb-20">
        <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3">
          <p className="text-sm font-semibold text-slate-700">
            전체 글 <span className="text-brand">{posts.length}</span>
          </p>
        </div>
        {posts.length === 0 ? (
          <div className="rounded-b-2xl border border-dashed border-slate-300 py-20 text-center text-slate-500">
            아직 등록된 글이 없습니다. 곧 첫 글이 올라옵니다.
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col gap-1 px-2 py-4 transition-colors hover:bg-mist-50 sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="hidden w-10 shrink-0 text-center text-sm text-slate-400 sm:block">
                    {posts.length - i}
                  </span>
                  <span className="flex-1 font-medium text-slate-800 group-hover:text-brand group-hover:underline group-hover:underline-offset-2">
                    {post.title}
                  </span>
                  <span className="line-clamp-1 max-w-md text-sm text-slate-400 sm:hidden">
                    {post.excerpt}
                  </span>
                  <time className="shrink-0 text-sm text-slate-400">
                    {post.date}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
