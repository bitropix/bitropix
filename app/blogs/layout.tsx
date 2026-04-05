import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Bitropix | Tech Insights & Digital Marketing Tips',
  description:
    'Stay updated with the latest insights on technology, digital transformation, software development, SEO, cloud computing, and industry trends from Bitropix experts.',
  keywords: [
    'tech blog',
    'web development blog',
    'digital marketing insights',
    'cloud computing',
    'AI ML',
    'UX design trends',
    'software development tips',
  ],
  alternates: {
    canonical: 'https://www.bitropix.com/blogs',
  },
  openGraph: {
    title: 'Blog - Bitropix | Tech Insights & Industry Updates',
    description:
      'Stay updated with the latest insights on technology, digital transformation, software development, and industry trends from Bitropix experts.',
    url: 'https://www.bitropix.com/blogs',
    type: 'website',
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
