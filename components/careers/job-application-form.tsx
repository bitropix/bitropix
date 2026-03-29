'use client';

import type React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type JobApplicationFormProps = {
  initialRole?: string;
  isRoleFixed?: boolean;
  onSuccess?: () => void;
};

export function JobApplicationForm({ initialRole = '', isRoleFixed = false, onSuccess }: JobApplicationFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    resumeLink: '',
    portfolioLink: '',
    role: initialRole,
    additionalDetails: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof typeof formState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Submitting application...');

    try {
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      toast.success('Application submitted successfully');
      setFormState({
        name: '',
        email: '',
        phone: '',
        resumeLink: '',
        portfolioLink: '',
        role: initialRole,
        additionalDetails: '',
      });
      onSuccess?.();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="applicant-name">Name</Label>
          <Input
            id="applicant-name"
            required
            minLength={2}
            value={formState.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Your full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="applicant-email">Email</Label>
          <Input
            id="applicant-email"
            type="email"
            required
            value={formState.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="applicant-phone">Phone</Label>
          <Input
            id="applicant-phone"
            type="tel"
            required
            value={formState.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="+91 9876543210"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="applicant-role">Role Name</Label>
          <Input
            id="applicant-role"
            required
            value={formState.role}
            onChange={(e) => updateField('role', e.target.value)}
            readOnly={isRoleFixed}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="applicant-resume-link">Resume Drive Link</Label>
          <Input
            id="applicant-resume-link"
            type="url"
            required
            value={formState.resumeLink}
            onChange={(e) => updateField('resumeLink', e.target.value)}
            placeholder="https://drive.google.com/..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="applicant-portfolio-link">Portfolio Link</Label>
          <Input
            id="applicant-portfolio-link"
            type="url"
            value={formState.portfolioLink}
            onChange={(e) => updateField('portfolioLink', e.target.value)}
            placeholder="https://yourportfolio.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicant-additional-details">Additional Details</Label>
        <Textarea
          id="applicant-additional-details"
          required
          minLength={10}
          value={formState.additionalDetails}
          onChange={(e) => updateField('additionalDetails', e.target.value)}
          placeholder="Tell us about your experience, availability, or anything else relevant."
          rows={5}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}
