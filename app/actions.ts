"use server";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { addToAudience, DeliveryNotConfigured, emailLayout, esc, p, rows, sendEmail, verifyTurnstile } from "@/lib/email";
import { bookingHref, site } from "@/lib/site";

export type FormState = { status: "idle" | "success" | "error"; message?: string; errors?: Record<string, string>; values?: Record<string, string | string[]> };

const valuesOf = (fd: FormData) => {
  const out: Record<string, string | string[]> = {};
  for (const k of new Set(fd.keys())) {
    if (k.startsWith("$") || k === "cf-turnstile-response") continue;
    const all = fd.getAll(k).map(String);
    out[k] = k === "needs" ? all : all[0];
  }
  return out;
};

const AUDIENCES = ["NGO or program", "Consultancy", "Business", "Corporate or institution", "Other"] as const;
const NEEDS = ["Stories", "Data", "Digital", "Capability", "Not sure"] as const;
const BUDGETS = ["Under 2,500 USD", "2,500 to 10,000 USD", "10,000 to 30,000 USD", "Over 30,000 USD", "Not sure"] as const;

function fieldErrors(err: z.ZodError) {
  const out: Record<string, string> = {};
  for (const i of err.issues) out[String(i.path[0])] ??= i.message;
  return out;
}

function deliveryError(e: unknown): FormState {
  console.error(e);
  return {
    status: "error",
    message:
      e instanceof DeliveryNotConfigured
        ? `Our form is not connected yet. Please email us directly at ${site.email}.`
        : `Something went wrong sending your message. Please try again, or email ${site.email}.`,
  };
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().max(40).optional(),
  organization: z.string().trim().max(120).optional(),
  audience: z.enum(AUDIENCES, { errorMap: () => ({ message: "Please choose one" }) }),
  needs: z.array(z.enum(NEEDS)).min(1, "Choose at least one"),
  budget: z.enum(BUDGETS, { errorMap: () => ({ message: "Please choose a range" }) }),
  timeline: z.string().trim().max(80).optional(),
  message: z.string().trim().min(10, "Tell us a little about your project").max(4000),
  consent: z.literal("on", { errorMap: () => ({ message: "Please confirm so we can reply" }) }),
});

export async function submitContact(_: FormState, fd: FormData): Promise<FormState> {
  if (fd.get("website")) return { status: "success" }; // honeypot
  if (!(await verifyTurnstile(fd.get("cf-turnstile-response")))) return { status: "error", message: "Please complete the security check and try again.", values: valuesOf(fd) };

  const parsed = contactSchema.safeParse({
    name: fd.get("name"), email: fd.get("email"), phone: fd.get("phone") || undefined, organization: fd.get("organization") || undefined,
    audience: fd.get("audience"), needs: fd.getAll("needs"), budget: fd.get("budget"), timeline: fd.get("timeline") || undefined,
    message: fd.get("message"), consent: fd.get("consent"),
  });
  if (!parsed.success) return { status: "error", message: "Please check the highlighted fields.", errors: fieldErrors(parsed.error), values: valuesOf(fd) };
  const d = parsed.data;

  try {
    await sendEmail({
      to: site.email,
      replyTo: d.email,
      subject: `New enquiry: ${d.organization || d.name} (${d.audience}, ${d.budget})`,
      html: emailLayout("New project enquiry", rows({
        Name: d.name, Email: d.email, "Phone or WhatsApp": d.phone, Organization: d.organization, "I am a": d.audience,
        "Help with": d.needs.join(", "), Budget: d.budget, Timeline: d.timeline, Message: d.message,
      })),
    });
    const book = bookingHref().startsWith("http") ? bookingHref() : `${site.url}${bookingHref()}`;
    await sendEmail({
      to: d.email,
      subject: "We received your message",
      html: emailLayout(`Thank you, ${d.name.split(" ")[0]}.`,
        p("We have your message and will reply within one working day.") +
        p(`If you would like to talk sooner, <a href="${esc(book)}" style="color:#0E1F3D;font-weight:600">book a free 30 minute discovery call</a>.`) +
        p("Durbaan")),
    });
  } catch (e) {
    return deliveryError(e);
  }
  return { status: "success" };
}

const guideSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  organization: z.string().trim().min(2, "Please enter your organization"),
  role: z.string().trim().min(2, "Please enter your role"),
  newsletter: z.string().optional(),
  consent: z.literal("on", { errorMap: () => ({ message: "Please confirm so we can send the guide" }) }),
});

const GUIDE_FILE = "/downloads/donor-ready-guide.pdf";
const guideExists = () => fs.existsSync(path.join(process.cwd(), "public", GUIDE_FILE));

export async function requestGuide(_: FormState, fd: FormData): Promise<FormState> {
  if (fd.get("website")) return { status: "success" };
  if (!(await verifyTurnstile(fd.get("cf-turnstile-response")))) return { status: "error", message: "Please complete the security check and try again.", values: valuesOf(fd) };
  const parsed = guideSchema.safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { status: "error", message: "Please check the highlighted fields.", errors: fieldErrors(parsed.error), values: valuesOf(fd) };
  const d = parsed.data;
  const available = guideExists();
  try {
    await sendEmail({
      to: site.email,
      replyTo: d.email,
      subject: `Guide request: ${d.organization}${available ? "" : " (PDF not uploaded yet: send manually)"}`,
      html: emailLayout("Donor-ready guide request", rows({ Name: d.name, Email: d.email, Organization: d.organization, Role: d.role, Newsletter: d.newsletter ? "Yes" : "No" })),
    });
    if (available) {
      await sendEmail({
        to: d.email,
        subject: "Your guide: The 10 things donors check before they fund you",
        html: emailLayout(`Here is your guide, ${d.name.split(" ")[0]}.`,
          p(`<a href="${site.url}${GUIDE_FILE}" style="color:#0E1F3D;font-weight:600">Download: The 10 things donors check before they fund you (PDF)</a>`) +
          p("Pick the three items where you are weakest and start there. If you want a second opinion, reply to this email and we will set up a free 30 minute donor-readiness call.")),
      });
    }
    if (d.newsletter) await addToAudience(d.email, d.name.split(" ")[0]);
  } catch (e) {
    return deliveryError(e);
  }
  return { status: "success", message: available ? "sent" : "queued" };
}

export async function subscribe(_: FormState, fd: FormData): Promise<FormState> {
  if (fd.get("website")) return { status: "success" };
  const parsed = z.object({ email: z.string().trim().email("Please enter a valid email"), consent: z.literal("on", { errorMap: () => ({ message: "Please tick the box to subscribe" }) }) }).safeParse(Object.fromEntries(fd));
  if (!parsed.success) return { status: "error", errors: fieldErrors(parsed.error), message: Object.values(fieldErrors(parsed.error))[0] };
  try {
    const added = await addToAudience(parsed.data.email);
    if (!added) await sendEmail({ to: site.email, subject: "New newsletter sign-up", html: emailLayout("Newsletter sign-up", rows({ Email: parsed.data.email })) });
  } catch (e) {
    return deliveryError(e);
  }
  return { status: "success" };
}
