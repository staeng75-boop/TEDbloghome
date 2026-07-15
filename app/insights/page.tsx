import type { Metadata } from "next";
import BoardPage from "@/components/BoardPage";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = { title: "보안 인사이트" };
export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  return (
    <BoardPage
      eyebrow="Insights"
      title="보안 인사이트"
      description="정보보호·개인정보보호 분야의 최신 동향, 제도 변화, 현장에서 느낀 이슈를 기록합니다."
      posts={await getPostsByCategory("insight")}
      category="insight"
    />
  );
}
