'use client';

import { motion } from 'framer-motion';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface MilestonesSectionProps {
  milestones: Milestone[];
}

export function MilestonesSection({ milestones }: MilestonesSectionProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, margin: '-100px' }}
        >
          <p className="mb-2 font-semibold text-[#E03B37]">Our Journey</p>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Milestones We're Proud Of</h2>
        </motion.div>
        <div className="relative">
          <motion.div
            className="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform bg-linear-to-b from-[#E03B37]/50 via-white/10 to-[#E03B37]/50 md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            viewport={{ once: false, margin: '-100px' }}
            style={{ originY: 0 }}
          />
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={`${milestone.year}-${index}`}
                className={`flex flex-col items-center gap-8 md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: false, margin: '-100px' }}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <span className="text-lg font-bold text-[#E03B37]">{milestone.year}</span>
                  <h3 className="mt-1 text-xl font-semibold text-white">{milestone.title}</h3>
                  <p className="mt-2 text-gray-400">{milestone.description}</p>
                </div>
                <motion.div
                  className="relative z-10 h-4 w-4 shrink-0 rounded-full bg-linear-to-br from-[#E03B37] to-[#E03B37]/80 shadow-lg shadow-[#E03B37]/30"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                  viewport={{ once: false, margin: '-100px' }}
                />
                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
