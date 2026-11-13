import "server-only";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function emailLayout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#F6F7F9;font-family:Inter,Arial,sans-serif;color:#0E1F3D">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
  <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:12px;overflow:hidden">
  <tr><td style="background:#0E1F3D;padding:24px 32px;color:#fff;font-weight:700;letter-spacing:.2em;font-size:12px">DURBAAN <span style="color:#FFB020">&middot;</span> IMPACT &middot; STORIES &middot; DATA</td></tr>
  <tr><td style="padding:32px"><h1 style="font-size:22px;margin:0 0 16px">${esc(title)}</h1>${body}</td></tr>
  <tr><td style="padding:20px 32px;border-top:1px solid #E3E6EC;color:#5B6475;font-size:13px">Durbaan &middot; Mogadishu and Nairobi &middot; durbaan.com</td></tr>
  </table></td></tr></table></body></html>`;
}

export function rows(data: Record<string, string | undefined>) {
  return `<table cellpadding="6" style="border-collapse:collapse;font-size:15px">${Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="color:#5B6475;vertical-align:top;padding-right:16px">${esc(k)}</td><td>${esc(v!).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
}

export const p = (s: string) => `<p style="font-size:16px;line-height:1.6;margin:0 0 14px">${s}</p>`;
export { esc };

export class DeliveryNotConfigured extends Error {}

export async function sendEmail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL || "Durbaan <hello@durbaan.com>";
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email:dev] to=${opts.to} subject="${opts.subject}"`);
      return;
    }
    throw new DeliveryNotConfigured("RESEND_API_KEY is not set");
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [opts.to], subject: opts.subject, html: opts.html, reply_to: opts.replyTo }),
  });
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
}

export async function addToAudience(email: string, firstName?: string) {
  const key = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audience) return false;
  const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, first_name: firstName, unsubscribed: false }),
  });
  return res.ok;
}

export async function verifyTurnstile(token: FormDataEntryValue | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: honeypot still applies
  if (typeof token !== "string" || !token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}
