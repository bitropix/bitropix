import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';

export const metadata = {
  title: 'Blog - Bitropix | Tech Insights & Industry Updates',
  description:
    'Stay updated with the latest insights on technology, digital transformation, software development, and industry trends from Bitropix experts.',
};

const featuredPost = {
  id: 1,
  slug: 'digital-transformation-2024-guide',
  title: 'The Complete Guide to Digital Transformation in 2024',
  excerpt:
    'Digital transformation is no longer optional. Learn how to navigate the changing landscape and position your business for success in the digital age.',
  image: '/digital-transformation-concept-with-technology-ico.jpg',
  author: 'Rahul Verma',
  date: 'Dec 15, 2024',
  readTime: '10 min read',
  category: 'Digital Transformation',
};

const blogPosts = [
  {
    id: 2,
    slug: 'react-19-features',
    title: "React 19: What's New and How to Upgrade",
    excerpt:
      'Explore the latest features in React 19 and learn best practices for upgrading your existing applications.',
    image: '/react-programming-code.jpg',
    author: 'Vikram Patel',
    date: 'Dec 10, 2024',
    readTime: '8 min read',
    category: 'Development',
  },
  {
    id: 3,
    slug: 'cloud-cost-optimization',
    title: '10 Strategies to Reduce Your Cloud Costs by 40%',
    excerpt:
      'Cloud costs can spiral out of control quickly. Here are proven strategies to optimize your cloud spending.',
    image: '/cloud-computing-infrastructure.jpg',
    author: 'Ananya Singh',
    date: 'Dec 5, 2024',
    readTime: '7 min read',
    category: 'Cloud',
  },
  {
    id: 4,
    slug: 'ai-in-enterprise',
    title: 'Implementing AI in Enterprise: A Practical Roadmap',
    excerpt: 'Move beyond the hype. Learn how to practically implement AI solutions that deliver real business value.',
    image: '/artificial-intelligence-neural-network.jpg',
    author: 'Priya Sharma',
    date: 'Nov 28, 2024',
    readTime: '12 min read',
    category: 'AI & ML',
  },
  {
    id: 5,
    slug: 'microservices-best-practices',
    title: 'Microservices Architecture: Lessons from 50+ Projects',
    excerpt: "After implementing microservices for over 50 clients, here's what we've learned about doing it right.",
    image: '/microservices-architecture.png',
    author: 'Vikram Patel',
    date: 'Nov 20, 2024',
    readTime: '9 min read',
    category: 'Architecture',
  },
  {
    id: 6,
    slug: 'ux-design-trends-2025',
    title: 'UX Design Trends That Will Shape 2025',
    excerpt:
      'From AI-driven personalization to immersive experiences, discover the trends that will define UX in 2025.',
    image: '/modern-ux-design-interface.jpg',
    author: 'Ananya Singh',
    date: 'Nov 15, 2024',
    readTime: '6 min read',
    category: 'Design',
  },
  {
    id: 7,
    slug: 'devops-automation',
    title: 'Automating Your DevOps Pipeline: Complete Guide',
    excerpt: 'Learn how to build a fully automated CI/CD pipeline that improves deployment frequency and reliability.',
    image: '/devops-automation-pipeline.jpg',
    author: 'Rahul Verma',
    date: 'Nov 8, 2024',
    readTime: '11 min read',
    category: 'DevOps',
  },
];

const categories = ['All', 'Development', 'Cloud', 'AI & ML', 'Design', 'DevOps', 'Digital Transformation', 'Mobile'];

export default function BlogsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative overflow-hidden py-20">
          <div className="from-primary/10 via-background to-accent/5 absolute inset-0 bg-gradient-to-br" />
          <div className="bg-primary/10 absolute top-20 right-20 h-[300px] w-[300px] rounded-full blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-primary mb-2 font-semibold">Our Blog</p>
            <h1 className="text-foreground mb-6 text-4xl font-bold text-balance sm:text-5xl">
              Insights & Tech Stories
            </h1>
            <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
              Stay updated with the latest in technology, best practices, and insights from our team of experts.
            </p>
          </div>
        </section>

        <section className="border-border/50 border-b py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    index === 0
                      ? 'bg-primary text-primary-foreground shadow-primary/25 shadow-lg'
                      : 'bg-card/50 border-border/50 text-foreground hover:bg-primary/10 hover:border-primary/30 border'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-foreground mb-8 text-2xl font-bold">Featured Article</h2>
            <Link href={`/blogs/${featuredPost.slug}`} className="group block">
              <Card className="bg-card/30 border-border/50 hover:border-primary/30 hover:shadow-primary/5 overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-video overflow-hidden md:aspect-auto md:h-full">
                    <img
                      src={featuredPost.image || '/placeholder.svg'}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                    />
                  </div>
                  <CardContent className="flex flex-col justify-center p-8">
                    <div className="mb-4 flex items-center gap-2">
                      <Tag className="text-primary h-4 w-4" />
                      <span className="text-primary text-sm font-medium">{featuredPost.category}</span>
                    </div>
                    <h3 className="text-foreground group-hover:text-primary mb-4 text-2xl font-bold transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                    <div className="text-muted-foreground flex items-center gap-6 text-sm">
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
          </div>
        </section>

        <section className="relative overflow-hidden py-16">
          <div className="from-secondary/20 via-background to-background absolute inset-0 bg-gradient-to-b" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-foreground mb-8 text-2xl font-bold">Latest Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blogs/${post.slug}`} className="group">
                  <Card className="bg-card/30 border-border/50 hover:border-primary/30 hover:shadow-primary/5 h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image || '/placeholder.svg'}
                        alt={post.title}
                        className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-primary bg-primary/10 border-primary/20 rounded-full border px-2 py-1 text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 font-bold transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{post.excerpt}</p>
                      <div className="text-muted-foreground flex items-center justify-between text-xs">
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
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:border-primary/50 hover:bg-primary/5 bg-transparent transition-all duration-300"
              >
                Load More Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="from-primary via-primary/90 to-accent absolute inset-0 bg-gradient-to-r" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-primary-foreground mb-4 text-3xl font-bold sm:text-4xl">Subscribe to Our Newsletter</h2>
            <p className="text-primary-foreground/80 mx-auto mb-8 max-w-2xl">
              Get the latest insights, tutorials, and industry updates delivered directly to your inbox.
            </p>
            <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="focus:ring-background text-foreground bg-background flex-1 rounded border-0 px-4 py-3 focus:ring-2"
              />
              <Button type="submit" className="bg-foreground text-background hover:bg-foreground/90 transition-all">
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
