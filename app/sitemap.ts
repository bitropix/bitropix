import type { MetadataRoute } from 'next';
import { jobOpenings } from '@/lib/careers';
import { blogPosts } from '@/lib/blog-data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bitropix.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const careerRoleUrls: MetadataRoute.Sitemap = jobOpenings.map((job) => ({
    url: `${SITE_URL}/careers/${job.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.65,
  }));

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/careers`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/sitemap-html`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    ...blogUrls,
    ...careerRoleUrls,
  ];
}
