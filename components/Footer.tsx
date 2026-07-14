import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-300">
      <div className="container-content grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold text-white">
            TED <span className="font-light text-mist-200">Security</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            정보보호·개인정보보호 전문 컨설팅.
            <br />
            공공기관과 함께 신뢰할 수 있는
            <br />
            관리체계를 만듭니다.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            게시판
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/certifications" className="hover:text-white">인증·평가</Link></li>
            <li><Link href="/infrastructure" className="hover:text-white">기반시설·전자금융</Link></li>
            <li><Link href="/insights" className="hover:text-white">보안 인사이트</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            바로가기
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/resources" className="hover:text-white">자료실</Link></li>
            <li><Link href="/about" className="hover:text-white">소개</Link></li>
            <li><Link href="/contact" className="hover:text-white">상담 문의</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gold">
            전문 분야
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>ISMS-P · CSAP</li>
            <li>ISO 27001 / 27701</li>
            <li>주요정보통신기반시설 취약점 분석·평가</li>
            <li>전자금융기반시설 안전성 평가</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-content flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} TED Security. All rights reserved.</p>
          <p>정보보호 컨설팅 · 개인정보보호 컨설팅</p>
        </div>
      </div>
    </footer>
  );
}
