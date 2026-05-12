export type JobSalary = {
  min: number;
  max: number;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  unit: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
};

export type JobOpening = {
  id: number;
  slug: string;
  title: string;
  department: string;
  /** Human-readable location string (e.g. "Bangalore / Remote") */
  location: string;
  /** ISO 3166-2 region code for the job location (e.g. "KA", "UP", "MH") */
  regionCode: string;
  /** City for addressLocality (e.g. "Bangalore"). Derived from location if absent. */
  city?: string;
  type: string;
  experience: string;
  skills: string[];
  description: string;
  /** ISO 8601 date the job was posted. Required for stable JobPosting schema. */
  postedAt: string;
  /** ISO 8601 date the posting expires. Defaults to 90 days from postedAt. */
  validThrough?: string;
  salary?: JobSalary;
};

export const jobOpenings: JobOpening[] = [
  {
    id: 2,
    slug: 'full-stack-developer',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Bangalore / Remote',
    regionCode: 'KA',
    city: 'Bangalore',
    type: 'Full-time',
    experience: '3-5 years',
    skills: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
    description: 'Join our team to work on end-to-end development of our product suite and client projects.',
    postedAt: '2026-05-01',
    salary: { min: 800000, max: 1800000, currency: 'INR', unit: 'YEAR' },
  },
  {
    id: 5,
    slug: 'flutter-developer',
    title: 'Flutter Developer',
    department: 'Mobile',
    location: 'Bangalore / Remote',
    regionCode: 'KA',
    city: 'Bangalore',
    type: 'Full-time',
    experience: '2-4 years',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
    description: 'Build cross-platform mobile applications with beautiful UI and seamless performance.',
    postedAt: '2026-05-01',
    salary: { min: 600000, max: 1400000, currency: 'INR', unit: 'YEAR' },
  },
  {
    id: 3,
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Bangalore',
    regionCode: 'KA',
    city: 'Bangalore',
    type: 'Full-time',
    experience: '3-5 years',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    description: 'Create beautiful, user-centered designs that solve complex problems and delight users.',
    postedAt: '2026-05-01',
    salary: { min: 700000, max: 1500000, currency: 'INR', unit: 'YEAR' },
  },
];

export function getJobBySlug(slug: string): JobOpening | undefined {
  return jobOpenings.find((job) => job.slug === slug);
}
