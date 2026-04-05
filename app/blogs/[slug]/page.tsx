import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2, Tag, ChevronRight } from 'lucide-react';
import { blogPosts, getBlogBySlug, getRelatedPosts, categories } from '@/lib/blog-data';
import type { Metadata } from 'next';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animate';

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
      title: 'Post Not Found | Bitropix Blog',
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

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = `https://www.bitropix.com/blogs/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1 text-sm text-gray-400">
        <Share2 className="h-4 w-4" /> Share:
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#111119] text-white transition-colors hover:border-[#E03B37]/30 hover:bg-[#E03B37]/10"
        aria-label="Share on X (Twitter)"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#111119] text-white transition-colors hover:border-[#E03B37]/30 hover:bg-[#E03B37]/10"
        aria-label="Share on LinkedIn"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#111119] text-white transition-colors hover:border-[#E03B37]/30 hover:bg-[#E03B37]/10"
        aria-label="Share on Facebook"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  // Find previous and next posts for navigation
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
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bitropix',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.bitropix.com/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.bitropix.com/blogs/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.bitropix.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.bitropix.com/blogs',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.bitropix.com/blogs/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="pt-16">
        {/* Breadcrumb */}
        <nav className="border-b border-white/10" aria-label="Breadcrumb">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <ol className="flex items-center gap-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="transition-colors hover:text-[#E03B37]">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link href="/blogs" className="transition-colors hover:text-[#E03B37]">
                  Blog
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="line-clamp-1 font-medium text-white">{post.title}</li>
            </ol>
          </div>
        </nav>

        {/* Article Header */}
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <FadeIn>
            <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                <Badge variant="secondary" className="border border-[#E03B37]/20 bg-[#E03B37]/10 text-[#E03B37]">
                  {post.category}
                </Badge>
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="border-white/10 text-gray-400">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="mb-6 text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">{post.title}</h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">{post.excerpt}</p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" /> {post.author}
                </span>
                <time className="flex items-center gap-2" dateTime={post.date}>
                  <Calendar className="h-4 w-4" /> {post.date}
                </time>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {post.readTime}
                </span>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Featured Image */}
        <FadeIn>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-video overflow-hidden rounded">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </div>
        </FadeIn>

        {/* Article Content + Sidebar */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Content */}
              <article className="lg:col-span-2">
                <div
                  className="prose prose-lg prose-invert max-w-none [&_code]:rounded [&_code]:bg-[#E03B37]/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-[#E03B37] [&_strong]:font-semibold [&_strong]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-white [&>p]:mb-4 [&>p]:text-base [&>p]:leading-relaxed [&>p]:text-gray-400 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>ul]:text-gray-400 [&>ul>li]:leading-relaxed [&>ul>li]:text-gray-400"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                <div className="mt-12 border-t border-white/10 pt-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <Tag className="h-5 w-5 text-gray-400" />
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-white/10 text-gray-400 transition-colors hover:border-[#E03B37]/30 hover:bg-[#E03B37]/10"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-8 border-t border-white/10 pt-8">
                  <ShareButtons title={post.title} slug={post.slug} />
                </div>

                {/* Author Info */}
                <div className="mt-8 rounded border border-white/10 bg-[#111119] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E03B37]/10 text-xl font-bold text-[#E03B37]">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{post.author}</h3>
                      <p className="mb-2 text-sm font-medium text-[#E03B37]">{post.authorRole}</p>
                      <p className="text-sm leading-relaxed text-gray-400">
                        {post.author} is a member of the Bitropix team, contributing insights on{' '}
                        {post.category.toLowerCase()} and related topics. With deep industry experience, they help
                        businesses navigate technology challenges and drive innovation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Post Navigation */}
                <div className="mt-8 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
                  {prevPost ? (
                    <Link href={`/blogs/${prevPost.slug}`} className="group">
                      <Card className="h-full border-white/10 bg-[#111119] transition-all duration-300 hover:border-[#E03B37]/30">
                        <CardContent className="p-5">
                          <span className="mb-2 flex items-center gap-1 text-xs text-gray-400">
                            <ArrowLeft className="h-3 w-3" /> Previous Article
                          </span>
                          <p className="line-clamp-2 text-sm font-medium text-white transition-colors group-hover:text-[#E03B37]">
                            {prevPost.title}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost && (
                    <Link href={`/blogs/${nextPost.slug}`} className="group">
                      <Card className="h-full border-white/10 bg-[#111119] transition-all duration-300 hover:border-[#E03B37]/30">
                        <CardContent className="p-5 text-right">
                          <span className="mb-2 flex items-center justify-end gap-1 text-xs text-gray-400">
                            Next Article <ArrowRight className="h-3 w-3" />
                          </span>
                          <p className="line-clamp-2 text-sm font-medium text-white transition-colors group-hover:text-[#E03B37]">
                            {nextPost.title}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  )}
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <FadeIn delay={0.2}>
                  <div className="sticky top-24 space-y-8">
                    {/* Categories */}
                    <Card className="border-white/10 bg-[#111119]">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">Categories</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {categories
                            .filter((c) => c !== 'All')
                            .map((category) => (
                              <li key={category}>
                                <Link
                                  href="/blogs"
                                  className="flex items-center justify-between py-1.5 text-sm text-gray-400 transition-colors hover:text-[#E03B37]"
                                >
                                  <span>{category}</span>
                                  <ChevronRight className="h-4 w-4" />
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                      <Card className="border-white/10 bg-[#111119]">
                        <CardHeader>
                          <CardTitle className="text-lg text-white">Related Articles</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-4">
                            {relatedPosts.map((related) => (
                              <li key={related.id}>
                                <Link href={`/blogs/${related.slug}`} className="group flex gap-3">
                                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded">
                                    <Image
                                      src={related.image}
                                      alt={related.title}
                                      fill
                                      className="object-cover opacity-70 transition-opacity group-hover:opacity-90"
                                      sizes="80px"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="line-clamp-2 text-sm font-medium text-white transition-colors group-hover:text-[#E03B37]">
                                      {related.title}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">{related.date}</p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {/* Newsletter CTA */}
                    <Card className="border border-[#E03B37]/20 bg-[#E03B37]/5">
                      <CardContent className="p-6">
                        <h3 className="mb-2 font-bold text-white">Stay Updated</h3>
                        <p className="mb-4 text-sm text-gray-400">
                          Get the latest insights delivered to your inbox. No spam, just quality content.
                        </p>
                        <Link href="/blogs">
                          <Button className="w-full" size="sm">
                            Subscribe to Newsletter
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </FadeIn>
              </aside>
            </div>
          </div>
        </section>

        {/* Read Next Section */}
        <section className="border-t border-white/10 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-white">Read Next</h2>
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 3)
                .map((readNext) => (
                  <StaggerItem key={readNext.id}>
                    <Link href={`/blogs/${readNext.slug}`} className="group">
                      <Card className="h-full overflow-hidden border-white/10 bg-[#111119] transition-all duration-300 hover:border-[#E03B37]/30 hover:shadow-lg hover:shadow-[#E03B37]/5">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={readNext.image}
                            alt={readNext.title}
                            fill
                            className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="mb-3 flex items-center gap-2">
                            <span className="rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-2 py-1 text-xs font-medium text-[#E03B37]">
                              {readNext.category}
                            </span>
                          </div>
                          <h3 className="mb-2 line-clamp-2 font-bold text-white transition-colors group-hover:text-[#E03B37]">
                            {readNext.title}
                          </h3>
                          <p className="mb-4 line-clamp-2 text-sm text-gray-400">{readNext.excerpt}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {readNext.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {readNext.readTime}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </StaggerItem>
                ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
