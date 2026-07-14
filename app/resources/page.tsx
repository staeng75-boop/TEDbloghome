import type { Metadata } from "next";

export const metadata: Metadata = { title: "자료실" };

const RESOURCES = [
  {
    title: "ISMS-P 인증기준 안내서",
    desc: "한국인터넷진흥원(KISA)이 발간한 ISMS-P 인증기준 상세 해설.",
    source: "KISA",
    href: "https://isms.kisa.or.kr/main/ispims/notice/",
  },
  {
    title: "클라우드 보안인증제(CSAP) 안내",
    desc: "클라우드 서비스 보안인증제 평가 기준 및 신청 절차 안내.",
    source: "KISA",
    href: "https://isms.kisa.or.kr/main/csap/intro/",
  },
  {
    title: "주요정보통신기반시설 기술적 취약점 분석·평가 가이드",
    desc: "기반시설 취약점 분석·평가를 위한 상세 기술 가이드.",
    source: "과기정통부·KISA",
    href: "https://www.kisa.or.kr/2060204",
  },
  {
    title: "개인정보 보호법령 및 고시",
    desc: "개인정보보호위원회 소관 법령·고시·가이드라인 모음.",
    source: "개인정보보호위원회",
    href: "https://www.pipc.go.kr/np/cop/bbs/selectBoardList.do?bbsId=BS217&mCode=D010030000",
  },
  {
    title: "전자금융감독규정",
    desc: "전자금융기반시설 안전성 평가의 근거가 되는 감독규정.",
    source: "금융위원회",
    href: "https://www.law.go.kr/행정규칙/전자금융감독규정",
  },
  {
    title: "ISO/IEC 27001 표준 개요",
    desc: "정보보안 경영시스템(ISMS) 국제 표준 소개.",
    source: "ISO",
    href: "https://www.iso.org/standard/27001",
  },
];

export default function ResourcesPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-mist-100 to-white">
        <div className="container-content py-16 sm:py-20">
          <p className="eyebrow">Resources</p>
          <h1 className="mt-3 section-title">자료실</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            인증 준비와 평가 대응에 자주 활용하는 공식 기준·가이드
            문서를 모았습니다. 각 항목은 발행 기관의 원문으로 연결됩니다.
          </p>
        </div>
      </section>
      <section className="container-content pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <a
              key={r.title}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                {r.source}
              </span>
              <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900 group-hover:text-brand">
                {r.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                {r.desc}
              </p>
              <span className="mt-4 text-sm font-semibold text-brand">
                원문 보기 ↗
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
