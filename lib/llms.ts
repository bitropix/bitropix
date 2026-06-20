/**
 * Generators for /llms.txt and /llms-full.txt (see https://llmstxt.org).
 *
 * - buildLlmsTxt()      → concise, link-first markdown index of the site.
 * - buildLlmsFullTxt()  → same structure, but with full article/case-study
 *                         bodies inlined for retrieval-augmented AI agents.
 *
 * All data is sourced from this project's real content modules (services, blog,
 * portfolio, careers, FAQ) and all URLs are absolute, built from siteConfig.
 */
import { siteConfig, absoluteUrl } from '@/lib/site-config';
import { services } from '@/lib/services-data';
import { blogPosts, formatBlogDate, type BlogPost } from '@/lib/blog-data';
import { portfolioProjects } from '@/lib/portfolio-data';
import { jobOpenings, type JobOpening } from '@/lib/careers';
import { groups as faqGroups } from '@/lib/faq-data';

/** Strip a trailing " | Bitropix" / " - Bitropix" brand suffix off a meta title. */
function cleanTitle(title: string): string {
  return title.replace(new RegExp(`\\s*[|\\-–]\\s*${siteConfig.siteName}\\s*$`, 'i'), '').trim();
}

/** Collapse whitespace and trim - for single-line fields (excerpts, descriptions). */
function oneLine(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/* ------------------------------------------------------------------ *
 * Minimal HTML → Markdown serializer for article bodies.
 * Handles headings, lists, blockquotes, paragraphs, and inline marks.
 * Images and embeds are intentionally skipped.
 * ------------------------------------------------------------------ */

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&rsquo;|&lsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, '-')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&');
}

/** Convert inline-level HTML to Markdown (links, emphasis, code, breaks). */
function inlineToMd(s: string): string {
  return s
    .replace(/<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
      const label = text.replace(/<[^>]+>/g, '').trim();
      return label ? `[${label}](${href})` : href;
    })
    .replace(/<\/?(?:strong|b)\b[^>]*>/gi, '**')
    .replace(/<\/?(?:em|i)\b[^>]*>/gi, '*')
    .replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, c) => '`' + c.replace(/<[^>]+>/g, '').trim() + '`')
    .replace(/<br\s*\/?>(?:\s*)/gi, '\n');
}

/** Strip tags from a fragment and tidy whitespace (for headings / list items). */
function stripInline(s: string): string {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Convert an HTML body to Markdown.
 * @param html         raw HTML string
 * @param headingOffset levels to demote source headings by, so an article body
 *                      nests under its own title (e.g. 2 → h2 becomes h4).
 */
export function htmlToMarkdown(html: string, headingOffset = 0): string {
  if (!html) return '';
  let s = html;

  // Drop images, media, and embeds entirely.
  s = s.replace(/<(?:img|source|track)\b[^>]*\/?>/gi, '');
  s = s.replace(/<(figure|picture|svg|iframe|video|audio|script|style)\b[\s\S]*?<\/\1>/gi, '');

  // Inline marks first (so block extraction keeps the markdown).
  s = inlineToMd(s);

  // Headings - demote by headingOffset, capped at h6.
  s = s.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_, lvl, text) => {
    const level = Math.min(6, parseInt(lvl, 10) + headingOffset);
    return `\n\n${'#'.repeat(level)} ${stripInline(text)}\n\n`;
  });

  // Blockquotes.
  s = s.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, inner) => `\n\n> ${stripInline(inner)}\n\n`);

  // Ordered lists → numbered items.
  s = s.replace(/<ol\b[^>]*>([\s\S]*?)<\/ol>/gi, (_, inner: string) => {
    let i = 0;
    const items = inner.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_m, item) => {
      i += 1;
      return `\n${i}. ${stripInline(item)}`;
    });
    return `\n${items}\n`;
  });

  // Unordered list items.
  s = s.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, item) => `\n- ${stripInline(item)}`);
  s = s.replace(/<\/?(?:ul|ol)\b[^>]*>/gi, '\n');

  // Paragraphs.
  s = s.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, text) => `\n\n${stripInline(text)}\n\n`);

  // Anything left over.
  s = s.replace(/<[^>]+>/g, '');
  s = decodeEntities(s);

  // Tidy whitespace.
  return s
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* ------------------------------------------------------------------ *
 * Shared building blocks
 * ------------------------------------------------------------------ */

function serviceUrl(slug: string): string {
  return absoluteUrl(`/services#${slug}`);
}

function blogUrl(slug: string): string {
  return absoluteUrl(`/blogs/${slug}`);
}

function portfolioUrl(slug: string): string {
  return absoluteUrl(`/portfolio/${slug}`);
}

function careerUrl(slug: string): string {
  return absoluteUrl(`/careers/${slug}`);
}

/** Blog posts sorted newest-first by published date. */
function sortedPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

function formatSalary(job: JobOpening): string | null {
  if (!job.salary) return null;
  const { min, max, currency, unit } = job.salary;
  const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);
  return `${currency} ${fmt(min)}–${fmt(max)} / ${unit.toLowerCase()}`;
}

/* ------------------------------------------------------------------ *
 * buildLlmsTxt - concise index
 * ------------------------------------------------------------------ */

export async function buildLlmsTxt(): Promise<string> {
  const { siteName, description } = siteConfig;
  const lines: string[] = [];

  lines.push(`# ${siteName}`);
  lines.push('');
  lines.push(`> ${oneLine(description)}`);
  lines.push('');
  lines.push(`- Website: ${siteConfig.siteUrl}`);
  lines.push(`- Email: ${siteConfig.email}`);
  lines.push(`- Phone: ${siteConfig.phone}`);
  lines.push(`- Location: ${siteConfig.location}`);
  lines.push(`- Founded: ${siteConfig.founded}`);

  lines.push('');
  lines.push('## Key Pages');
  lines.push(`- [Home](${absoluteUrl('/')}): ${siteName} - ${siteConfig.tagline}.`);
  lines.push(`- [About](${absoluteUrl('/about')}): Who we are, our team, and how we work.`);
  lines.push(`- [Services](${absoluteUrl('/services')}): Full catalogue of IT and digital marketing services.`);
  lines.push(`- [Portfolio](${absoluteUrl('/portfolio')}): Selected client work and case studies.`);
  lines.push(`- [Blog](${absoluteUrl('/blogs')}): Insights on development, design, cloud, and marketing.`);
  lines.push(`- [Careers](${absoluteUrl('/careers')}): Open roles and life at ${siteName}.`);
  lines.push(`- [Contact](${absoluteUrl('/contact')}): Start a project or request a free consultation.`);
  lines.push(`- [FAQ](${absoluteUrl('/faq')}): Common questions on pricing, timelines, and process.`);

  lines.push('');
  lines.push('## Services');
  for (const s of services) {
    lines.push(`- [${cleanTitle(s.title)}](${serviceUrl(s.slug)}): ${oneLine(s.description)}`);
  }

  if (portfolioProjects.length) {
    lines.push('');
    lines.push('## Case Studies');
    for (const p of portfolioProjects) {
      lines.push(`- [${p.title}](${portfolioUrl(p.slug)}): ${oneLine(p.tagline)} - ${oneLine(p.industry)}.`);
    }
  }

  if (jobOpenings.length) {
    lines.push('');
    lines.push('## Open Roles');
    for (const job of jobOpenings) {
      lines.push(`- [${job.title}](${careerUrl(job.slug)}): ${job.department} · ${job.location} · ${job.type}.`);
    }
  }

  const posts = sortedPosts();
  if (posts.length) {
    lines.push('');
    lines.push('## Insights (Blog)');
    for (const post of posts) {
      lines.push(`- [${cleanTitle(post.title)}](${blogUrl(post.slug)}): ${oneLine(post.excerpt)}`);
    }
  }

  lines.push('');
  lines.push('## Legal');
  lines.push(`- [Privacy Policy](${absoluteUrl('/privacy')})`);
  lines.push(`- [Terms of Service](${absoluteUrl('/terms')})`);
  lines.push('');

  return lines.join('\n');
}

/* ------------------------------------------------------------------ *
 * buildLlmsFullTxt - full content inlined
 * ------------------------------------------------------------------ */

export async function buildLlmsFullTxt(): Promise<string> {
  const { siteName, description } = siteConfig;
  const lines: string[] = [];

  lines.push(`# ${siteName} - Full Reference for AI Agents`);
  lines.push('');
  lines.push(`> ${oneLine(description)}`);

  // Identity
  lines.push('');
  lines.push('## Identity');
  lines.push(`- Legal name: ${siteName}`);
  lines.push(`- Website: ${siteConfig.siteUrl}`);
  lines.push(`- Email: ${siteConfig.email}`);
  lines.push(`- Phone: ${siteConfig.phone}`);
  lines.push(`- Location: ${siteConfig.location}`);
  lines.push(`- Founded: ${siteConfig.founded}`);
  lines.push(`- Service area: ${siteConfig.serviceArea.join(', ')}`);
  lines.push(`- LinkedIn: ${siteConfig.social.linkedin}`);
  lines.push(`- Instagram: ${siteConfig.social.instagram}`);
  lines.push(`- Twitter/X: ${siteConfig.social.twitter}`);
  lines.push(`- Facebook: ${siteConfig.social.facebook}`);

  // Services
  lines.push('');
  lines.push('## Services');
  for (const s of services) {
    lines.push('');
    lines.push(`### ${cleanTitle(s.title)}`);
    lines.push('');
    lines.push(oneLine(s.description));
    lines.push('');
    lines.push(`- Capabilities: ${s.features.join('; ')}.`);
    lines.push(`- Technologies: ${s.technologies.join(', ')}.`);
    lines.push(`- URL: ${serviceUrl(s.slug)}`);
  }

  // Case Studies
  if (portfolioProjects.length) {
    lines.push('');
    lines.push('## Case Studies');
    for (const p of portfolioProjects) {
      lines.push('');
      lines.push(`### ${p.title} - ${oneLine(p.tagline)}`);
      lines.push('');
      lines.push(`- Industry: ${p.industry}`);
      lines.push(`- Category: ${p.category}`);
      lines.push(`- Services: ${p.services.join(', ')}`);
      lines.push(`- Tech stack: ${p.techStack.join(', ')}`);
      lines.push(`- Live site: ${p.url}`);
      lines.push(`- Case study: ${portfolioUrl(p.slug)}`);
      lines.push('');
      lines.push(oneLine(p.description));
      lines.push('');
      lines.push(`**Challenge:** ${oneLine(p.challenge)}`);
      lines.push('');
      lines.push(`**Solution:** ${oneLine(p.solution)}`);
      if (p.results?.length) {
        lines.push('');
        lines.push('**Results:**');
        for (const r of p.results) lines.push(`- ${oneLine(r)}`);
      }
      if (p.testimonial) {
        lines.push('');
        lines.push(`**Testimonial:** "${oneLine(p.testimonial)}"`);
      }
    }
  }

  // Open Roles
  if (jobOpenings.length) {
    lines.push('');
    lines.push('## Open Roles');
    for (const job of jobOpenings) {
      lines.push('');
      lines.push(`### ${job.title}`);
      lines.push('');
      lines.push(`- Department: ${job.department}`);
      lines.push(`- Location: ${job.location}`);
      lines.push(`- Type: ${job.type}`);
      lines.push(`- Experience: ${job.experience}`);
      lines.push(`- Posted: ${job.postedAt}`);
      const salary = formatSalary(job);
      if (salary) lines.push(`- Salary: ${salary}`);
      lines.push(`- Skills: ${job.skills.join(', ')}`);
      lines.push(`- URL: ${careerUrl(job.slug)}`);
      lines.push('');
      lines.push(oneLine(job.description));
    }
  }

  // FAQ
  if (faqGroups.length) {
    lines.push('');
    lines.push('## Frequently Asked Questions');
    lines.push(`URL: ${absoluteUrl('/faq')}`);
    for (const group of faqGroups) {
      lines.push('');
      lines.push(`### ${group.title}`);
      for (const faq of group.faqs) {
        lines.push('');
        lines.push(`**${oneLine(faq.question)}**`);
        lines.push(oneLine(faq.answer));
      }
    }
  }

  // Blog (full bodies)
  const posts = sortedPosts();
  if (posts.length) {
    lines.push('');
    lines.push('## Insights (Blog)');
    for (const post of posts) {
      lines.push('');
      lines.push(`### ${cleanTitle(post.title)}`);
      lines.push('');
      lines.push(`- URL: ${blogUrl(post.slug)}`);
      lines.push(`- Published: ${formatBlogDate(post.date)}`);
      if (post.dateModified && post.dateModified !== post.date) {
        lines.push(`- Updated: ${formatBlogDate(post.dateModified)}`);
      }
      lines.push(`- Author: ${post.author}${post.authorRole ? `, ${post.authorRole}` : ''}`);
      lines.push(`- Category: ${post.category}`);
      if (post.readTime) lines.push(`- Read time: ${post.readTime}`);
      if (post.tags?.length) lines.push(`- Tags: ${post.tags.join(', ')}`);
      lines.push('');
      lines.push(`> ${oneLine(post.excerpt)}`);
      const body = htmlToMarkdown(post.content, 2);
      if (body) {
        lines.push('');
        lines.push(body);
      }
    }
  }

  // Legal
  lines.push('');
  lines.push('## Legal');
  lines.push(`- Privacy Policy: ${absoluteUrl('/privacy')}`);
  lines.push(`- Terms of Service: ${absoluteUrl('/terms')}`);
  lines.push('');

  return lines.join('\n');
}
