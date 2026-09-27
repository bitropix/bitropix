'use client';

import { SmartImage } from '@/components/site/smart-image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Case-study hero image: opens with a clip reveal, then drifts with scroll. */
export function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <motion.div
      ref={ref}
      className="border-line bg-ink-2 relative aspect-[4/3] overflow-hidden border sm:aspect-[16/9]"
      initial={reduce ? false : { clipPath: 'inset(6% 6% 6% 6%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
    >
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -top-[7%] -bottom-[7%]">
        <SmartImage
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1408px) 100vw, 1408px"
          className="object-cover object-top"
        />
      </motion.div>
    </motion.div>
  );
}
