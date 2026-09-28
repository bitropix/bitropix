'use client';

import { SmartImage } from '@/components/site/smart-image';
import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Wide image that drifts slower than the page while scrolling. The image is
 * oversized vertically so the drift never exposes an edge.
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  /** Overlay content (badges, captions) rendered above the image. */
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-10%', '10%']);

  return (
    <div ref={ref} className={`relative overflow-hidden border border-line bg-ink-2 ${className}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[12%] -bottom-[12%] will-change-transform">
        <SmartImage src={src} alt={alt} fill sizes="(min-width: 1408px) 1312px, 100vw" className="object-cover" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent" aria-hidden="true" />
      {children}
    </div>
  );
}
