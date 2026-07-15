// 마크다운 → HTML 변환 결과를 새니타이즈한다.
// isomorphic-dompurify(jsdom)는 Vercel 람다 런타임과 ESM 호환 문제로
// 500 오류를 일으켜 sanitize-html(순수 CJS)로 대체함.

import sanitizeHtml from "sanitize-html";

export function sanitize(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height"],
      a: ["href", "name", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}
