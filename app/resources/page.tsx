import type { Metadata } from "next";
import ResourceVault from "@/components/ResourceVault";
import { getAllResources, RESOURCE_CATEGORIES } from "@/lib/resources";

export const metadata: Metadata = { title: "자료실" };

export default function ResourcesPage() {
  const items = getAllResources();

  return (
    <div>
      <section className="bg-gradient-to-b from-mist-100 to-white">
        <div className="container-content py-16 sm:py-20">
          <p className="eyebrow">Resources</p>
          <h1 className="mt-3 section-title">자료실</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            인증별로 정리한 양식·체크리스트·참고 자료 보관함입니다.
            운영자 전용 비공개 게시판입니다.
          </p>
        </div>
      </section>
      <section className="container-content pb-20">
        <ResourceVault categories={RESOURCE_CATEGORIES} items={items} />
      </section>
    </div>
  );
}
