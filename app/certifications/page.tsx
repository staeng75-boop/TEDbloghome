import type { Metadata } from "next";
import BoardPage from "@/components/BoardPage";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = { title: "인증·평가" };
export const revalidate = 60;

export default async function CertificationsPage() {
  return (
    <BoardPage
      eyebrow="Certification"
      title="인증·평가"
      description="ISMS-P, CSAP, ISO 27001/27701 등 인증 준비와 심사 대응에 관한 실무 가이드와 경험을 정리합니다."
      posts={await getPostsByCategory("certification")}
      category="certification"
    />
  );
}
