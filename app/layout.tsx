import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "TED BLOG Security — 정보보호 지식 창구",
    template: "%s | TED BLOG Security",
  },
  description:
    "약 30년간 정보보호 현장을 지켜온 컨설턴트의 지식 창구. ISMS-P, CSAP, ISO 27001/27701, 주요정보통신기반시설, 전자금융 평가의 현장 경험과 노하우를 기록합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
