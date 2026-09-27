'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { imagePlaceholders } from '@/lib/image-placeholders';

/**
 * ssr     – server HTML / before hydration: the real image is visible over the blurred
 *           placeholder, so it paints in progressively as bytes arrive, with zero JS dependency.
 * lqip    – hydrated while still loading: only the blurred ~16px placeholder shows
 * preview – the ~96px low-quality version arrived, lightly blurred
 * full    – the real image, sharpened in (blur -> crisp)
 */
type Stage = 'ssr' | 'lqip' | 'preview' | 'full';

const isLoaded = (img: HTMLImageElement | null) => !!img && img.complete && img.naturalWidth > 0;

/**
 * Progressive "blur-up" image. Drop-in for next/image with `fill` (the parent must be
 * positioned, as with next/image). Cached images go straight to sharp, so repeat visits
 * never replay the effect.
 */
export function SmartImage({
  src,
  alt,
  className = '',
  sizes,
  priority,
  quality = 78,
  fill: _fill, // always fill; pulled out so it isn't passed twice
  ...rest
}: ImageProps & { fill: true }) {
  const lqip = imagePlaceholders[typeof src === 'string' ? src : ''];
  const fullRef = useRef<HTMLImageElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const [stage, setStage] = useState<Stage>('ssr');

  // On hydration: already decoded -> stay sharp; otherwise take over with the blur-up sequence.
  useEffect(() => {
    if (isLoaded(fullRef.current)) setStage('full');
    else setStage(isLoaded(previewRef.current) ? 'preview' : 'lqip');
  }, []);

  const fullVisible = stage === 'ssr' || stage === 'full';

  return (
    <>
      {lqip && (
        <span
          aria-hidden="true"
          className="smart-img-layer smart-img-lqip"
          style={{ backgroundImage: `url(${lqip})`, opacity: stage === 'full' ? 0 : 1 }}
        />
      )}

      {stage !== 'full' && (
        <span aria-hidden="true" className="smart-img-layer" style={{ opacity: stage === 'preview' ? 1 : 0, filter: 'blur(6px)' }}>
          <Image
            ref={previewRef}
            src={src}
            alt=""
            fill
            sizes="96px"
            quality={35}
            className={className}
            onLoad={() => setStage((s) => (s === 'lqip' ? 'preview' : s))}
          />
        </span>
      )}

      <span
        className="smart-img-layer"
        style={{
          opacity: fullVisible ? 1 : 0,
          filter: fullVisible ? 'blur(0px)' : 'blur(14px)',
          transform: fullVisible ? 'scale(1)' : 'scale(1.03)',
        }}
      >
        <Image
          ref={fullRef}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={className}
          onLoad={() => setStage('full')}
          {...rest}
        />
      </span>
    </>
  );
}
