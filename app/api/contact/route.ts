import { NextRequest, NextResponse } from 'next/server';
import {
  EMAIL_RE,
  NAME_RE,
  PHONE_RE,
  clientIp,
  isSameOrigin,
  oneLine,
  rateLimit,
  readJsonBody,
  readString,
} from '@/lib/security';
import { fromAddress, getTransporter, mailConfigured, renderEmail } from '@/lib/mailer';
import { siteConfig } from '@/lib/site-config';

export const runtime = 'nodejs';

const SLUG_RE = /^[a-z0-9-]{2,40}$/;

const BUDGETS: Record<string, string> = {
  'under-5l': 'Under Rs 5 Lakhs',
  '5l-15l': 'Rs 5 to 15 Lakhs',
  '15l-30l': 'Rs 15 to 30 Lakhs',
  'above-30l': 'Above Rs 30 Lakhs',
  'not-sure': 'Not sure yet',
};

const pretty = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Plain text (no parse_mode), so user input can't inject Telegram markup.
      body: JSON.stringify({ chat_id: chatId, text: text.slice(0, 4000), disable_web_page_preview: true }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error('Telegram notify failed with status', res.status);
  } catch {
    console.error('Telegram notify failed');
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return bad('Forbidden', 403);

  const ip = clientIp(request);
  const limit = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  const body = await readJsonBody(request);
  if (!body) return bad('Invalid request');

  // Honeypot: real users never see or fill this field. Pretend success so bots move on.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const name = readString(body.name, 100);
  const email = readString(body.email, 254);
  const phone = readString(body.phone, 20);
  const company = readString(body.company, 120);
  const organizationType = readString(body.organizationType, 40);
  const service = readString(body.service, 40);
  const budget = readString(body.budget, 20);
  const message = readString(body.message, 5000);

  if (
    name === null ||
    email === null ||
    phone === null ||
    company === null ||
    organizationType === null ||
    service === null ||
    budget === null ||
    message === null
  ) {
    return bad('One or more fields are too long or invalid');
  }
  if (!name || !email || !service || !message) return bad('Please fill in all required fields');
  if (!NAME_RE.test(name)) return bad('Please enter a valid name');
  if (!EMAIL_RE.test(email)) return bad('Please enter a valid email address');
  if (phone && !PHONE_RE.test(phone)) return bad('Please enter a valid phone number');
  if (!SLUG_RE.test(service)) return bad('Please choose a service');
  if (organizationType && !SLUG_RE.test(organizationType)) return bad('Invalid organization type');
  if (budget && !(budget in BUDGETS)) return bad('Invalid budget');
  if (message.length < 10) return bad('Message must be at least 10 characters long');

  // Per-email limit too, so one address can't be used to trigger many auto-replies.
  if (!rateLimit(`contact-email:${email.toLowerCase()}`, 3, 60 * 60 * 1000).ok) {
    return bad('Too many requests. Please try again later.', 429);
  }

  const serviceName = pretty(service);
  const budgetName = budget ? BUDGETS[budget] : undefined;
  const orgName = organizationType ? pretty(organizationType) : undefined;
  const received = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  await notifyTelegram(
    [
      'NEW CONTACT FORM SUBMISSION',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      company && `Company: ${company}`,
      orgName && `Organization: ${orgName}`,
      `Service: ${serviceName}`,
      budgetName && `Budget: ${budgetName}`,
      '',
      'MESSAGE',
      message,
      '',
      `Received: ${received}`,
    ]
      .filter((l): l is string => typeof l === 'string')
      .join('\n')
  );

  if (!mailConfigured()) {
    console.error('Contact form: SMTP is not configured');
    return bad('Our mail service is unavailable right now. Please email us directly.', 503);
  }

  const transporter = getTransporter();

  try {
    await transporter.sendMail({
      from: fromAddress('Bitropix Contact Form'),
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: oneLine(`New enquiry: ${serviceName} | ${name}`),
      html: renderEmail(
        'New contact form submission',
        [
          { label: 'Name', value: name },
          { label: 'Email', value: email, href: `mailto:${email}` },
          { label: 'Phone', value: phone, href: phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined },
          { label: 'Company', value: company },
          { label: 'Organization type', value: orgName },
          { label: 'Service', value: serviceName },
          { label: 'Budget', value: budgetName },
          { label: 'Message', value: message, multiline: true },
        ],
        `Received ${received} IST`
      ),
    });
  } catch {
    console.error('Contact form: admin email failed');
    return bad('Failed to send message. Please try again.', 502);
  }

  // Auto-reply: fixed wording, only the validated name and service are echoed back.
  try {
    await transporter.sendMail({
      from: fromAddress('Bitropix'),
      to: email,
      subject: 'We received your message | Bitropix',
      html: renderEmail(
        `Thank you, ${name.split(' ')[0]}.`,
        [
          {
            label: 'What happens next',
            value: `Our team will review your enquiry about ${serviceName} and reply within one business day. For anything urgent, call ${siteConfig.phoneDisplay}.`,
          },
        ],
        'You are receiving this because you contacted Bitropix through our website.'
      ),
    });
  } catch {
    // The enquiry reached us; a failed courtesy email shouldn't show the user an error.
    console.error('Contact form: auto-reply failed');
  }

  return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
}
