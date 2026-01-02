import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Function to send Telegram message
async function sendTelegramMessage(formData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Missing Telegram credentials');
    return { success: false, error: 'Missing credentials' };
  }

  // Format service name
  const serviceName = formData.service
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Format budget
  let budgetDisplay = '';
  if (formData.budget) {
    const budgetMap: { [key: string]: string } = {
      'under-5l': 'Under Rs 5 Lakhs',
      '5l-15l': 'Rs 5 - 15 Lakhs',
      '15l-30l': 'Rs 15 - 30 Lakhs',
      'above-30l': 'Above Rs 30 Lakhs',
      'not-sure': 'Not Sure Yet',
    };
    budgetDisplay = budgetMap[formData.budget] || formData.budget;
  }

  // Format message
  const telegramMessage = `
NEW CONTACT FORM SUBMISSION

CUSTOMER DETAILS
Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}
${formData.company ? `Company: ${formData.company}` : ''}

PROJECT INFORMATION
Service: ${serviceName}
${formData.budget ? `Budget: ${budgetDisplay}` : ''}

MESSAGE
${formData.message}

Received: ${new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })}
  `.trim();

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', data);
      return { success: false, error: data };
    }

    console.log('Telegram message sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Telegram sending failed:', error);
    return { success: false, error };
  }
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation
function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return true;
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
}

export async function POST(request: NextRequest) {
  try {
    // Log environment variables (without sensitive values)
    console.log('Environment check:', {
      hasSmtpHost: !!process.env.SMTP_HOST,
      hasSmtpPort: !!process.env.SMTP_PORT,
      hasSmtpUser: !!process.env.SMTP_USER,
      hasSmtpPassword: !!process.env.SMTP_PASSWORD,
      hasSmtpFrom: !!process.env.SMTP_FROM,
      hasSmtpTo: !!process.env.SMTP_TO,
      hasTelegramToken: !!process.env.TELEGRAM_BOT_TOKEN,
      hasTelegramChatId: !!process.env.TELEGRAM_CHAT_ID,
    });

    const { name, email, phone, company, service, budget, message } = await request.json();

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Please fill in all required fields' }, { status: 400 });
    }

    if (name.trim().length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters long' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    if (phone && !isValidPhoneNumber(phone)) {
      return NextResponse.json({ error: 'Please enter a valid phone number' }, { status: 400 });
    }

    if (message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters long' }, { status: 400 });
    }

    const formData = { name, email, phone, company, service, budget, message };

    // Send Telegram notification with error logging
    const telegramResult = await sendTelegramMessage(formData);
    if (!telegramResult.success) {
      console.error('Telegram failed:', telegramResult.error);
    }

    // Verify email environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('Missing email configuration');
      return NextResponse.json({ error: 'Email configuration error' }, { status: 500 });
    }

    // Create email transporter with better error handling
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // For Gmail
      },
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('SMTP connection verified');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      return NextResponse.json({ error: 'Email service configuration error' }, { status: 500 });
    }

    // Format service name
    const serviceName = service
      .split('-')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Format budget
    let budgetDisplay = budget;
    if (budget) {
      const budgetMap: { [key: string]: string } = {
        'under-5l': 'Under Rs 5 Lakhs',
        '5l-15l': 'Rs 5 - 15 Lakhs',
        '15l-30l': 'Rs 15 - 30 Lakhs',
        'above-30l': 'Above Rs 30 Lakhs',
        'not-sure': 'Not Sure Yet',
      };
      budgetDisplay = budgetMap[budget] || budget;
    }

    // Admin email
    const adminMailOptions = {
      from: `"Bitropix Contact Form" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      subject: `New Contact: ${serviceName} - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { padding: 30px; }
              .field { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
              .field:last-child { border-bottom: none; }
              .label { font-weight: bold; color: #555; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
              .value { color: #333; font-size: 16px; }
              .value a { color: #667eea; text-decoration: none; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${
                  phone
                    ? `
                <div class="field">
                  <div class="label">Phone</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                `
                    : ''
                }
                ${
                  company
                    ? `
                <div class="field">
                  <div class="label">Company</div>
                  <div class="value">${company}</div>
                </div>
                `
                    : ''
                }
                <div class="field">
                  <div class="label">Service Interested In</div>
                  <div class="value">${serviceName}</div>
                </div>
                ${
                  budget
                    ? `
                <div class="field">
                  <div class="label">Budget Range</div>
                  <div class="value">${budgetDisplay}</div>
                </div>
                `
                    : ''
                }
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p>Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                <p>Bitropix | Noida, Uttar Pradesh</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Customer auto-reply email
    const customerMailOptions = {
      from: `"Bitropix" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Thank you for contacting Bitropix',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f4f4f4; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; }
              .content { padding: 40px; }
              .content p { margin: 0 0 15px 0; }
              .footer { background: #f8f9fa; padding: 25px; text-align: center; font-size: 14px; color: #666; }
              .footer a { color: #667eea; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You, ${name}!</h1>
              </div>
              <div class="content">
                <p>We've received your message and appreciate you reaching out to Bitropix.</p>
                <p>Our team will review your inquiry regarding <strong>${serviceName}</strong> and get back to you within 24 hours during business days.</p>
                <p>In the meantime, feel free to explore our services or connect with us on social media.</p>
                <p style="margin-top: 30px;">Best regards,<br/><strong>The Bitropix Team</strong></p>
              </div>
              <div class="footer">
                <p><strong>Bitropix</strong> | Noida, Uttar Pradesh</p>
                <p>Email: <a href="mailto:info@bitropix.com">info@bitropix.com</a></p>
                <p>Phone: <a href="tel:+919004569903">+91 9004569903</a> | <a href="tel:+919318454571">+91 9318454571</a></p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send emails with error handling
    try {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(customerMailOptions),
      ]);
      console.log('Emails sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
