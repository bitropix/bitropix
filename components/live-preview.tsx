import Image from 'next/image';

interface LivePreviewProps {
  image: string;
  title: string;
  priority?: boolean;
  sizes?: string;
  imageClassName?: string;
}

/**
 * Static preview of a project. Renders a captured screenshot ("first frame")
 * of the live site rather than embedding it, so third-party popups/overlays
 * never appear in the card. Image fills its (aspect-video) container.
 */
export function LivePreview({
  image,
  title,
  priority,
  sizes = '(max-width: 768px) 100vw, 50vw',
  imageClassName = 'object-cover object-top',
}: LivePreviewProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <Image src={image} alt={`${title} website preview`} fill priority={priority} sizes={sizes} className={imageClassName} />
      </div>
    </div>
  );
}
