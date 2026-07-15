import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  revalidateTag("github-content");
  return NextResponse.json({ ok: true });
}
