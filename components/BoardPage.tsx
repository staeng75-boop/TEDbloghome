import PostCard from "@/components/PostCard";
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
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center text-slate-500">
            아직 등록된 글이 없습니다. 곧 첫 글이 올라옵니다.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
