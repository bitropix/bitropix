import { NextRequest, NextResponse } from 'next/server';
import {
  EMAIL_RE,
  NAME_RE,
  PHONE_RE,
  clientIp,
  isHttpUrl,
  isSameOrigin,
  oneLine,
  rateLimit,
  readJsonBody,
  readString,
} from '@/lib/security';
import { fromAddress, getTransporter, mailConfigured, renderEmail } from '@/lib/mailer';

export const runtime = 'nodejs';

const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return bad('Forbidden', 403);

  const limit = rateLimit(`careers:${clientIp(request)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
    );
  }

  const body = await readJsonBody(request);
  if (!body) return bad('Invalid request');

  // Honeypot field (hidden from humans).
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const name = readString(body.name, 100);
  const email = readString(body.email, 254);
  const phone = readString(body.phone, 20);
  const resumeLink = readString(body.resumeLink, 500);
  const portfolioLink = readString(body.portfolioLink, 500);
  const role = readString(body.role, 120);
  const additionalDetails = readString(body.additionalDetails, 5000);

  if (
    name === null ||
    email === null ||
    phone === null ||
    resumeLink === null ||
    portfolioLink === null ||
    role === null ||
    additionalDetails === null
  ) {
    return bad('One or more fields are too long or invalid');
  }
  if (!name || !email || !phone || !resumeLink || !role || !additionalDetails) {
    return bad('Please fill in all required fields');
  }
  if (!NAME_RE.test(name)) return bad('Please enter a valid name');
  if (!EMAIL_RE.test(email)) return bad('Please enter a valid email address');
  if (!PHONE_RE.test(phone)) return bad('Please enter a valid phone number');
  if (!isHttpUrl(resumeLink)) return bad('Please enter a valid resume link');
  if (portfolioLink && !isHttpUrl(portfolioLink)) return bad('Please enter a valid portfolio link');
  if (additionalDetails.length < 10) return bad('Additional details must be at least 10 characters long');

  if (!mailConfigured()) {
    console.error('Careers form: SMTP is not configured');
    return bad('Our mail service is unavailable right now. Please email us directly.', 503);
  }

  try {
    await getTransporter().sendMail({
      from: fromAddress('Bitropix Careers'),
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: oneLine(`New application: ${role} | ${name}`),
      html: renderEmail(
        'New job application',
        [
          { label: 'Role', value: role },
          { label: 'Name', value: name },
          { label: 'Email', value: email, href: `mailto:${email}` },
          { label: 'Phone', value: phone, href: `tel:${phone.replace(/[^\d+]/g, '')}` },
          { label: 'Resume', value: resumeLink, href: resumeLink },
          { label: 'Portfolio', value: portfolioLink, href: portfolioLink },
          { label: 'Additional details', value: additionalDetails, multiline: true },
        ],
        `Received ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`
      ),
    });
  } catch {
    console.error('Careers form: email failed');
    return bad('Failed to submit application. Please try again.', 502);
  }

  return NextResponse.json({ success: true, message: 'Application submitted successfully' }, { status: 200 });
}
