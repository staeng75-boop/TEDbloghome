import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import NodeNetwork from "@/components/NodeNetwork";

const SERVICES = [
  {
    title: "ISMS-P 인증",
    desc: "정보보호 및 개인정보보호 관리체계 구축부터 인증 취득·사후관리까지 전 과정을 함께합니다.",
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
    title: "CSAP 클라우드 보안인증",
    desc: "공공기관 클라우드 서비스 도입에 필요한 CSAP 평가 대응 체계를 설계하고 준비합니다.",
    href: "/certifications",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
      />
    ),
  },
  {
    title: "주요정보통신기반시설",
    desc: "기반시설 취약점 분석·평가와 보호대책 수립으로 국가 핵심 인프라를 지킵니다.",
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
    title: "전자금융·ISO 인증",
    desc: "전자금융기반시설 안전성 평가, ISO 27001/27701 등 국제 표준 인증을 지원합니다.",
    href: "/infrastructure",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

const STATS = [
  { value: "20년+", label: "정보보호 컨설팅 경력" },
  { value: "공공기관", label: "중심의 수행 경험" },
  { value: "원스톱", label: "구축부터 인증까지" },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

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
          <p className="eyebrow">Information Security Consulting</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-5xl sm:leading-[1.15]">
            증명할 수 있는 보안,
            <br />
            <span className="bg-gradient-to-r from-[#6db9e8] to-[#a8d4f0] bg-clip-text text-transparent">
              신뢰할 수 있는 관리체계
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            ISMS-P·CSAP·ISO 인증부터 기반시설·전자금융 평가까지.
            공공기관이 요구하는 수준의 정보보호 체계를 처음부터 끝까지
            함께 만듭니다.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-deep"
            >
              상담 문의하기
            </Link>
            <Link
              href="/insights"
              className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:border-white/60"
            >
              보안 인사이트 보기
            </Link>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="border-l-2 border-gold/70 pl-4"
              >
                <dt className="text-sm text-slate-400">{s.label}</dt>
                <dd className="mt-1 text-2xl font-bold text-white">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section className="container-content py-20 sm:py-24">
        <p className="eyebrow">Services</p>
        <h2 className="mt-3 section-title">전문 컨설팅 분야</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
          관리적·물리적 보안을 중심으로, 인증 심사와 평가 현장에서 쌓은
          경험을 바탕으로 실무에 바로 적용되는 컨설팅을 제공합니다.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
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
                  {s.icon}
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {s.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-slate-100 bg-white">
        <div className="container-content py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            <div>
              <p className="eyebrow">Process</p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                일하는 방식
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                문서만 갖추는 보안이 아니라, 실제로 운영되고 증명되는
                관리체계를 만듭니다.
              </p>
            </div>
            {[
              {
                step: "진단",
                desc: "현재 수준을 인증·평가 기준에 비추어 정확히 진단하고, 격차를 우선순위와 함께 제시합니다.",
              },
              {
                step: "구축",
                desc: "조직의 규모와 현실에 맞는 정책·지침·증적 체계를 함께 만듭니다. 과한 문서 작업은 지양합니다.",
              },
              {
                step: "증명",
                desc: "심사·평가 현장에서 통하는 답변과 증적으로 결과를 만들어냅니다.",
              },
            ].map((p) => (
              <div key={p.step} className="border-t-2 border-gold/60 pt-5">
                <h3 className="text-lg font-bold text-brand-navy">{p.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent posts */}
      <section className="bg-mist-50">
        <div className="container-content py-20 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Insights</p>
              <h2 className="mt-3 section-title">최신 보안 인사이트</h2>
            </div>
            <Link
              href="/insights"
              className="font-semibold text-brand hover:text-brand-deep"
            >
              전체 글 보기 →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy">
        <div className="container-content flex flex-col items-center py-20 text-center sm:py-24">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            인증 준비, 어디서부터 시작할지 막막하신가요?
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-slate-300">
            현재 상황을 알려주시면 필요한 범위와 일정, 준비 방법을
            구체적으로 안내해 드립니다.
          </p>
          <Link
            href="/contact"
            className="mt-8 rounded-full bg-gold px-8 py-3.5 font-semibold text-brand-navy transition-colors hover:bg-[#d4bc90]"
          >
            무료 상담 문의
          </Link>
        </div>
      </section>
    </div>
  );
}
