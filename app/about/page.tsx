import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "소개" };

const CERTS = [
  "CISSP",
  "ISO 27001",
  "ISO 27701",
  "ISO 27017",
  "ISO 27018",
  "ISO 42001",
  "CPPG",
  "CCNA",
  "정보처리기사",
];

const CAREER_HIGHLIGHTS = [
  {
    area: "관리체계 인증 (ISMS-P · ISMS · ISO)",
    items: [
      "건강보험심사평가원 정보보안 컨설팅 (ISMS/ISO27001, 2020~2025 다년간 PM)",
      "경동도시가스 ISMS-P 인증·내부감사·외부점검 (2020~2024 PM)",
      "현대HCN·아시아나IDT·충북대학교병원 등 ISMS 인증 컨설팅",
    ],
  },
  {
    area: "클라우드 · CSAP",
    items: [
      "뉴빌리티 클라우드서비스 보안인증(SaaS) 관리체계 수립 (PM)",
      "다우기술 선불전자지급수단 등록 관련 망분리 컨설팅 (PL)",
    ],
  },
  {
    area: "기반시설 · 전자금융 평가",
    items: [
      "경기도 파주시·공항철도 주요정보통신기반시설 취약점 분석·평가 (PM)",
      "라이나생명·에이스아메리칸화재해상보험·OSB저축은행·JB우리캐피탈 전자금융기반시설 평가 (PM)",
      "국가보훈처 정보보호 관리체계 고도화, 대한체육회 개인정보보호 강화 컨설팅",
    ],
  },
];

const CLIENTS: { name: string; sector: string; logo?: string }[] = [
  { name: "건강보험심사평가원", sector: "공공", logo: "/clients/hira-symbol.png" },
  { name: "국가보훈처", sector: "공공" },
  { name: "경기도 파주시", sector: "공공" },
  { name: "대한체육회", sector: "공공", logo: "/clients/sports.png" },
  { name: "예금보험공사", sector: "공공" },
  { name: "국제방송교류재단", sector: "공공", logo: "/clients/arirang.png" },
  { name: "한국의료기기안전정보원", sector: "공공" },
  { name: "공항철도", sector: "공공" },
  { name: "주식회사 SR", sector: "공공", logo: "/clients/srail.png" },
  { name: "경동도시가스", sector: "에너지" },
  { name: "라이나생명보험", sector: "금융" },
  { name: "에이스아메리칸화재해상보험", sector: "금융" },
  { name: "OSB저축은행", sector: "금융" },
  { name: "JB우리캐피탈", sector: "금융" },
  { name: "교통은행", sector: "금융" },
  { name: "다우기술", sector: "IT", logo: "/clients/daou.png" },
  { name: "현대HCN", sector: "IT", logo: "/clients/hcn.png" },
  { name: "아시아나IDT", sector: "IT" },
  { name: "뉴빌리티", sector: "IT", logo: "/clients/neubility.png" },
  { name: "전남대학교병원", sector: "의료" },
  { name: "화순전남대병원", sector: "의료" },
  { name: "충북대학교병원", sector: "의료", logo: "/clients/cbnuh.png" },
  { name: "대구동산병원", sector: "의료" },
  { name: "초록우산어린이재단", sector: "비영리" },
];

const SECTOR_COLOR: Record<string, string> = {
  공공: "bg-brand/10 text-brand-deep",
  금융: "bg-gold/15 text-[#8a6d3b]",
  의료: "bg-emerald-50 text-emerald-700",
  IT: "bg-violet-50 text-violet-700",
  에너지: "bg-orange-50 text-orange-700",
  비영리: "bg-rose-50 text-rose-700",
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-mist-100 to-white">
        <div className="container-content py-16 sm:py-20">
          <p className="eyebrow">About</p>
          <h1 className="mt-3 section-title">블로그 주인을 소개합니다</h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-lg leading-relaxed text-slate-600">
                안녕하세요, <strong className="text-slate-900">TED</strong>
                입니다. 네트워크·보안시스템 운영으로 시작해{" "}
                <strong className="text-slate-900">약 30년간</strong> 정보보호
                분야에서 일해 온 수석 컨설턴트입니다. 공공기관을
                중심으로 ISMS-P·CSAP·ISO 인증과 기반시설·전자금융 평가를
                수행하며, 이 블로그에 현장에서 얻은 지식과 경험을
                기록합니다.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                문서만 갖추는 보안이 아니라{" "}
                <strong className="text-slate-900">
                  실제로 운영되고 증명되는 관리체계
                </strong>
                를 만드는 것이 일하는 원칙입니다.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-semibold uppercase tracking-wider text-gold">
                    경력
                  </dt>
                  <dd className="mt-1 text-slate-700">정보보호 분야 약 30년</dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-wider text-gold">
                    학력
                  </dt>
                  <dd className="mt-1 text-slate-700">
                    단국대학교 정보통신대학원 석사
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold uppercase tracking-wider text-gold">
                    자격
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {CERTS.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-mist-100 px-2.5 py-1 text-xs font-semibold text-brand-deep"
                      >
                        {c}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="container-content pb-4">
        <p className="eyebrow">Experience</p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          주요 수행 이력
        </h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {CAREER_HIGHLIGHTS.map((e) => (
            <div
              key={e.area}
              className="rounded-2xl border border-slate-200 bg-white p-7"
            >
              <h3 className="border-l-2 border-gold pl-3 text-base font-bold text-slate-900">
                {e.area}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {e.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-slate-600"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
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
        <p className="eyebrow">Clients</p>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          함께한 고객사
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">
          공공·금융·의료·에너지·IT 분야에서 인증과 평가를 함께
          수행했습니다.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CLIENTS.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-colors hover:border-brand/40"
            >
              {c.logo ? (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.logo}
                    alt={`${c.name} 로고`}
                    className="h-full w-full object-contain p-1"
                  />
                </span>
              ) : (
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-base font-bold ${
                    SECTOR_COLOR[c.sector] ?? "bg-mist-100 text-brand-deep"
                  }`}
                >
                  {c.name.charAt(0)}
                </span>
              )}
              <div className="min-w-0 text-left">
                <p className="text-sm font-semibold leading-snug text-slate-800">
                  {c.name}
                </p>
                <p className="text-xs text-slate-400">{c.sector}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-content pb-20">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">
            궁금한 점이나 다뤄줬으면 하는 주제가 있다면 편하게
            남겨주세요.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-brand hover:text-brand"
          >
            문의 남기기
          </Link>
        </div>
      </section>
    </div>
  );
}
