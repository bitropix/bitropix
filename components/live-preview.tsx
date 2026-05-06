'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const PREVIEW_WIDTH = 1440;
const PREVIEW_HEIGHT = 810;

interface LivePreviewProps {
  url: string;
  image: string;
  title: string;
  priority?: boolean;
  sizes?: string;
  imageClassName?: string;
}

export function LivePreview({
  url,
  image,
  title,
  priority,
  sizes = '(max-width: 768px) 100vw, 50vw',
  imageClassName = 'object-cover',
}: LivePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const { width } = el.getBoundingClientRect();
      if (width > 0) setScale(width / PREVIEW_WIDTH);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <Image src={image} alt={title} fill priority={priority} sizes={sizes} className={imageClassName} />
        <iframe
          src={url}
          title={`${title} live preview`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          scrolling="no"
          tabIndex={-1}
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 left-0 border-0 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            width: `${PREVIEW_WIDTH}px`,
            height: `${PREVIEW_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        />
      </div>
    </div>
  );
}
