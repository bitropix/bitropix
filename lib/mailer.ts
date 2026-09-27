import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';
import { escapeHtml } from '@/lib/security';
import { siteConfig } from '@/lib/site-config';

let cached: Transporter | null = null;

export function mailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD && process.env.SMTP_TO);
}

/** Reused SMTP transporter. TLS certificates are verified (never disable rejectUnauthorized). */
export function getTransporter(): Transporter {
  if (cached) return cached;
  const port = Number(process.env.SMTP_PORT || 587);
  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
  return cached;
}

export function fromAddress(label: string): string {
  const addr = process.env.SMTP_FROM || process.env.SMTP_USER || siteConfig.email;
  return `"${label.replace(/"/g, '')}" <${addr}>`;
}

export type EmailField = { label: string; value?: string; href?: string; multiline?: boolean };

/** Branded HTML email. Every value is escaped here, so callers pass raw user input. */
export function renderEmail(title: string, fields: EmailField[], footer?: string): string {
  const rows = fields
    .filter((f) => f.value)
    .map((f) => {
      const safe = escapeHtml(f.value as string);
      const body = f.multiline ? safe.replace(/\n/g, '<br/>') : safe;
      const content = f.href ? `<a href="${escapeHtml(f.href)}" style="color:#ff4a1f;text-decoration:none">${body}</a>` : body;
      return `<tr><td style="padding:14px 0;border-bottom:1px solid #eeeae3">
        <div style="font:600 11px/1.4 ui-monospace,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;color:#8d8b93;margin-bottom:4px">${escapeHtml(f.label)}</div>
        <div style="font:15px/1.6 Arial,Helvetica,sans-serif;color:#0b0b0c">${content}</div>
      </td></tr>`;
    })
    .join('');

  return `<!DOCTYPE html><html><body style="margin:0;background:#f3f0ea;padding:24px 12px">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff">
    <tr><td style="background:#0b0b0c;padding:28px 32px">
      <div style="font:700 13px/1 Arial,Helvetica,sans-serif;letter-spacing:.3em;color:#f3f0ea">BITROPIX</div>
      <div style="height:3px;width:48px;background:#ff4a1f;margin:16px 0"></div>
      <div style="font:600 22px/1.3 Arial,Helvetica,sans-serif;color:#f3f0ea">${escapeHtml(title)}</div>
    </td></tr>
    <tr><td style="padding:8px 32px 24px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table></td></tr>
    <tr><td style="padding:18px 32px;background:#f8f6f2;font:12px/1.6 Arial,Helvetica,sans-serif;color:#6b6a70">
      ${footer ? `${escapeHtml(footer)}<br/>` : ''}Bitropix | ${escapeHtml(siteConfig.location)} | ${escapeHtml(siteConfig.email)}
    </td></tr>
  </table></body></html>`;
}
