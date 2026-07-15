import { NextResponse } from "next/server";

const TO_EMAIL = "staeng75@gmail.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: {
    name?: string;
    email?: string;
    topic?: string;
    message?: string;
    honey?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { name, email, topic, message, honey } = body;

  if (honey) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "필수 항목을 입력해주세요." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.trim())) {
    return NextResponse.json(
      { error: "이메일 형식이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "서버에 이메일 발송 설정이 되어 있지 않습니다." },
      { status: 500 }
    );
  }

  const html = `
    <table style="font-family: sans-serif; font-size: 14px; border-collapse: collapse;">
      <tr><td style="padding:6px 12px;font-weight:bold;">성함/소속</td><td style="padding:6px 12px;">${escapeHtml(name.trim())}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">이메일</td><td style="padding:6px 12px;">${escapeHtml(email.trim())}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">문의 분야</td><td style="padding:6px 12px;">${escapeHtml(topic?.trim() || "-")}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top;">문의 내용</td><td style="padding:6px 12px;white-space:pre-wrap;">${escapeHtml(message.trim())}</td></tr>
    </table>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "TED BLOG Security <onboarding@resend.dev>",
      to: [TO_EMAIL],
      reply_to: email.trim(),
      subject: `[TED BLOG Security] 새 문의: ${name.trim()}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend send failed:", res.status, detail.slice(0, 300));
    return NextResponse.json(
      { error: "메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
