import React from 'react';
import { CheckCircle } from 'lucide-react';

// RESPONSIBILITY: Renders the success message after a form submission.

export function PublicEnquirySuccessState({ submittedName, onReset }: {
  submittedName: string;
  onReset: () => void;
}) {
  return (
    <div className="py-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success shadow-lg">
          <CheckCircle size={32} />
        </div>
      </div>
      
      <h2 className="text-text-primary text-xl font-bold text-text-primary mb-2">
        Thank you, {submittedName}!
      </h2>
      <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto mb-8">
        We&apos;ll contact you shortly to confirm your seat. ðŸŽ‰
      </p>

      <div className="text-left bg-input border border-border rounded-lg p-5 space-y-3 shadow-inner">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-2">
          What Happens Next
        </p>
        {[
          { icon: 'ðŸ“ž', text: 'We call you within 24 hours' },
          { icon: 'ðŸª‘', text: 'Seat confirmed & reserved for you' },
          { icon: 'ðŸŽ“', text: 'Collect your ID card on arrival' },
        ].map(({ icon, text }, index) => (
          <div key={index} className="flex items-center gap-3 text-sm text-text-secondary">
            <span className="text-base" aria-hidden="true">{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      <button
        id="submit-another-btn"
        type="button"
        onClick={onReset}
        className="w-full mt-8 flex items-center justify-center text-text-primary bg-transparent border border-border hover:bg-input text-sm font-medium py-3 px-4 rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
      >
        Submit Another Enquiry
      </button>
    </div>
  );
}
