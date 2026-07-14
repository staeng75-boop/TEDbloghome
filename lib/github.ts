// GitHub 저장소를 콘텐츠 저장소(CMS)로 사용한다.
// 글 등록(/api/write)이 저장소에 커밋하면, 아래 fetch가 60초 캐시로
// 다시 읽어와 재배포 없이 사이트에 반영된다.

const REPO = "staeng75-boop/TEDbloghome";
const REVALIDATE = 60;

function headers(): HeadersInit {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "tedbloghome",
  };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

export type RawFile = { name: string; text: string };

export async function listMarkdownFiles(dir: string): Promise<RawFile[]> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${dir}`,
    { headers: headers(), next: { revalidate: REVALIDATE } }
  );
  if (!res.ok) return [];
  const entries = (await res.json()) as {
    name: string;
    download_url: string;
  }[];
  const mdFiles = entries.filter((e) => e.name.endsWith(".md"));
  return Promise.all(
    mdFiles.map(async (e) => {
      const r = await fetch(e.download_url, {
        next: { revalidate: REVALIDATE },
      });
      return { name: e.name, text: r.ok ? await r.text() : "" };
    })
  );
}

export async function getMarkdownFile(
  dir: string,
  slug: string
): Promise<string | null> {
  const res = await fetch(
    `https://raw.githubusercontent.com/${REPO}/main/${dir}/${encodeURIComponent(slug)}.md`,
    { next: { revalidate: REVALIDATE } }
  );
  return res.ok ? res.text() : null;
}
