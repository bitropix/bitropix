import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, resumeLink, portfolioLink, role, additionalDetails } = await request.json();

    if (!name || !email || !phone || !resumeLink || !role || !additionalDetails) {
      return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 });
    }

    if (name.trim().length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters long' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    if (!isValidPhoneNumber(phone)) {
      return NextResponse.json({ error: 'Please enter a valid phone number' }, { status: 400 });
    }

    if (!isValidUrl(resumeLink)) {
      return NextResponse.json({ error: 'Please enter a valid resume link' }, { status: 400 });
    }

    if (portfolioLink && !isValidUrl(portfolioLink)) {
      return NextResponse.json({ error: 'Please enter a valid portfolio link' }, { status: 400 });
    }

    if (additionalDetails.trim().length < 10) {
      return NextResponse.json({ error: 'Additional details must be at least 10 characters long' }, { status: 400 });
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.SMTP_TO) {
      return NextResponse.json({ error: 'Email configuration error' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Bitropix Careers" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      subject: `New Job Application: ${role} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 0; }
              .container { max-width: 640px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 24px; text-align: center; }
              .content { padding: 24px; }
              .field { margin-bottom: 16px; border-bottom: 1px solid #eee; padding-bottom: 12px; }
              .field:last-child { border-bottom: none; }
              .label { font-size: 12px; color: #666; font-weight: bold; text-transform: uppercase; margin-bottom: 6px; }
              .value { font-size: 15px; color: #111; }
              .value a { color: #4f46e5; text-decoration: none; }
              .footer { background: #fafafa; padding: 16px; font-size: 12px; color: #666; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Job Application</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Role</div>
                  <div class="value">${role}</div>
                </div>
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Phone</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                <div class="field">
                  <div class="label">Resume Link</div>
                  <div class="value"><a href="${resumeLink}" target="_blank" rel="noopener noreferrer">${resumeLink}</a></div>
                </div>
                ${
                  portfolioLink
                    ? `
                <div class="field">
                  <div class="label">Portfolio Link</div>
                  <div class="value"><a href="${portfolioLink}" target="_blank" rel="noopener noreferrer">${portfolioLink}</a></div>
                </div>
                `
                    : ''
                }
                <div class="field">
                  <div class="label">Additional Details</div>
                  <div class="value">${additionalDetails}</div>
                </div>
              </div>
              <div class="footer">
                Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, message: 'Application submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 });
  }
}
