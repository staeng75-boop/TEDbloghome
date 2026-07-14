import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "소개" };

const EXPERTISE = [
  {
    area: "관리체계 인증",
    items: ["ISMS-P 인증 컨설팅", "CSAP 클라우드 보안인증", "ISO 27001 / 27701"],
  },
  {
    area: "평가·진단",
    items: [
      "주요정보통신기반시설 취약점 분석·평가",
      "전자금융기반시설 안전성 평가",
      "국가정보원 사이버보안 실태평가",
    ],
  },
  {
    area: "중점 영역",
    items: ["관리적 보안", "물리적 보안", "개인정보보호", "기술적 보안 일부"],
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-mist-100 to-white">
        <div className="container-content py-16 sm:py-20">
          <p className="eyebrow">About</p>
          <h1 className="mt-3 section-title">TED Security를 소개합니다</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            20년 이상 정보보호·개인정보보호 분야에서 공공기관을 중심으로
            컨설팅을 수행해 왔습니다. 인증 심사와 평가 현장에서 쌓은 경험을
            바탕으로, 문서만 갖추는 보안이 아니라{" "}
            <strong className="text-slate-900">
              실제로 운영되고 증명되는 관리체계
            </strong>
            를 만드는 것을 원칙으로 합니다.
          </p>
        </div>
      </section>

      <section className="container-content pb-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {EXPERTISE.map((e) => (
            <div
              key={e.area}
              className="rounded-2xl border border-slate-200 bg-white p-7"
            >
              <h2 className="border-l-2 border-gold pl-3 text-lg font-bold text-slate-900">
                {e.area}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {e.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-slate-600">
                    <svg
                      className="mt-1 h-4 w-4 shrink-0 text-brand"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container-content py-16">
        <div className="rounded-3xl bg-mist-50 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-slate-900">일하는 방식</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                진단
              </p>
              <p className="mt-2 leading-relaxed text-slate-600">
                현재 수준을 인증·평가 기준에 비추어 정확히 진단하고, 격차를
                우선순위와 함께 제시합니다.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                구축
              </p>
              <p className="mt-2 leading-relaxed text-slate-600">
                조직의 규모와 현실에 맞는 정책·지침·증적 체계를 함께
                만듭니다. 과한 문서 작업은 지양합니다.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                증명
              </p>
              <p className="mt-2 leading-relaxed text-slate-600">
                심사·평가 현장에서 통하는 답변과 증적으로 결과를
                만들어냅니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-content pb-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          프로젝트를 준비 중이신가요?
        </h2>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-brand px-8 py-3.5 font-semibold text-white transition-colors hover:bg-brand-deep"
        >
          상담 문의하기
        </Link>
      </section>
    </div>
  );
}
