import type { Metadata } from "next";
import BoardPage from "@/components/BoardPage";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = { title: "기반시설·전자금융" };
export const dynamic = "force-dynamic";

export default async function InfrastructurePage() {
  return (
    <BoardPage
      eyebrow="Infrastructure"
      title="기반시설·전자금융"
      description="주요정보통신기반시설 취약점 분석·평가, 전자금융기반시설 보안 취약점 평가에 관한 기준과 실무 노하우를 다룹니다."
      posts={await getPostsByCategory("infrastructure")}
      category="infrastructure"
    />
  );
}
