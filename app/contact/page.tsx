import type { Metadata } from "next";

export const metadata: Metadata = { title: "문의" };

const TOPICS = [
  "ISMS-P 인증 준비",
  "CSAP 클라우드 보안인증",
  "ISO 27001 / 27701",
  "주요정보통신기반시설 취약점 분석·평가",
  "전자금융기반시설 안전성 평가",
  "개인정보보호 체계 진단",
  "블로그 주제 제안",
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <div>
      <section className="bg-gradient-to-b from-mist-100 to-white">
        <div className="container-content py-16 sm:py-20">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 section-title">문의</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            인증·평가 준비에 관한 질문, 다뤄줬으면 하는 주제, 상담 요청
            모두 환영합니다. 작성하신 내용은 운영자 이메일로 바로
            전달됩니다.
          </p>
        </div>
      </section>

      <section className="container-content grid gap-10 pb-20 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {sent === "1" ? (
            <div className="rounded-2xl border border-brand/30 bg-mist-50 p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h2 className="mt-5 text-xl font-bold text-slate-900">
                문의가 접수되었습니다
              </h2>
              <p className="mt-2 text-slate-600">
                개인적인 블로그이므로 답변이 다소 늦을 수 있는 점 양해
                부탁드립니다.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-block font-semibold text-brand hover:text-brand-deep"
              >
                새 문의 작성 →
              </a>
            </div>
          ) : (
            <form
              action="https://formsubmit.co/staeng75@gmail.com"
              method="POST"
              className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9"
            >
              <input
                type="hidden"
                name="_subject"
                value="[TED BLOG Security] 새 문의가 도착했습니다"
              />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_next"
                value="https://tedbloghome.vercel.app/contact?sent=1"
              />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    성함 / 소속 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="성함소속"
                    type="text"
                    required
                    placeholder="홍길동 / OO기관"
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-900"
                  >
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="reply@example.com"
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="topic"
                  className="block text-sm font-semibold text-slate-900"
                >
                  문의 분야
                </label>
                <select
                  id="topic"
                  name="문의분야"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                >
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                  <option>기타</option>
                </select>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-900"
                >
                  문의 내용 <span className="text-red-500">*</span>
                </label>
                <p className="mt-1 text-sm text-slate-500">
                  상담 문의라면 기관 규모와 준비 일정을 함께 적어주시면
                  더 정확한 안내가 가능합니다.
                </p>
                <textarea
                  id="message"
                  name="문의내용"
                  required
                  rows={6}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </div>
              <button
                type="submit"
                className="mt-7 w-full rounded-full bg-brand py-3.5 font-semibold text-white transition-colors hover:bg-brand-deep sm:w-auto sm:px-10"
              >
                문의 보내기
              </button>
            </form>
          )}
        </div>

        <aside className="lg:col-span-2">
          <div className="rounded-2xl bg-brand-navy p-7 text-slate-300 sm:p-9">
            <h2 className="text-lg font-bold text-white">직접 연락하기</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              양식이 불편하시면 이메일로 바로 문의하셔도 됩니다.
            </p>
            <a
              href="mailto:staeng75@gmail.com"
              className="mt-5 block font-semibold text-gold hover:underline"
            >
              staeng75@gmail.com
            </a>
            <hr className="my-6 border-white/10" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              안내
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>· 개인적인 블로그이므로, 답변이 원활하지 않을 수 있습니다.</li>
              <li>· 남겨주신 정보는 회신 목적 외에 사용하지 않습니다.</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
