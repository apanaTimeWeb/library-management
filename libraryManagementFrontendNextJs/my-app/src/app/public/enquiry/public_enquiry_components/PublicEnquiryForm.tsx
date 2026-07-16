import React from 'react';
import { User, Phone, MessageSquare, Clock, Send, Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { PublicEnquiryFormData } from '../public_enquiry_types/PublicEnquiryValidation';
import { PUBLIC_ENQUIRY_SHIFTS } from '../public_enquiry_constants/PublicEnquiryConstants';

// RESPONSIBILITY: Renders the enquiry form input fields and handles user interaction.

interface PublicEnquiryFormProps {
  formMethods: UseFormReturn<PublicEnquiryFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function PublicEnquiryForm({ formMethods, onSubmit }: PublicEnquiryFormProps) {
  const { register, formState: { errors, isSubmitting } } = formMethods;

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">Submit Your Enquiry</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Fill in your details and we&apos;ll contact you shortly to confirm your seat.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="enq-name" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">
            Your Full Name <span className="text-[var(--danger)]">*</span>
          </label>
          <div className="relative">
            <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" />
            <input
              id="enq-name"
              type="text"
              placeholder="Your Full Name"
              {...register('name')}
              className={`w-full bg-[var(--bg-input)] border ${errors.name ? 'border-[var(--danger)]' : 'border-[var(--border)]'} rounded-[var(--radius-md)] py-2 pl-9 pr-3 text-[var(--text-primary)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)] transition-all duration-200`}
            />
          </div>
          {errors.name && <p className="text-[12px] text-[var(--danger)] mt-1">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="enq-phone" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">
            Phone Number <span className="text-[var(--danger)]">*</span>
          </label>
          <div className="relative">
            <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" />
            <input
              id="enq-phone"
              type="tel"
              placeholder="+91 9800000000"
              {...register('phone')}
              className={`w-full bg-[var(--bg-input)] border ${errors.phone ? 'border-[var(--danger)]' : 'border-[var(--border)]'} rounded-[var(--radius-md)] py-2 pl-9 pr-3 text-[var(--text-primary)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)] transition-all duration-200`}
            />
          </div>
          {errors.phone && <p className="text-[12px] text-[var(--danger)] mt-1">{errors.phone.message}</p>}
        </div>

        {/* Preferred Shift */}
        <div>
          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
            Preferred Shift <span className="text-[var(--danger)]">*</span>
          </label>
          <div className="space-y-2 mt-1">
            {PUBLIC_ENQUIRY_SHIFTS.map(shift => (
              <label
                key={shift.id}
                htmlFor={`shift-${shift.id}`}
                className={`flex items-center gap-3 p-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-input)] transition-all duration-200 ${
                  !shift.available ? 'opacity-50 cursor-not-allowed bg-[var(--bg-page)]' : 'cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--primary-subtle)]'
                }`}
              >
                <input
                  id={`shift-${shift.id}`}
                  type="radio"
                  value={shift.id}
                  disabled={!shift.available}
                  {...register('shift')}
                  className="accent-[var(--primary)] w-4 h-4 shrink-0 cursor-pointer"
                />
                <Clock size={16} className="text-[var(--text-secondary)] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{shift.label}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{shift.time}</p>
                </div>
                {!shift.available && (
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-[var(--danger-bg,rgba(248,113,113,0.1))] text-[var(--danger)]">
                    Full
                  </span>
                )}
              </label>
            ))}
          </div>
          {errors.shift && <p className="text-[12px] text-[var(--danger)] mt-1">{errors.shift.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="enq-message" className="block text-xs font-semibold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">
            Message <span className="text-[var(--text-disabled)] font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <div className="relative">
            <MessageSquare size={15} className="absolute left-3 top-3 text-[var(--text-secondary)] pointer-events-none" />
            <textarea
              id="enq-message"
              rows={2}
              placeholder="Any questions or special requirements?"
              {...register('message')}
              className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md)] py-2 pl-9 pr-3 text-[var(--text-primary)] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)] transition-all duration-200 resize-none"
            />
          </div>
        </div>

        <button
          id="submit-enquiry-btn"
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-medium py-3 px-4 rounded-[var(--radius-md)] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)] active:scale-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={16} />
              Submit Enquiry
            </>
          )}
        </button>
      </form>
    </>
  );
}
