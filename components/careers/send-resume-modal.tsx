'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ArrowSwap, Eyebrow } from '@/components/site/ui';
import { JobApplicationForm } from '@/components/careers/job-application-form';

/**
 * "Send your resume" trigger + square panel dialog. Radix handles focus trap,
 * focus return, Esc to close and the dialog aria wiring.
 */
export function SendResumeModal({
  label = 'Send your resume',
  variant = 'primary',
}: {
  label?: string;
  variant?: 'primary' | 'ghost' | 'light';
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className={`btn btn-${variant}`}>
          <span>{label}</span>
          <ArrowSwap />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[80] bg-ink/85 backdrop-blur-sm duration-300" />
        <Dialog.Content
          data-lenis-prevent
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-bottom-4 fixed top-1/2 left-1/2 z-[81] max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto overscroll-contain border border-line-strong bg-ink-2 duration-500 focus:outline-none"
        >
          <div className="bg-brand-gradient h-1 w-full" aria-hidden="true" />
          <div className="p-6 sm:p-10">
            <div className="mb-10 flex items-start justify-between gap-6">
              <div>
                <Eyebrow className="mb-5">Open application</Eyebrow>
                <Dialog.Title className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[0.95] font-semibold text-paper">
                  Send us your resume.
                </Dialog.Title>
                <Dialog.Description className="mt-4 max-w-md text-paper-dim">
                  Fill in your details and we will get back to you shortly.
                </Dialog.Description>
              </div>
              <Dialog.Close
                aria-label="Close dialog"
                className="group relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden border border-line-strong text-paper transition-colors duration-500 hover:border-brand hover:text-ink"
              >
                <span
                  className="absolute inset-0 origin-bottom scale-y-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                  aria-hidden="true"
                />
                <X className="relative h-5 w-5 transition-transform duration-500 group-hover:rotate-90" aria-hidden="true" />
              </Dialog.Close>
            </div>
            <JobApplicationForm onDone={() => setOpen(false)} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
