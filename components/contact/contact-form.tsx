'use client';

import type React from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { ArrowSwap, ButtonLink, PixelMark } from '@/components/site/ui';

const EASE = [0.16, 1, 0.3, 1] as const;

// Values are the slugs the /api/contact route formats for email + Telegram. Keep them stable.
const services = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Cloud Solutions',
  'Digital Marketing',
  'ERP Implementation',
  'HRMS Setup',
  'E-Commerce Solution',
  'Agile Hiring',
  'IT Consulting',
  'Other',
].map((label) => ({ label, value: label.toLowerCase().replace(/\s+/g, '-') }));

const organizationTypes = [
  { value: 'startup', label: 'Startup' },
  { value: 'smb-msme', label: 'SMB / MSME' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'education', label: 'Education' },
  { value: 'self-employed', label: 'Self-employed' },
];

const budgets = [
  { value: 'under-5l', label: 'Under 5 Lakhs' },
  { value: '5l-15l', label: '5 to 15 Lakhs' },
  { value: '15l-30l', label: '15 to 30 Lakhs' },
  { value: 'above-30l', label: 'Above 30 Lakhs' },
  { value: 'not-sure', label: 'Not sure yet' },
];

const nextSteps = [
  { title: 'We review your brief', body: 'Within 2 hours on business days, our team reads your scope and goals.' },
  { title: 'Discovery call', body: 'A domain expert reaches out within 24 hours to set up a call.' },
  { title: 'Tailored proposal', body: 'You receive a detailed proposal with timeline, tech stack and pricing.' },
];

const LIMITS = { name: 100, email: 254, phone: 20, company: 120, message: 5000 } as const;

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  organizationType: '',
  service: '',
  budget: '',
  message: '',
  website: '',
};

type FormState = typeof EMPTY;

const labelCls = 'block font-mono text-[0.8125rem] tracking-[0.14em] uppercase text-paper-dim';
const fieldCls = 'field text-lg! sm:text-xl!';

function StepLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-3">
      <span className="text-brand">({n})</span>
      <span>{children}</span>
    </span>
  );
}

/** Square radio tile: brand fill wipes up from the bottom when selected. */
function ToggleTile({
  name,
  value,
  label,
  checked,
  onChange,
  index,
  inGrid = false,
  inputRef,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
  index?: string;
  inGrid?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}) {
  return (
    <label className={`group relative block cursor-pointer ${inGrid ? 'border-r border-b border-line' : ''}`}>
      <input
        ref={inputRef}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="peer sr-only"
      />
      <span
        className={`relative flex h-full overflow-hidden transition-colors duration-500 peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-2 peer-focus-visible:outline-brand ${
          inGrid
            ? 'min-h-[7.5rem] flex-col justify-between p-4 sm:min-h-[8.5rem] sm:p-5'
            : 'min-h-12 items-center gap-3 border px-4 py-3'
        } ${checked ? 'border-brand text-ink' : 'border-line-strong text-paper-dim group-hover:text-paper'}`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            checked ? 'bg-brand scale-y-100' : 'bg-ink-3 scale-y-0 group-hover:scale-y-100'
          }`}
        />
        {inGrid ? (
          <>
            <span className="relative flex items-start justify-between">
              <span className={`font-mono text-[0.6875rem] tracking-[0.12em] ${checked ? 'text-ink' : 'text-mute'}`}>
                {index}
              </span>
              <span
                aria-hidden="true"
                className={`grid h-4 w-4 place-items-center border transition-colors duration-500 ${checked ? 'border-ink' : 'border-line-strong'}`}
              >
                <i className={`h-2 w-2 transition-transform duration-500 ${checked ? 'scale-100 bg-ink' : 'scale-0'}`} />
              </span>
            </span>
            <span className="font-display relative text-lg leading-tight font-semibold sm:text-xl">{label}</span>
          </>
        ) : (
          <>
            <span
              aria-hidden="true"
              className={`relative h-2 w-2 shrink-0 transition-colors duration-500 ${checked ? 'bg-ink' : 'bg-line-strong'}`}
            />
            <span className="relative text-[0.9375rem] font-medium">{label}</span>
          </>
        )}
      </span>
    </label>
  );
}

function ThankYou({ name, onReset }: { name: string; onReset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = name.trim().split(/\s+/)[0] || 'there';

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <motion.div
      key="thanks"
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="relative overflow-hidden border border-line-strong bg-ink-2 p-6 sm:p-10 lg:p-12"
      role="status"
    >
      <div
        className="bg-pixel-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-center gap-4">
          <PixelMark className="h-6 w-6" />
          <p className="eyebrow">Message received</p>
        </div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-display mt-8 text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-semibold text-paper outline-none"
        >
          Thank you, <span className="text-brand-gradient">{first}.</span>
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-dim">
          Your brief is with the team. A confirmation is on its way to your inbox. Here is what happens next.
        </p>

        <ol className="mt-12 grid border-t border-l border-line sm:grid-cols-3">
          {nextSteps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease: EASE }}
              className="border-r border-b border-line p-6"
            >
              <p className="font-display text-4xl font-semibold text-brand">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-6 text-lg font-medium text-paper">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper-dim">{s.body}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/portfolio" variant="light">
            See our work meanwhile
          </ButtonLink>
          <button type="button" onClick={onReset} className="btn btn-ghost">
            <span>Send another message</span>
            <ArrowSwap />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ContactForm() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [form, setForm] = useState<FormState>(EMPTY);
  const [isLoading, setIsLoading] = useState(false);
  const [sentName, setSentName] = useState<string | null>(null);
  const firstServiceRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    if (form.name.trim().length < 2) {
      toast.error('Name must be at least 2 characters long');
      return;
    }
    if (!form.service) {
      toast.error('Pick the service you are interested in');
      firstServiceRef.current?.focus();
      return;
    }
    if (form.message.trim().length < 10) {
      toast.error('Please share a little more about your project (at least 10 characters)');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data: { error?: string } = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Failed to send message. Please try again.');

      setSentName(form.name);
      setForm(EMPTY);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send message. Please try again.', { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  const remaining = LIMITS.message - form.message.length;
  const filled = Math.min(form.message.trim().length / 10, 1);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sentName !== null ? (
        <ThankYou key="thanks" name={sentName} onReset={() => setSentName(null)} />
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative space-y-16"
          aria-busy={isLoading}
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
              value={form.website}
              onChange={(e) => set('website', e.target.value)}
            />
          </div>

          {/* 01 About you */}
          <fieldset>
            <legend className={`${labelCls} mb-8`}>
              <StepLabel n="01">About you</StepLabel>
            </legend>
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              <div>
                <label htmlFor={id('name')} className={labelCls}>
                  Full name <span className="text-brand" aria-hidden="true">*</span>
                </label>
                <input
                  id={id('name')}
                  name="name"
                  required
                  minLength={2}
                  maxLength={LIMITS.name}
                  autoComplete="name"
                  placeholder="Jane Sharma"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={fieldCls}
                />
              </div>
              <div>
                <label htmlFor={id('email')} className={labelCls}>
                  Email <span className="text-brand" aria-hidden="true">*</span>
                </label>
                <input
                  id={id('email')}
                  name="email"
                  type="email"
                  required
                  maxLength={LIMITS.email}
                  autoComplete="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  className={fieldCls}
                />
              </div>
              <div>
                <label htmlFor={id('phone')} className={labelCls}>
                  Phone
                </label>
                <input
                  id={id('phone')}
                  name="phone"
                  type="tel"
                  maxLength={LIMITS.phone}
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  className={fieldCls}
                />
              </div>
              <div>
                <label htmlFor={id('company')} className={labelCls}>
                  Company
                </label>
                <input
                  id={id('company')}
                  name="company"
                  maxLength={LIMITS.company}
                  autoComplete="organization"
                  placeholder="Your company"
                  value={form.company}
                  onChange={(e) => set('company', e.target.value)}
                  className={fieldCls}
                />
              </div>
            </div>
          </fieldset>

          {/* 02 Organization type */}
          <fieldset>
            <legend className={`${labelCls} mb-6`}>
              <StepLabel n="02">Organization type</StepLabel>
            </legend>
            <div className="flex flex-wrap gap-2">
              {organizationTypes.map((o) => (
                <ToggleTile
                  key={o.value}
                  name={id('organizationType')}
                  value={o.value}
                  label={o.label}
                  checked={form.organizationType === o.value}
                  onChange={(v) => set('organizationType', v)}
                />
              ))}
            </div>
          </fieldset>

          {/* 03 Service */}
          <fieldset>
            <legend className={`${labelCls} mb-6`}>
              <StepLabel n="03">
                What do you need? <span className="text-brand" aria-hidden="true">*</span>
                <span className="sr-only"> (required)</span>
              </StepLabel>
            </legend>
            <div className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3 xl:grid-cols-4">
              {services.map((s, i) => (
                <ToggleTile
                  key={s.value}
                  inGrid
                  inputRef={i === 0 ? firstServiceRef : undefined}
                  name={id('service')}
                  value={s.value}
                  label={s.label}
                  index={String(i + 1).padStart(2, '0')}
                  checked={form.service === s.value}
                  onChange={(v) => set('service', v)}
                />
              ))}
              {/* 11 options leave exactly one empty cell at 2, 3 and 4 columns */}
              <div className="grid place-items-center border-r border-b border-line bg-pixel-grid" aria-hidden="true">
                <PixelMark className="h-6 w-6 opacity-60" />
              </div>
            </div>
          </fieldset>

          {/* 04 Budget */}
          <fieldset>
            <legend className={`${labelCls} mb-6`}>
              <StepLabel n="04">Budget range</StepLabel>
            </legend>
            <div className="flex flex-wrap gap-2">
              {budgets.map((b) => (
                <ToggleTile
                  key={b.value}
                  name={id('budget')}
                  value={b.value}
                  label={b.label}
                  checked={form.budget === b.value}
                  onChange={(v) => set('budget', v)}
                />
              ))}
            </div>
          </fieldset>

          {/* 05 Message */}
          <div>
            <label htmlFor={id('message')} className={labelCls}>
              <StepLabel n="05">
                Tell us about the project <span className="text-brand" aria-hidden="true">*</span>
              </StepLabel>
            </label>
            <textarea
              id={id('message')}
              name="message"
              required
              minLength={10}
              maxLength={LIMITS.message}
              rows={6}
              placeholder="Goals, timeline, links, anything that helps us understand what you are building."
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              aria-describedby={id('message-count')}
              className={`${fieldCls} mt-2 min-h-44 resize-y leading-relaxed`}
            />
            <div className="mt-3 flex items-center justify-between gap-4">
              <div className="h-px flex-1 bg-line" aria-hidden="true">
                <div
                  className="bg-brand-gradient h-px origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: `scaleX(${filled})` }}
                />
              </div>
              <p
                id={id('message-count')}
                className={`font-mono text-xs tabular-nums ${remaining < 200 ? 'text-brand' : 'text-mute'}`}
              >
                {form.message.length} / {LIMITS.message}
                <span className="sr-only"> characters, minimum 10</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-sm text-mute">
              Fields marked <span className="text-brand">*</span> are required. We reply within 2 hours during
              business days.
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary h-16! w-full px-8! text-lg! disabled:cursor-wait disabled:opacity-80 sm:w-auto"
            >
              {isLoading ? (
                <>
                  <span>Sending</span>
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
                  <span>Get free consultation</span>
                  <ArrowSwap />
                </>
              )}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
