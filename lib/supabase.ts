// Supabase를 콘텐츠 저장소로 사용한다.
// 서버 전용(service_role) 클라이언트 — 브라우저에 노출되면 안 되므로
// 반드시 서버 컴포넌트/라우트 핸들러에서만 import 할 것.

import { createClient } from "@supabase/supabase-js";

export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 미설정");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type EntryRow = {
  id: string;
  type: "post" | "resource";
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  created_at: string;
};
