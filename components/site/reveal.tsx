'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef, type ElementType, type ReactNode } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Word-by-word masked reveal for headings. Text stays in the server HTML
 * (SEO + no layout shift); only the transform animates.
 */
export function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll-into-view (use above the fold). */
  immediate?: boolean;
}) {
  const words = text.split(' ');

  // Above the fold: pure CSS so the words rise on first paint, before hydration (LCP).
  if (immediate) {
    return (
      <Tag className={className}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="inline">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top -mb-[0.08em]">
              <span
                className="enter-rise will-change-transform"
                style={{ ['--delay' as string]: `${Math.round((delay + i * stagger) * 1000)}ms` }}
              >
                {w}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            </span>
          ))}
        </span>
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top -mb-[0.08em]">
            <motion.span
              className="inline-block will-change-transform"
              variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.9, ease: EASE } } }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/** Fade + rise on scroll into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'section' | 'article' | 'p' | 'span';
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Staggered group: children marked with <RevealItem> animate in sequence. */
export function RevealGroup({
  children,
  className = '',
  stagger = 0.08,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul' | 'ol';
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
      }}
    >
      {children}
    </Comp>
  );
}

/** Horizontal line that draws itself in. */
export function DrawLine({ className = '' }: { className?: string }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px origin-left bg-line-strong ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: EASE }}
    />
  );
}

function ScrollWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.4, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{' '}
    </motion.span>
  );
}

/** Large statement whose words light up as the reader scrolls through it. */
export function ScrollText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const reduce = useReducedMotion();
  const words = text.split(' ');
  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <ScrollWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}
