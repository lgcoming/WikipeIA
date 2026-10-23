import { NextResponse } from "next/server";
import { Resend } from "resend";

// Rate limit sencillo en memoria (por IP)
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const RATE_MAX = 8; // máximo 8 envíos por ventana
const bucket = new Map<string, number[]>();

// El contenido del formulario se inserta en el HTML del email: hay que escaparlo.
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for") || "";
  return xf.split(",")[0].trim() || "0.0.0.0";
}

// POST /api/contact
export async function POST(req: Request) {
  try {
    const { name, email, message, hp, ts } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: "Email y mensaje son obligatorios" }, { status: 400 });
    }

    // Anti-spam básico
    // Honeypot: si viene relleno, respondemos OK sin enviar (para no dar pistas a bots)
    if (hp && String(hp).trim() !== "") {
      return NextResponse.json({ ok: true });
    }
    // Tiempo mínimo desde apertura del modal hasta envío (evita bots instantáneos)
    const sentAt = Date.now();
    const openedAt = Number.isFinite(ts) ? Number(ts) : sentAt;
    if (sentAt - openedAt < 1500) {
      return NextResponse.json({ error: "Formulario enviado demasiado rápido" }, { status: 400 });
    }

    // Rate limit por IP
    const ip = getIp(req);
    const now = Date.now();
    const arr = bucket.get(ip) || [];
    const recent = arr.filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_MAX) {
      return NextResponse.json({ error: "Has enviado demasiados mensajes, inténtalo más tarde." }, { status: 429 });
    }
    recent.push(now);
    bucket.set(ip, recent);

    // Validaciones básicas
    const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const safe = (v: string) => String(v || "").trim();
    const _name = safe(name).slice(0, 120);
    const _email = safe(email).slice(0, 200);
    const _message = safe(message).slice(0, 5000);
    if (!isEmail(_email)) {
      return NextResponse.json({ error: "Email no válido" }, { status: 400 });
    }
    if (_message.length < 5) {
      return NextResponse.json({ error: "El mensaje es demasiado corto" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: "Falta RESEND_API_KEY en variables de entorno" }, { status: 500 });
    }

    const TO = process.env.CONTACT_TO || "lawikipeia@gmail.com";
    const FROM = process.env.CONTACT_FROM || "onboarding@resend.dev"; // permitido por Resend en modo sandbox

    const resend = new Resend(RESEND_API_KEY);

    const subject = `Contacto desde WikipeIA - ${_name || "Sin nombre"}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5;">
        <h2 style="margin:0 0 12px 0;">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(_name) || "(no indicado)"}</p>
        <p><strong>Email:</strong> ${escapeHtml(_email)}</p>
        <p><strong>Mensaje:</strong></p>
        <pre style="white-space: pre-wrap; background:#f6f8fa; padding:12px; border-radius:8px;">${escapeHtml(_message)}</pre>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: _email,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message || "No se pudo enviar" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }
}
