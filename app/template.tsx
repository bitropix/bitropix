import { PixelTransition } from '@/components/site/pixel-transition';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PixelTransition />
      {children}
    </>
  );
}
