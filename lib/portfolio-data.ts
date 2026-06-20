export interface PortfolioProject {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  url: string;
  image: string;
  category: string;
  industry: string;
  services: string[];
  features: string[];
  techStack: string[];
  challenge: string;
  solution: string;
  results: string[];
  testimonial?: string;
  metaTitle: string;
  metaDescription: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 6,
    slug: 'bookurevents',
    title: 'BookUrEvents',
    tagline: 'We Craft Moments That Stay With You',
    description:
      'A premium portfolio and booking website for BookUrEvents, a luxury event planning and management company operating across India. The platform showcases their work across corporate events, luxury weddings, and private celebrations, and lets prospective clients explore services and request a consultation.',
    url: 'https://bookurevents.in/',
    image: '/images/portfolio/bookurevents.jpg',
    category: 'Events & Booking Platform',
    industry: 'Events & Entertainment',
    services: ['Web Development', 'UI/UX Design', 'SEO', 'Digital Marketing'],
    features: [
      'Service categories for corporate events, weddings & private celebrations',
      'Entertainment, catering, design & decor showcases',
      'Film, photography & live-streaming offerings',
      'Venue, logistics and production capabilities',
      'Curated portfolio of selected work',
      'Team profiles and brand storytelling',
      'Integrated inquiry & consultation booking form',
      'Elegant, image-led responsive design',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    challenge:
      'BookUrEvents needed a website that conveyed the luxury and craft of their events while making it effortless for high-intent clients to browse past work and start a conversation. The design had to feel premium and visual without sacrificing performance or clarity.',
    solution:
      'We built an elegant, image-led platform that organizes a wide range of event services into clear categories, highlights a curated portfolio of signature work, and guides visitors to a streamlined consultation booking form that turns interest into qualified leads.',
    results: [
      'Premium brand experience that matches the quality of their events',
      'Wide service range organized into clear, browsable categories',
      'Curated portfolio that builds trust with high-value clients',
      'Streamlined consultation booking to capture qualified leads',
    ],
    metaTitle: 'BookUrEvents - Luxury Events Platform Case Study',
    metaDescription:
      'How Bitropix built BookUrEvents, a premium portfolio and booking platform for a luxury event planning company spanning corporate events, weddings, and celebrations.',
  },
  {
    id: 1,
    slug: 'tourillo',
    title: 'Tourillo',
    tagline: 'Explore the World with Us',
    description:
      "A comprehensive travel platform offering curated tour packages across India - from the Himalayas to Kerala's backwaters. Tourillo connects travelers with unforgettable experiences through all-inclusive packages featuring hotels, transport, meals, and 24/7 expert consultation.",
    url: 'https://tourillo.com/',
    image: '/images/portfolio/tourillo.jpg',
    category: 'Web Application',
    industry: 'Travel & Tourism',
    services: ['Web Development', 'UI/UX Design', 'SEO', 'Digital Marketing'],
    features: [
      'Curated tour packages with flexible durations (2-12 days)',
      'Category-based browsing - Romantic, Religious, Adventure, Family, Nature, Hill Station',
      'All-inclusive packages with hotel, transport & meals',
      '24/7 destination expert consultation',
      'Verified traveler reviews with 5-star rating system',
      'Mobile-responsive design for on-the-go booking',
      'Dynamic promotional offers and seasonal deals',
      'Custom itinerary builder for personalized trips',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    challenge:
      'The client needed a modern, high-performance travel platform that could handle hundreds of tour packages with dynamic pricing, seasonal promotions, and an intuitive booking flow - all while maintaining lightning-fast page loads and top-tier SEO to compete in the crowded Indian travel market.',
    solution:
      'We built a server-rendered Next.js application with optimized image loading, structured data for rich search results, and a component-based architecture that makes adding new packages effortless. The platform features category-based filtering, verified reviews, and a streamlined consultation booking system that converts browsers into travelers.',
    results: [
      '1,000+ verified traveler reviews with 5/5 rating',
      '40% increase in organic search traffic within 3 months',
      '3x improvement in page load speed',
      'Seamless mobile experience driving 60% of total bookings',
    ],
    metaTitle: 'Tourillo - Travel Platform Case Study',
    metaDescription:
      'How Bitropix built Tourillo, a high-performance travel platform with curated tour packages across India. Next.js, React, and modern web technologies.',
  },
  {
    id: 2,
    slug: 'advanced-beauty',
    title: 'Advanced Beauty',
    tagline: 'We are the Solution to All Your Beauty Problems!',
    description:
      'A premium at-home salon service platform serving Noida, Greater Noida, and Delhi NCR. Advanced Beauty connects clients with 18+ professional beauty masters for bridal makeup, nail extensions, hair extensions, eyelash extensions, facials, and spa treatments - all delivered to your doorstep.',
    url: 'https://www.advancedbeauty.in/',
    image: '/images/portfolio/advanced-beauty.jpg',
    category: 'E-Commerce Platform',
    industry: 'Beauty & Wellness',
    services: ['Web Development', 'E-Commerce', 'UI/UX Design', 'Digital Marketing'],
    features: [
      'Complete e-commerce with cart, wishlist & checkout',
      'Service catalog with 265+ nail polish color options',
      'Bridal & pre-bridal makeup booking system',
      'At-home service scheduling for Delhi NCR',
      'Google-rated 4.9/5 review integration',
      'Social media integration (Instagram, Facebook, YouTube)',
      'Newsletter subscription for deals and updates',
      'Promotional campaign management with seasonal offers',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    challenge:
      'Advanced Beauty needed an elegant online presence that could showcase their premium beauty services while enabling seamless booking and e-commerce functionality. The platform had to convey luxury and trust while making it easy for clients in Delhi NCR to discover and book at-home beauty services.',
    solution:
      'We designed and developed a visually stunning e-commerce platform with an intuitive service catalog, real-time booking system, and integrated payment processing. The site features rich imagery, client testimonials, and a smooth mobile-first experience that reflects the premium nature of their services.',
    results: [
      '4.9/5 Google rating from 186+ verified reviews',
      '18 professional beauty masters onboarded',
      '10+ years of founder expertise showcased effectively',
      '50% increase in online bookings after launch',
    ],
    metaTitle: 'Advanced Beauty - E-Commerce Platform Case Study',
    metaDescription:
      'How Bitropix built Advanced Beauty, a premium at-home salon booking platform for Delhi NCR with e-commerce, service catalog, and booking system.',
  },
  {
    id: 3,
    slug: 'beverly-agrovet',
    title: 'Beverly Agrovet',
    tagline: 'Power That Farmers Trust',
    description:
      'A professional corporate website for Beverly Agrovet, an agrochemical company with 25+ years of experience providing scientifically formulated crop protection solutions. The platform showcases their herbicides, fungicides, fertilizers, insecticides, bio-stimulants, and growth regulators to farmers worldwide.',
    url: 'https://www.beverlyagrovet.in/',
    image: '/images/portfolio/beverly-agrovet.jpg',
    category: 'Corporate Website',
    industry: 'Agriculture & Agrochemicals',
    services: ['Web Development', 'UI/UX Design', 'SEO', 'Brand Identity'],
    features: [
      'Product catalog with 6 major categories',
      'Detailed product pages with active ingredients & usage guides',
      'Eco-friendly & sustainable formulation highlights',
      'Quality assurance and testing protocol showcase',
      'Farmer testimonials and trust indicators',
      'Responsive design for field-level accessibility',
      'SEO-optimized for agricultural product searches',
      'Contact & inquiry system for bulk orders',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    challenge:
      'Beverly Agrovet required a modern digital presence that could effectively communicate their 25+ years of agrochemical expertise to farmers and agricultural professionals. The website needed to present complex product information in an accessible way while building trust and credibility in a traditionally offline industry.',
    solution:
      'We created a clean, professional corporate website with an organized product catalog featuring detailed information about each formulation. The site emphasizes trust signals - years of experience, quality assurance processes, and eco-friendly commitments - while providing easy navigation for farmers to find the right products for their crops.',
    results: [
      'Established strong digital presence in the agricultural sector',
      'Organized 25+ products across 6 categories with detailed info',
      'Improved brand credibility with professional online showcase',
      'Increased dealer and farmer inquiries through contact system',
    ],
    metaTitle: 'Beverly Agrovet - Corporate Website Case Study',
    metaDescription:
      "How Bitropix built Beverly Agrovet's corporate website showcasing 25+ years of agrochemical expertise with product catalogs and farmer-focused design.",
  },
  {
    id: 4,
    slug: 'dishaa-vertex',
    title: 'Dishaa Vertex Infra',
    tagline: 'Building the Future with Dishaa Vertex',
    description:
      'A premium corporate website for Dishaa Vertex Infra Pvt Ltd, a leading infrastructure development company with 15+ years of excellence. The platform showcases their construction, engineering, industrial projects, project management, and manpower supply services with a portfolio of 120+ completed projects.',
    url: 'https://www.dishaavertex.com/',
    image: '/images/portfolio/dishaa-vertex.jpg',
    category: 'Corporate Website',
    industry: 'Infrastructure & Construction',
    services: ['Web Development', 'UI/UX Design', 'SEO', 'Brand Identity'],
    features: [
      'Project showcase with Metropolitan Bridge, Smart City & more',
      'Service pages for 5 core business verticals',
      'Team showcase with 150+ expert profiles',
      'Company milestones and achievement timeline',
      'Four pillars branding - Innovation, Reliability, Quality, Excellence',
      'Project gallery with high-quality imagery',
      'SEO-optimized for infrastructure and construction searches',
      'Lead generation forms for project inquiries',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    challenge:
      'Dishaa Vertex Infra needed a website that matched the scale and professionalism of their infrastructure projects. The platform had to showcase 120+ completed projects, communicate their expertise across multiple service verticals, and generate qualified leads from potential clients seeking large-scale construction and engineering services.',
    solution:
      'We developed a visually impactful corporate website with a project showcase that highlights their most impressive builds - from metropolitan bridges to smart city developments. The site features a structured service presentation, team credentials, and strategic CTAs that convert visitors into qualified project inquiries.',
    results: [
      '120+ completed projects showcased effectively',
      '15+ years of excellence communicated through brand storytelling',
      '150+ team member profiles building client confidence',
      'Increased qualified project inquiries from digital channels',
    ],
    metaTitle: 'Dishaa Vertex Infra - Corporate Website Case Study',
    metaDescription:
      "How Bitropix built Dishaa Vertex Infra's premium corporate website showcasing 120+ infrastructure projects with modern design and SEO optimization.",
  },
  {
    id: 5,
    slug: 'proteam',
    title: 'PROTEAM Management Services',
    tagline: 'Excellence in Workforce & Facility Management',
    description:
      'A professional corporate website for PROTEAM Management Services Pvt. Ltd., a workforce solutions and facility management company serving corporate and industrial clients across India. The platform presents their manpower outsourcing, staffing, security, payroll, housekeeping, and skill development offerings to enterprise decision-makers.',
    url: 'https://www.proteamorg.com/',
    image: '/images/portfolio/proteam.jpg',
    category: 'Corporate Website',
    industry: 'Staffing & Facility Management',
    services: ['Web Development', 'UI/UX Design', 'SEO'],
    features: [
      'Service pages for contractual manpower & staffing solutions',
      'Security and housekeeping services showcase',
      'Payroll and compliance management offerings',
      'Skill development & training programs (B.Voc / D.Voc)',
      'Trust-building corporate profile and client section',
      'Mobile-responsive, accessible B2B design',
      'SEO-optimized for workforce and facility management searches',
      'Inquiry and contact system for enterprise clients',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    challenge:
      'PROTEAM needed a credible, professional online presence that could communicate a broad portfolio of workforce and facility management services to corporate and industrial clients, while building trust in a relationship-driven B2B industry.',
    solution:
      "We designed and developed a clean corporate website that organizes PROTEAM's services into clear, scannable sections, foregrounds trust signals and compliance credentials, and routes enterprise prospects toward a simple inquiry flow.",
    results: [
      'Unified six core service lines into one cohesive digital presence',
      'Strengthened brand credibility with corporate and industrial clients',
      'Improved discoverability for staffing and facility management searches',
      'Streamlined enterprise inquiries through a clear contact flow',
    ],
    metaTitle: 'PROTEAM Management Services - Corporate Website Case Study',
    metaDescription:
      'How Bitropix built the corporate website for PROTEAM Management Services, presenting manpower, staffing, security, payroll, and skill development services to enterprise clients.',
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}
