'use client';

import React from 'react';
import { usePublicEnquiry } from '@/app/public/enquiry/public_enquiry_hooks/usePublicEnquiry';
import { PublicEnquiryHeader } from '@/app/public/enquiry/public_enquiry_components/PublicEnquiryHeader';
import { PublicEnquiryForm } from '@/app/public/enquiry/public_enquiry_components/PublicEnquiryForm';
import { PublicEnquirySuccessState } from '@/app/public/enquiry/public_enquiry_components/PublicEnquirySuccessState';
import { PublicEnquiryFooter } from '@/app/public/enquiry/public_enquiry_components/PublicEnquiryFooter';

// RESPONSIBILITY: Orchestrates the client-side layout for the public enquiry page.
// DATA FLOW: usePublicEnquiry -> PublicEnquiryClient -> Components

export function PublicEnquiryClient() {
  const {
    submitted,
    submittedName,
    formMethods,
    onSubmit,
    resetForm,
  } = usePublicEnquiry();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 pt-8 sm:pt-6 bg-bg-page overflow-y-auto relative">
      {/* Background glow effects (replacing custom css with tailwind standard gradients if needed, but keeping it simple based on design system) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[440px] space-y-5 pb-8 relative z-10">
        <PublicEnquiryHeader />

        <div className="bg-bg-card rounded-[var(--radius-xl)] shadow-2xl shadow-black/50 border border-border p-6 sm:p-8 relative overflow-hidden">
          {!submitted ? (
            <PublicEnquiryForm formMethods={formMethods} onSubmit={onSubmit} />
          ) : (
            <PublicEnquirySuccessState 
              submittedName={submittedName} 
              onReset={resetForm} 
            />
          )}
        </div>

        <PublicEnquiryFooter />
      </div>
    </div>
  );
}
