export type JobOpening = {
  id: number;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  skills: string[];
  description: string;
};

export const jobOpenings: JobOpening[] = [
  {
    id: 2,
    slug: 'full-stack-developer',
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    experience: '3-5 years',
    skills: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
    description: 'Join our team to work on end-to-end development of our product suite and client projects.',
  },
  {
    id: 5,
    slug: 'flutter-developer',
    title: 'Flutter Developer',
    department: 'Mobile',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    experience: '2-4 years',
    skills: ['Flutter', 'Dart', 'Firebase', 'REST APIs'],
    description: 'Build cross-platform mobile applications with beautiful UI and seamless performance.',
  },
  {
    id: 3,
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Bangalore',
    type: 'Full-time',
    experience: '3-5 years',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    description: 'Create beautiful, user-centered designs that solve complex problems and delight users.',
  },
];

export function getJobBySlug(slug: string): JobOpening | undefined {
  return jobOpenings.find((job) => job.slug === slug);
}
