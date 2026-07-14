import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "TED Security — 정보보호·개인정보보호 전문 컨설팅",
    template: "%s | TED Security",
  },
  description:
    "ISMS-P, CSAP, ISO 27001/27701, 주요정보통신기반시설, 전자금융기반시설 평가. 공공기관과 함께 신뢰할 수 있는 관리체계를 만듭니다.",
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
