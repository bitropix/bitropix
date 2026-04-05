'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Spinning ring 1 - large, slow */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/3"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      {/* Spinning ring 2 - medium, opposite */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/4"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      />

      {/* Spinning ring 3 - small */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E03B37]/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Orbiting dot 1 */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#E03B37]/60 shadow-[0_0_15px_rgba(224,59,55,0.4)]" />
      </motion.div>

      {/* Orbiting dot 2 */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/30" />
      </motion.div>

      {/* Orbiting dot 3 */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-87.5 w-87.5 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#E03B37]/40" />
      </motion.div>

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-[-15%] left-[-5%] h-150 w-150 rounded-full bg-[#E03B37]/12 blur-[120px]"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-10%] bottom-[-10%] h-125 w-125 rounded-full bg-[#E03B37]/8 blur-[120px]"
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/20"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[60px_60px]" />

      {/* Content */}
      <div
        className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-5 text-center transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <h1 className="text-[clamp(2.75rem,8vw,4.75rem)] leading-[1.15] font-bold tracking-tight text-white">
          Innovate. Transform. <span className="text-[#E03B37]">Deliver.</span>
        </h1>

        <p className="mt-4 max-w-2xl text-[clamp(1.275rem,2.5vw,1.525rem)] leading-relaxed text-gray-400">
          IT services &amp; digital marketing agency helping businesses grow with technology and strategy.
        </p>

        <div className="mt-8 flex flex-wrap-reverse justify-center gap-3">
          <Button
            size="lg"
            asChild
            className="h-11 bg-[#E03B37] px-6 text-sm font-medium text-white hover:bg-[#E03B37]/90"
          >
            <Link href="/contact" className='flex items-center justify-center'>
              <span>Get Free Consultation</span> <ArrowRight className="h-5 w-5 mt-0.5" />
            </Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="h-11 bg-transparent border border-[#E03B37] hover:bg-[#E03B37] px-6 text-sm font-medium text-white"
          >
            <Link href="/services">Our Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
