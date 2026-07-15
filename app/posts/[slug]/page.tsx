import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(decodeURIComponent(slug));
  return { title: post?.title ?? "글" };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(decodeURIComponent(slug));
  if (!post) notFound();

  const boardHref =
    post.category === "certification"
      ? "/certifications"
      : post.category === "infrastructure"
        ? "/infrastructure"
        : "/insights";

  return (
    <article>
      <header className="bg-gradient-to-b from-mist-100 to-white">
        <div className="container-content py-16 sm:py-20">
          <Link
            href={boardHref}
            className="text-sm font-semibold text-brand hover:text-brand-deep"
          >
            ← {post.categoryLabel} 목록으로
          </Link>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-snug text-slate-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-mist-100 px-3 py-1 font-semibold text-brand-deep">
              {post.categoryLabel}
            </span>
            <time>{post.date}</time>
          </div>
        </div>
      </header>
      <div className="container-content pb-20">
        <div
          className="prose-post max-w-3xl"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="mt-14 max-w-3xl border-t border-slate-200 pt-8">
          <Link
            href={boardHref}
            className="font-semibold text-brand hover:text-brand-deep"
          >
            ← {post.categoryLabel} 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </article>
  );
}
