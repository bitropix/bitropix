import Link from 'next/link';
import { SmartImage } from '@/components/site/smart-image';
import { blogPosts, categories, getFeaturedPost, formatBlogDate } from '@/lib/blog-data';
import { PageHero } from '@/components/site/page-hero';
import { Eyebrow } from '@/components/site/ui';
import { SplitText, Reveal } from '@/components/site/reveal';
import { BlogIndex } from '@/components/blog/blog-index';
import { toCardPost } from '@/components/blog/card-post';
import { ProjectCta } from '@/components/blog/project-cta';

// Metadata for /blogs lives in ./layout.tsx.

const featured = getFeaturedPost();

const categoryCounts = categories
  .filter((c) => c !== 'All')
  .map((name) => ({ name, count: blogPosts.filter((p) => p.category === name).length }))
  .filter((c) => c.count > 0);

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bitropix.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.bitropix.com/blogs' },
  ],
};

const blogListingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Bitropix Blog',
  description:
    'Stay updated with the latest insights on technology, digital transformation, software development, and industry trends from Bitropix experts.',
  url: 'https://www.bitropix.com/blogs',
  publisher: {
    '@type': 'Organization',
    name: 'Bitropix',
    logo: { '@type': 'ImageObject', url: 'https://www.bitropix.com/images/logo.png' },
  },
};

export default function BlogsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }} />
      <main>
        <PageHero
          title="Notes from the studio."
          crumbs={[{ label: 'Blog' }]}
          description="Field notes on engineering, design, cloud and growth. Written by the people who ship the work, for teams deciding what to build next."
          aside={
            <dl className="border-line grid grid-cols-2 border-t border-l">
              <div className="border-line border-r border-b p-5 sm:p-6">
                <dt className="eyebrow">Articles</dt>
                <dd className="font-display text-paper mt-3 text-5xl leading-none font-semibold">
                  {String(blogPosts.length).padStart(2, '0')}
                </dd>
              </div>
              <div className="border-line border-r border-b p-5 sm:p-6">
                <dt className="eyebrow">Topics</dt>
                <dd className="font-display text-paper mt-3 text-5xl leading-none font-semibold">
                  {String(categoryCounts.length).padStart(2, '0')}
                </dd>
              </div>
            </dl>
          }
        />

        {/* Featured story */}
        <section className="py-16 sm:py-24" aria-labelledby="featured-title">
          <div className="container-x relative">
            <Eyebrow rule index="01" className="mb-12">
              Featured story
            </Eyebrow>
            <Reveal>
              <Link
                href={`/blogs/${featured.slug}`}
                className="group border-line bg-ink-2 grid border lg:grid-cols-12"
                data-cursor="Read"
              >
                <div className="bg-ink-3 relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[34rem]">
                  <SmartImage
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <span className="eyebrow bg-ink/80 text-paper absolute top-4 left-4 px-2 py-1 backdrop-blur">
                    Start here
                  </span>
                </div>
                <div className="flex flex-col justify-between gap-10 p-6 sm:p-10 lg:col-span-5">
                  <div>
                    <div className="mb-8 flex flex-wrap gap-2">
                      <span className="tag tag-brand">{featured.category}</span>
                      <span className="tag">{featured.readTime}</span>
                    </div>
                    <h2
                      id="featured-title"
                      className="font-display text-paper group-hover:text-brand text-[clamp(2rem,3.6vw,3.5rem)] leading-[0.98] font-semibold transition-colors duration-300"
                    >
                      {featured.title}
                    </h2>
                    <p className="text-paper-dim mt-6 text-lg leading-relaxed">{featured.excerpt}</p>
                  </div>
                  <div className="border-line border-t pt-6">
                    <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-paper-dim">By {featured.author}</span>
                      <span className="bg-mute inline-block h-1 w-1" aria-hidden="true" />
                      <time dateTime={featured.date}>{formatBlogDate(featured.date)}</time>
                    </p>
                    <p className="text-paper mt-6 inline-flex items-center gap-3 text-sm font-medium">
                      <span className="link-line">Read the article</span>
                      <span className="bg-paper group-hover:bg-brand h-px w-10 transition-all duration-500 group-hover:w-16" />
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* All articles */}
        <section className="border-line border-t py-24 sm:py-32">
          <div className="container-x relative">
            <Eyebrow rule index="02" className="mb-12">
              The archive
            </Eyebrow>
            <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SplitText
                  as="h2"
                  text="Every article, by topic."
                  className="font-display text-paper block text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-semibold"
                />
              </div>
              <Reveal className="lg:col-span-4">
                <p className="text-paper-dim">
                  Practical guides and opinions from real projects. Pick a topic to narrow the list.
                </p>
              </Reveal>
            </div>

            <BlogIndex posts={blogPosts.map(toCardPost)} featuredId={featured.id} categories={categoryCounts} />
          </div>
        </section>

        <ProjectCta />
      </main>
    </>
  );
}
