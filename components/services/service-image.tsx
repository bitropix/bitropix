'use client';

import { SmartImage } from '@/components/site/smart-image';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Image that wipes open with a clip-path as it scrolls into view, settles
 * from a slight zoom, then scales gently on hover.
 */
export function ServiceImage({ src, alt, from = 'bottom' }: { src: string; alt: string; from?: 'bottom' | 'left' | 'right' }) {
  const hidden =
    from === 'left' ? 'inset(0% 100% 0% 0%)' : from === 'right' ? 'inset(0% 0% 0% 100%)' : 'inset(100% 0% 0% 0%)';

  return (
    <motion.div
      className="group relative aspect-[4/5] overflow-hidden border border-line bg-ink-2"
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.3, ease: EASE }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-12% 0px' }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <SmartImage
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent"
        aria-hidden="true"
      />
      <span className="absolute top-0 right-0 h-3 w-3 bg-brand" aria-hidden="true" />
    </motion.div>
  );
}
