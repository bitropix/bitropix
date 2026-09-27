'use client';

import { useId, useState } from 'react';

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * Accessible FAQ accordion. Answers stay in the DOM (SEO) and animate via the
 * CSS grid-rows trick, so there's no height measuring in JS.
 */
export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left sm:py-7"
              >
                <span className="flex gap-5">
                  <span className="eyebrow mt-1.5 w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={`text-lg font-medium transition-colors duration-300 sm:text-xl ${isOpen ? 'text-paper' : 'text-paper-dim group-hover:text-paper'}`}
                  >
                    {item.question}
                  </span>
                </span>
                <span
                  className={`relative mt-1 grid h-7 w-7 shrink-0 place-items-center border transition-colors duration-300 ${isOpen ? 'border-brand bg-brand' : 'border-line-strong group-hover:border-paper'}`}
                  aria-hidden="true"
                >
                  <i className="absolute h-px w-3 bg-paper" />
                  <i
                    className={`absolute h-3 w-px bg-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'scale-y-0' : 'scale-y-100'}`}
                  />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="acc-panel" data-open={isOpen}>
              <div>
                <p className="max-w-3xl pr-12 pb-7 pl-11 leading-relaxed text-paper-dim">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
