import 'server-only';
import type { NextRequest } from 'next/server';
import { siteConfig } from '@/lib/site-config';

/** Escape user input before interpolating it into HTML (emails). */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Single-line text safe for email headers (no CR/LF header injection). */
export function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').trim();
}

/**
 * Read a string field: must be a string (or absent), trimmed, and within max length.
 * Returns undefined for absent/empty, or null when the value is invalid.
 */
export function readString(input: unknown, max: number): string | undefined | null {
  if (input === undefined || input === null || input === '') return undefined;
  if (typeof input !== 'string') return null;
  const v = input.trim();
  if (v.length === 0) return undefined;
  if (v.length > max) return null;
  return v;
}

export const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
export const PHONE_RE = /^\+?[0-9 ()\-.]{7,20}$/;
// Letters (any script), marks, spaces, apostrophes, dots and hyphens. Blocks URLs in names,
// which stops the auto-reply ("Thank you, <name>") being abused to deliver spam links.
export const NAME_RE = /^[\p{L}\p{M} .'-]{2,100}$/u;

export function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Only accept browser POSTs coming from our own pages (basic CSRF / drive-by
 * protection). Falls back to Referer when Origin is missing.
 */
export function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin') ?? req.headers.get('referer');
  if (!origin) return false;
  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }
  const allowed = new Set<string>([req.headers.get('host') ?? '', new URL(siteConfig.siteUrl).host]);
  if (process.env.NODE_ENV !== 'production') {
    allowed.add('localhost:3000');
    allowed.add('127.0.0.1:3000');
  }
  const forwarded = req.headers.get('x-forwarded-host');
  if (forwarded) allowed.add(forwarded);
  return allowed.has(host);
}

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

/**
 * Fixed-window rate limiter. In-memory, so it is per server instance: good
 * enough to blunt form spam; use Upstash/Redis if you need a global limit.
 */
export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.reset < now) buckets.delete(k);
  }
  const b = buckets.get(key);
  if (!b || b.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  b.count += 1;
  if (b.count > limit) return { ok: false, retryAfter: Math.ceil((b.reset - now) / 1000) };
  return { ok: true, retryAfter: 0 };
}

/** Parse a JSON body with a hard size cap and a content-type check. */
export async function readJsonBody(req: NextRequest, maxBytes = 16_000): Promise<Record<string, unknown> | null> {
  const type = req.headers.get('content-type') ?? '';
  if (!type.toLowerCase().startsWith('application/json')) return null;
  const declared = Number(req.headers.get('content-length') ?? 0);
  if (declared > maxBytes) return null;
  const text = await req.text();
  if (text.length > maxBytes) return null;
  try {
    const data = JSON.parse(text);
    return data && typeof data === 'object' && !Array.isArray(data) ? (data as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
