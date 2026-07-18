// RESPONSIBILITY: Renders the kanban board view of CRM enquiries grouped by status.
import { useRouter } from 'next/navigation';
import { PhoneCall, MoreHorizontal, Plus } from 'lucide-react';
import { KANBAN_COLUMNS, DOT_CLASS } from '@/app/manager/manager_crm/manager_crm_constants';
import type { EnquiryStatus, Enquiry } from '@/app/manager/manager_crm/manager_crm_types';
import { ManagerCrmKanbanCard } from '@/app/manager/manager_crm/manager_crm_components/ManagerCrmKanbanCard';
import { ManagerCrmEnquiriesKanbanProps } from '@/app/manager/manager_crm/manager_crm_types/ManagerCrmTypes';
import { MANAGER_CRM_URLS } from '@/app/manager/manager_crm/manager_crm_url_config';

// RESPONSIBILITY: Renders the entire Kanban board for CRM Enquiries.

// Props interface centralized.

export function ManagerCrmEnquiriesKanban({ isEmpty, getCardsByStatus, onAddEnquiry }: ManagerCrmEnquiriesKanbanProps) {
  const router = useRouter();

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center bg-bg-card border border-border rounded-lg p-12 text-center mt-12">
        <PhoneCall size={48} className="text-text-secondary mx-auto mb-4" />
        <p className="text-text-primary font-semibold text-lg mb-2">No enquiries yet</p>
        <p className="text-text-secondary text-sm mb-6">Add your first lead to start the pipeline</p>
        <button
          className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
          onClick={onAddEnquiry}
        >
          <Plus size={15} /> Add Enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 items-start h-full min-h-screen">
      {KANBAN_COLUMNS.map((col) => {
        const cards = getCardsByStatus(col.id);
        return (
          <div key={col.id} className="flex-shrink-0 w-80 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${DOT_CLASS[col.id]}`} />
                <span className="font-semibold text-sm text-text-primary uppercase tracking-wider">{col.label}</span>
                <span className="bg-bg-elevated text-text-secondary text-xs font-medium px-2 py-0.5 rounded-full">{cards.length}</span>
              </div>
              <button className="p-1 text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-bg-elevated" title="More options" aria-label="Column options">
                <MoreHorizontal size={15} />
              </button>
            </div>
            <div className="flex flex-col gap-3 min-h-40">
              {cards.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-border rounded-lg text-text-disabled h-full min-h-32">
                  <PhoneCall size={28} />
                  <p className="text-sm font-semibold mt-2">No {col.label} leads</p>
                  <p className="text-xs mt-1 text-text-secondary">Leads will appear here when moved to {col.label}</p>
                </div>
              ) : (
                cards.map((enq) => (
                  <ManagerCrmKanbanCard
                    key={enq.id}
                    enq={enq}
                    colClass={col.cardClass}
                    onClick={() => router.push(MANAGER_CRM_URLS.ENQUIRY_DETAIL(enq.id))}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}


