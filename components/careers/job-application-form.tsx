'use client';

import type React from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowSwap, PixelMark } from '@/components/site/ui';

const EASE = [0.16, 1, 0.3, 1] as const;

const LIMITS = { name: 100, email: 254, phone: 20, role: 120, link: 500, additionalDetails: 5000 } as const;

type JobApplicationFormProps = {
  initialRole?: string;
  isRoleFixed?: boolean;
  /** Called after a successful submission. */
  onSuccess?: () => void;
  /** When provided, the success panel shows a "Close" button that calls it (used by the modal). */
  onDone?: () => void;
};

const labelCls = 'block font-mono text-[0.8125rem] tracking-[0.14em] uppercase text-paper-dim';
const fieldCls = 'field text-lg!';

function Required() {
  return (
    <span className="ml-1 text-brand" aria-hidden="true">
      *
    </span>
  );
}

function Success({ role, onDone, onReset }: { role: string; onDone?: () => void; onReset: () => void }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative overflow-hidden border border-line-strong bg-ink-3 p-6 sm:p-10"
      role="status"
    >
      <div className="flex items-center gap-4">
        <PixelMark className="h-6 w-6" />
        <p className="eyebrow">Application received</p>
      </div>
      <p
        ref={ref}
        tabIndex={-1}
        className="font-display mt-8 text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.95] font-semibold text-paper outline-none"
      >
        Thanks. <span className="text-brand-gradient">We will be in touch.</span>
      </p>
      <p className="mt-6 max-w-lg leading-relaxed text-paper-dim">
        Your application{role ? ` for ${role}` : ''} is with the team. If your profile is a fit, we will reach out by
        email or phone to set up a conversation.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        {onDone && (
          <button type="button" onClick={onDone} className="btn btn-light">
            <span>Close</span>
            <ArrowSwap />
          </button>
        )}
        <button type="button" onClick={onReset} className="btn btn-ghost">
          <span>Submit another</span>
          <ArrowSwap />
        </button>
      </div>
    </motion.div>
  );
}

export function JobApplicationForm({ initialRole = '', isRoleFixed = false, onSuccess, onDone }: JobApplicationFormProps) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const empty = {
    name: '',
    email: '',
    phone: '',
    resumeLink: '',
    portfolioLink: '',
    role: initialRole,
    additionalDetails: '',
    website: '',
  };
  const [formState, setFormState] = useState(empty);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRole, setSubmittedRole] = useState<string | null>(null);

  const updateField = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (formState.additionalDetails.trim().length < 10) {
      toast.error('Additional details must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      const data: { error?: string } = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Failed to submit application');

      setSubmittedRole(formState.role);
      setFormState(empty);
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {submittedRole !== null ? (
        <Success key="done" role={submittedRole} onDone={onDone} onReset={() => setSubmittedRole(null)} />
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="relative space-y-10"
          aria-busy={isSubmitting}
        >
          {/* Honeypot: off-screen, not focusable, ignored by real users. */}
          <div aria-hidden="true" className="absolute top-0 left-[-9999px] h-px w-px overflow-hidden">
            <label htmlFor={id('website')}>Website</label>
            <input
              id={id('website')}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formState.website}
              onChange={(e) => updateField('website', e.target.value)}
            />
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            <div>
              <label htmlFor={id('name')} className={labelCls}>
                Name
                <Required />
              </label>
              <input
                id={id('name')}
                required
                minLength={2}
                maxLength={LIMITS.name}
                autoComplete="name"
                value={formState.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Your full name"
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor={id('email')} className={labelCls}>
                Email
                <Required />
              </label>
              <input
                id={id('email')}
                type="email"
                required
                maxLength={LIMITS.email}
                autoComplete="email"
                value={formState.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@example.com"
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor={id('phone')} className={labelCls}>
                Phone
                <Required />
              </label>
              <input
                id={id('phone')}
                type="tel"
                required
                maxLength={LIMITS.phone}
                autoComplete="tel"
                value={formState.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className={fieldCls}
              />
            </div>
            <div>
              <label htmlFor={id('role')} className={labelCls}>
                Role
                <Required />
              </label>
              <input
                id={id('role')}
                required
                maxLength={LIMITS.role}
                value={formState.role}
                onChange={(e) => updateField('role', e.target.value)}
                readOnly={isRoleFixed}
                aria-readonly={isRoleFixed || undefined}
                placeholder="The role you are interested in"
                className={`${fieldCls} ${isRoleFixed ? 'text-paper-dim!' : ''}`}
              />
            </div>
            <div>
              <label htmlFor={id('resume')} className={labelCls}>
                Resume link
                <Required />
              </label>
              <input
                id={id('resume')}
                type="url"
                required
                maxLength={LIMITS.link}
                value={formState.resumeLink}
                onChange={(e) => updateField('resumeLink', e.target.value)}
                placeholder="https://drive.google.com/..."
                aria-describedby={id('resume-hint')}
                className={fieldCls}
              />
              <p id={id('resume-hint')} className="mt-2 text-xs text-mute">
                Google Drive or Dropbox link, shared so anyone with the link can view.
              </p>
            </div>
            <div>
              <label htmlFor={id('portfolio')} className={labelCls}>
                Portfolio link
              </label>
              <input
                id={id('portfolio')}
                type="url"
                maxLength={LIMITS.link}
                value={formState.portfolioLink}
                onChange={(e) => updateField('portfolioLink', e.target.value)}
                placeholder="https://yourportfolio.com"
                className={fieldCls}
              />
            </div>
          </div>

          <div>
            <label htmlFor={id('details')} className={labelCls}>
              Additional details
              <Required />
            </label>
            <textarea
              id={id('details')}
              required
              minLength={10}
              maxLength={LIMITS.additionalDetails}
              value={formState.additionalDetails}
              onChange={(e) => updateField('additionalDetails', e.target.value)}
              placeholder="Tell us about your experience, availability, or anything else relevant."
              rows={5}
              aria-describedby={id('details-count')}
              className={`${fieldCls} mt-1 min-h-36 resize-y leading-relaxed`}
            />
            <p id={id('details-count')} className="mt-2 text-right font-mono text-xs text-mute tabular-nums">
              {formState.additionalDetails.length} / {LIMITS.additionalDetails}
              <span className="sr-only"> characters, minimum 10</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary h-16! w-full text-lg! disabled:cursor-wait disabled:opacity-80"
          >
            {isSubmitting ? (
              <>
                <span>Submitting</span>
                <span className="flex gap-1" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <i
                      key={i}
                      className="h-1.5 w-1.5 animate-pulse bg-current"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </span>
              </>
            ) : (
              <>
                <span>Submit application</span>
                <ArrowSwap />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
