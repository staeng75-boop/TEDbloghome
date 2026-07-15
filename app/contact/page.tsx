import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "문의" };

export default function ContactPage() {
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
          <ContactForm />
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
