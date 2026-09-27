'use client';

import { useEffect, useState } from 'react';
import { Check, Link2 } from 'lucide-react';

/** Square icon button that copies the article URL to the clipboard. */
export function CopyLink({ url, className = '' }: { url: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (permissions, insecure context); fail quietly.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Link copied' : 'Copy link to article'}
      className={className}
    >
      {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Link copied to clipboard' : ''}
      </span>
    </button>
  );
}
