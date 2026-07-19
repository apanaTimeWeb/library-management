'use client';
// RESPONSIBILITY: Renders the ManagerCrmEnquiriesLeftColumn.tsx component/page.
import { Phone, Tag, Clock, User, MapPin, CalendarDays } from 'lucide-react';
import { type EnquiryDetail } from '@/app/manager/manager_crm/manager_crm_types/ManagerCrmTypes';
import { STATUS_BADGE } from '@/app/manager/manager_crm/manager_crm_constants';
import { maskPhone, getInitials } from '@/app/manager/manager_crm/manager_crm_utils';
import { InfoItem, timelineDotClass } from '@/app/manager/manager_crm/manager_crm_shared_components/ManagerCrmEnquiriesDetailSub';

export function ManagerCrmEnquiriesLeftColumn({ enquiry }: { enquiry: EnquiryDetail }) {
  const statusBadgeCls = STATUS_BADGE[enquiry.status as keyof typeof STATUS_BADGE] || STATUS_BADGE['New'];
  return (
    <>
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-5 pb-6 border-b border-border mb-6">
          <div className="rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-purple font-bold text-white shrink-0 w-16 h-16 text-xl shadow-lg shadow-primary/20">
            {getInitials(enquiry.name)}
          </div>
          <div className="flex flex-col gap-1.5 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-text-primary text-xl font-bold text-text-primary m-0 truncate">{enquiry.name}</h1>
              <span className={`crm-badge ${statusBadgeCls}`}>{enquiry.status}</span>
            </div>
            <p className="flex items-center gap-1.5 text-sm text-text-secondary font-mono m-0">
              <Phone size={13} />
              +91 {enquiry.phone}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          <InfoItem icon={<Tag size={14} />} label="Source" value={enquiry.source} />
          <InfoItem icon={<Clock size={14} />} label="Preferred Shift" value={enquiry.shift} />
          <InfoItem icon={<User size={14} />} label="Handled By" value={enquiry.handledBy} />
          <InfoItem icon={<MapPin size={14} />} label="Branch Preference" value={enquiry.preferredBranch} />
          <InfoItem icon={<CalendarDays size={14} />} label="Enquiry Date" value={enquiry.enquiryDate} />
          <InfoItem icon={<Phone size={14} />} label="Phone (masked)" value={maskPhone(enquiry.phone)} />
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-[15px] font-bold text-text-primary mb-5 m-0">Activity Timeline</h2>
        {enquiry.followUps.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-border rounded-xl bg-card/50">
            <Clock size={32} className="text-text-secondary mb-4 mx-auto" />
            <p className="text-sm text-text-secondary mb-6">No follow-ups recorded yet</p>
          </div>
        ) : (
          <div className="relative pl-3 border-l-2 border-border/50 space-y-6">
            {enquiry.followUps.map((fu) => (
              <div className="relative" key={fu.id}>
                <div className={`crm-timeline-dot ${timelineDotClass(fu.by)}`} />
                <div className="bg-input border border-border rounded-lg p-4 transition-colors hover:border-text-secondary">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-text-primary m-0 flex items-center gap-2">
                      {fu.date}
                      <span className="text-text-tertiary font-normal">{fu.date}</span>
                    </p>
                    <p className="text-xs font-medium text-text-secondary uppercase tracking-wider m-0">by {fu.by}</p>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed m-0">{fu.note}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}


