import Link from 'next/link';
import { SmartImage } from '@/components/site/smart-image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts, getBlogBySlug, getRelatedPosts, formatBlogDate } from '@/lib/blog-data';
import { Eyebrow, ButtonLink } from '@/components/site/ui';
import { SplitText, Reveal, RevealGroup, RevealItem } from '@/components/site/reveal';
import { BlogCard } from '@/components/blog/blog-card';
import { toCardPost } from '@/components/blog/card-post';
import { ShareLinks } from '@/components/blog/share-links';
import { ReadingProgress } from '@/components/blog/reading-progress';
import { ProjectCta } from '@/components/blog/project-cta';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://www.bitropix.com/blogs/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `https://www.bitropix.com${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [`https://www.bitropix.com${post.image}`],
    },
    alternates: {
      canonical: `https://www.bitropix.com/blogs/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const url = `https://www.bitropix.com/blogs/${post.slug}`;
  const displayDate = formatBlogDate(post.date);

  // Related by category/tag first, then topped up with other recent posts.
  const related = getRelatedPosts(post.slug, post.category);
  const keepReading = [
    ...related,
    ...blogPosts.filter((p) => p.slug !== post.slug && !related.some((r) => r.slug === p.slug)),
  ].slice(0, 3);

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: `https://www.bitropix.com${post.image}`,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bitropix',
      logo: { '@type': 'ImageObject', url: 'https://www.bitropix.com/images/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.tags.join(', '),
    wordCount: post.content
      .replace(/<[^>]*>/g, ' ')
      .split(/\s+/)
      .filter(Boolean).length,
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bitropix.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.bitropix.com/blogs' },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  const meta = [
    { label: 'Written by', value: post.author, sub: post.authorRole },
    { label: 'Published', value: <time dateTime={post.date}>{displayDate}</time> },
    { label: 'Reading time', value: post.readTime },
    { label: 'Topic', value: post.category },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main>
        {/* Article header */}
        <header className="relative overflow-hidden pt-[calc(var(--nav-h)+3rem)]">
          <div
            className="bg-pixel-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]"
            aria-hidden="true"
          />
          <div className="container-x relative flex min-h-[calc(100svh-var(--nav-h)-3rem)] flex-col pb-10">
            <nav aria-label="Breadcrumb">
              <ol className="eyebrow flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="link-line hover:text-paper">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href="/blogs" className="link-line hover:text-paper">
                    Blog
                  </Link>
                </li>
                <li className="flex min-w-0 items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <span className="text-paper max-w-[28ch] truncate sm:max-w-[48ch]" aria-current="page">
                    {post.title}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="my-auto py-12">
            <div className="enter-fade mb-8 flex flex-wrap items-center gap-3">
              <span className="tag tag-brand">{post.category}</span>
              <span className="eyebrow">{post.readTime}</span>
            </div>

            <SplitText
              as="h1"
              immediate
              stagger={0.035}
              text={post.title}
              className="font-display text-paper block max-w-[22ch] text-[clamp(2.5rem,5.6vw,5.25rem)] leading-[0.98] font-semibold"
            />

            <div className="enter-fade mt-10 max-w-3xl" style={{ ['--delay' as string]: '250ms' }}>
              <p className="text-paper-dim text-lg leading-relaxed sm:text-xl">{post.excerpt}</p>
            </div>
            </div>

            <div className="enter-fade" style={{ ['--delay' as string]: '350ms' }}>
              <dl className="border-line grid grid-cols-2 border-t border-l lg:grid-cols-4">
                {meta.map((m) => (
                  <div key={m.label} className="border-line border-r border-b p-5 sm:p-6">
                    <dt className="eyebrow">{m.label}</dt>
                    <dd className="text-paper mt-2">
                      {m.value}
                      {m.sub && <span className="text-mute block text-sm">{m.sub}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="container-x relative mt-4 lg:mt-10">
            <div className="border-line bg-ink-3 relative aspect-[16/10] overflow-hidden border sm:aspect-[21/9]">
              <SmartImage
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1408px) 100vw, 1408px"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        {/* Body */}
        <section className="py-16 sm:py-24">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-3" aria-label="Article tools">
              <div className="space-y-10 lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
                <ReadingProgress targetId="article-body" />
                <div>
                  <p className="eyebrow mb-4">Share</p>
                  <ShareLinks title={post.title} url={url} />
                </div>
                <Link
                  href="/blogs"
                  className="eyebrow group text-paper-dim hover:text-paper hidden items-center gap-2 transition-colors lg:inline-flex"
                >
                  <ArrowLeft
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                  All articles
                </Link>
              </div>
            </aside>

            <article id="article-body" className="min-w-0 lg:col-span-8 lg:col-start-5">
              {/* post.content is trusted, author-controlled static HTML from lib/blog-data.ts */}
              <div className="prose-bx max-w-[68ch]" dangerouslySetInnerHTML={{ __html: post.content }} />

              <div className="border-line mt-16 max-w-[68ch] border-t pt-8">
                <p className="eyebrow mb-4">Tagged</p>
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-line bg-ink-2 mt-10 flex max-w-[68ch] gap-5 border p-6 sm:p-8">
                <span
                  className="font-display bg-brand grid h-14 w-14 shrink-0 place-items-center text-2xl font-semibold text-ink"
                  aria-hidden="true"
                >
                  {post.author.charAt(0)}
                </span>
                <div>
                  <p className="eyebrow">About the author</p>
                  <p className="text-paper mt-2 text-lg font-medium">{post.author}</p>
                  <p className="text-brand text-sm">{post.authorRole}</p>
                  <p className="text-paper-dim mt-3 text-sm leading-relaxed">
                    {post.author} is part of the Bitropix team and writes about {post.category.toLowerCase()} and
                    related topics, drawing on hands-on work with clients.
                  </p>
                </div>
              </div>

              {(prevPost || nextPost) && (
                <nav
                  aria-label="More articles"
                  className="border-line mt-10 grid max-w-[68ch] border-t border-l sm:grid-cols-2"
                >
                  {prevPost ? (
                    <Link href={`/blogs/${prevPost.slug}`} className="group border-line relative border-r border-b p-6">
                      <span
                        className="bg-ink-2 absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                        aria-hidden="true"
                      />
                      <span className="eyebrow relative flex items-center gap-2">
                        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Previous
                      </span>
                      <span className="text-paper group-hover:text-brand relative mt-3 line-clamp-2 block font-medium transition-colors">
                        {prevPost.title}
                      </span>
                    </Link>
                  ) : (
                    <span className="border-line hidden border-r border-b sm:block" aria-hidden="true" />
                  )}
                  {nextPost ? (
                    <Link
                      href={`/blogs/${nextPost.slug}`}
                      className="group border-line relative border-r border-b p-6 sm:text-right"
                    >
                      <span
                        className="bg-ink-2 absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                        aria-hidden="true"
                      />
                      <span className="eyebrow relative flex items-center gap-2 sm:justify-end">
                        Next <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-paper group-hover:text-brand relative mt-3 line-clamp-2 block font-medium transition-colors">
                        {nextPost.title}
                      </span>
                    </Link>
                  ) : (
                    <span className="border-line hidden border-r border-b sm:block" aria-hidden="true" />
                  )}
                </nav>
              )}
            </article>
          </div>
        </section>

        {/* Keep reading */}
        <section className="border-line border-t py-24 sm:py-32">
          <div className="container-x relative">
            <Eyebrow rule index="01" className="mb-12">
              Keep reading
            </Eyebrow>
            <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <SplitText
                  as="h2"
                  text="More from the journal."
                  className="font-display text-paper block text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-semibold"
                />
              </div>
              <Reveal>
                <ButtonLink href="/blogs" variant="ghost">
                  All articles
                </ButtonLink>
              </Reveal>
            </div>
            <RevealGroup as="ul" className="border-line grid border-t border-l md:grid-cols-2 lg:grid-cols-3">
              {keepReading.map((p) => (
                <RevealItem key={p.id} as="li" className="h-full">
                  <BlogCard post={toCardPost(p)} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <ProjectCta />
      </main>
    </>
  );
}
