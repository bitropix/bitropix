'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowRight, Tag, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { blogPosts, categories, getFeaturedPost } from '@/lib/blog-data';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animate';
import { BreadcrumbNav } from '@/components/breadcrumb-nav';

const featuredPost = getFeaturedPost();

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPosts = useMemo(() => {
    const posts =
      activeCategory === 'All'
        ? blogPosts.filter((p) => p.id !== featuredPost.id)
        : blogPosts.filter((p) => p.category === activeCategory && p.id !== featuredPost.id);
    return posts;
  }, [activeCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

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
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.bitropix.com/images/logo.png',
      },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingSchema) }} />
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="absolute top-20 right-20 h-75 w-75 rounded-full bg-[#E03B37]/10 blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <BreadcrumbNav items={[{ label: 'Blog' }]} />
            <FadeIn>
              <p className="mb-2 font-semibold text-[#E03B37]">Our Blog</p>
              <h1 className="mb-6 text-4xl font-bold text-balance text-white sm:text-5xl">Insights & Tech Stories</h1>
              <p className="mx-auto max-w-3xl text-lg text-gray-400">
                Stay updated with the latest in technology, digital marketing, cloud computing, and best practices from
                our team of experts.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b border-white/10 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setVisibleCount(6);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-[#E03B37] text-white shadow-lg shadow-[#E03B37]/25'
                      : 'border border-white/10 bg-[#111119] text-gray-300 hover:border-[#E03B37]/30 hover:bg-[#E03B37]/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article - only show when "All" is selected */}
        {activeCategory === 'All' && (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-8 text-2xl font-bold text-white">Featured Article</h2>
              <ScaleIn>
                <Link href={`/blogs/${featuredPost.slug}`} className="group block">
                  <Card className="overflow-hidden border-white/10 bg-[#111119] transition-all duration-300 hover:border-[#E03B37]/30 hover:shadow-lg hover:shadow-[#E03B37]/5">
                    <div className="grid md:grid-cols-2">
                      <div className="relative aspect-video overflow-hidden md:aspect-auto md:min-h-87.5">
                        <Image
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          fill
                          className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <CardContent className="flex flex-col justify-center p-8">
                        <div className="mb-4 flex items-center gap-2">
                          <Tag className="h-4 w-4 text-[#E03B37]" />
                          <span className="text-sm font-medium text-[#E03B37]">{featuredPost.category}</span>
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-white transition-colors group-hover:text-[#E03B37]">
                          {featuredPost.title}
                        </h3>
                        <p className="mb-6 leading-relaxed text-gray-400">{featuredPost.excerpt}</p>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" /> {featuredPost.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" /> {featuredPost.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" /> {featuredPost.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </ScaleIn>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-[#0e0e18]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-white">
              {activeCategory === 'All' ? 'Latest Articles' : `${activeCategory} Articles`}
            </h2>

            {visiblePosts.length === 0 ? (
              <div className="py-20 text-center">
                <Search className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="text-lg text-gray-400">No articles found in this category yet.</p>
                <Button variant="outline" className="mt-4" onClick={() => setActiveCategory('All')}>
                  View All Articles
                </Button>
              </div>
            ) : (
              <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
                  <StaggerItem key={post.id}>
                    <Link href={`/blogs/${post.slug}`} className="group">
                      <Card className="h-full overflow-hidden border-white/10 bg-[#111119] transition-all duration-300 hover:border-[#E03B37]/30 hover:shadow-lg hover:shadow-[#E03B37]/5">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="mb-3 flex items-center gap-2">
                            <span className="rounded-full border border-[#E03B37]/20 bg-[#E03B37]/10 px-2 py-1 text-xs font-medium text-[#E03B37]">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="mb-2 line-clamp-2 font-bold text-white transition-colors group-hover:text-[#E03B37]">
                            {post.title}
                          </h3>
                          <p className="mb-4 line-clamp-2 text-sm text-gray-400">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {post.readTime}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}

            {hasMore && (
              <div className="mt-12 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="border-white/10 bg-transparent transition-all duration-300 hover:border-[#E03B37]/50 hover:bg-[#E03B37]/5"
                >
                  Load More Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-linear-to-r from-[#E03B37] via-[#E03B37]/90 to-[#c62828]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-size-[30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Subscribe to Our Newsletter</h2>
            <p className="mx-auto mb-8 max-w-2xl text-white/80">
              Get the latest insights, tutorials, and industry updates delivered directly to your inbox.
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded border-0 bg-[#0a0a12] px-4 py-3 text-white focus:ring-2 focus:ring-[#0a0a12]"
              />
              <Button type="submit" className="bg-white text-[#0a0a12] transition-all hover:bg-white/90">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
