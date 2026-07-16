import React from 'react';
import { PUBLIC_ENQUIRY_LIBRARY } from '@/app/public/enquiry/public_enquiry_constants/PublicEnquiryConstants';

// RESPONSIBILITY: Renders the library contact info and copyright footer.

export function PublicEnquiryFooter() {
  return (
    <div className="text-center space-y-1.5 mt-8 pb-8">
      <p className="text-xs text-[var(--text-secondary)]">
        {PUBLIC_ENQUIRY_LIBRARY.address}
      </p>
      <a
        href={`tel:${PUBLIC_ENQUIRY_LIBRARY.phone.replace(/\s/g, '')}`}
        className="text-xs text-[var(--primary)] font-medium hover:underline block"
      >
        {PUBLIC_ENQUIRY_LIBRARY.phone}
      </a>
      <p className="text-[10px] text-[var(--text-disabled)] pt-1">
        © 2026 {PUBLIC_ENQUIRY_LIBRARY.name} · Powered by Smart Library 360
      </p>
    </div>
  );
}
