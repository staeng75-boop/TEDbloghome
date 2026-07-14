import Link from "next/link";
import { getAllPosts, CATEGORIES } from "@/lib/posts";
import NodeNetwork from "@/components/NodeNetwork";

const TOPICS = [
  {
    title: "인증·평가",
    desc: "ISMS-P, CSAP, ISO 27001/27701 인증 준비와 심사 대응 이야기",
    href: "/certifications",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    ),
  },
  {
    title: "기반시설·전자금융",
    desc: "주요정보통신기반시설·전자금융기반시설 취약점 분석·평가 노하우",
    href: "/infrastructure",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
      />
    ),
  },
  {
    title: "보안 인사이트",
    desc: "제도 변화, 보안 동향, 현장에서 느끼는 이슈에 대한 생각",
    href: "/insights",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    ),
  },
  {
    title: "자료실",
    desc: "인증별로 정리한 양식·체크리스트·가이드 보관함",
    href: "/resources",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    ),
  },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1b2740] via-brand-navy to-[#173a54]">
        <NodeNetwork />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/20 blur-[64px]"
        />
        <div className="container-content relative py-24 sm:py-32">
          <p className="eyebrow">TED Blog — Information Security</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-5xl sm:leading-[1.15]">
            현장에서 쓴
            <br />
            <span className="bg-gradient-to-r from-[#6db9e8] to-[#a8d4f0] bg-clip-text text-transparent">
              정보보호 이야기
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            약 30년차 정보보호 컨설턴트가 인증 심사와 평가 현장에서 얻은
            지식과 경험을 기록합니다.
            <br />
            ISMS-P부터 기반시설·전자금융 평가까지, 실무에 바로 쓰이는
            이야기를 담습니다.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/insights"
              className="rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-deep"
            >
              최신 글 읽기
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:border-white/60"
            >
              블로그 주인 소개
            </Link>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { value: "약 30년", label: "정보보호 분야 경력" },
              { value: "9종", label: "보유 자격 (CISSP·ISO 등)" },
              { value: "40+", label: "수행 프로젝트" },
            ].map((s) => (
              <div key={s.label} className="border-l-2 border-gold/70 pl-4">
                <dt className="text-sm text-slate-400">{s.label}</dt>
                <dd className="mt-1 text-2xl font-bold text-white">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Topics */}
      <section className="container-content py-20 sm:py-24">
        <p className="eyebrow">Boards</p>
        <h2 className="mt-3 section-title">게시판</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
          주제별로 글을 나누어 담습니다. 관심 있는 게시판부터
          둘러보세요.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist-100 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  {t.icon}
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {t.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {t.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent posts — blog list style */}
      <section className="bg-mist-50">
        <div className="container-content py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Recent</p>
              <h2 className="mt-3 section-title">최신 글</h2>
            </div>
            <Link
              href="/insights"
              className="font-semibold text-brand hover:text-brand-deep"
            >
              전체 글 보기 →
            </Link>
          </div>
          <ul className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col gap-1.5 px-6 py-5 transition-colors hover:bg-mist-50 sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="w-32 shrink-0 text-xs font-semibold text-brand-deep">
                    [{CATEGORIES[post.category] ?? post.categoryLabel}]
                  </span>
                  <span className="flex-1 font-medium text-slate-800 group-hover:text-brand">
                    {post.title}
                  </span>
                  <time className="shrink-0 text-sm text-slate-400">
                    {post.date}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact strip */}
      <section className="bg-brand-navy">
        <div className="container-content flex flex-col items-center py-16 text-center sm:py-20">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            글을 읽다 궁금한 점이 생기셨나요?
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-slate-300">
            인증·평가 준비에 관한 질문이나 다뤄줬으면 하는 주제가 있다면
            편하게 남겨주세요.
          </p>
          <Link
            href="/contact"
            className="mt-8 rounded-full border border-white/30 bg-white/5 px-7 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
          >
            문의 남기기
          </Link>
        </div>
      </section>
    </div>
  );
}
