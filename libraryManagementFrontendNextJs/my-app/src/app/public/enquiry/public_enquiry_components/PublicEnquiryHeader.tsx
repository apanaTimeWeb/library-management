import React from 'react';
import { BookOpen } from 'lucide-react';
import { PUBLIC_ENQUIRY_LIBRARY } from '../public_enquiry_constants/PublicEnquiryConstants';

// RESPONSIBILITY: Renders the branding and availability badge for the library.

export function PublicEnquiryHeader() {
  return (
    <div className="text-center space-y-3 mb-8">
      <div className="flex justify-center">
        <div className="w-14 h-14 bg-gradient-to-tr from-[var(--primary)] to-indigo-400 rounded-[var(--radius-xl)] shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center justify-center">
          <BookOpen size={26} className="text-white" />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">
          {PUBLIC_ENQUIRY_LIBRARY.name}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-0.5">
          {PUBLIC_ENQUIRY_LIBRARY.tagline}
        </p>
      </div>
      <div className="inline-flex items-center gap-2 bg-[var(--success-bg,rgba(52,211,153,0.1))] text-[var(--success)] px-3 py-1.5 rounded-full text-xs font-semibold border border-[var(--success)]/20 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
        Seats Available — Enquire Now
      </div>
    </div>
  );
}
