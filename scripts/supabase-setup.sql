-- TED BLOG 콘텐츠 테이블 (Supabase SQL Editor에 붙여넣고 Run)
create table if not exists entries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('post', 'resource')),
  slug text not null unique,
  title text not null,
  category text not null,
  date text not null,
  excerpt text not null default '',
  content text not null default '',
  created_at timestamptz not null default now()
);

-- RLS 활성화: 공개 정책을 만들지 않으므로 anon 키로는 읽기/쓰기 모두 불가.
-- 사이트 서버(service_role 키)만 접근 가능하다.
alter table entries enable row level security;
