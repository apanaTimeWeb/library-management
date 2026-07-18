// RESPONSIBILITY: Renders the list view of CRM enquiries.
import { useRouter } from 'next/navigation';
import { Eye, CheckCircle, XCircle, PhoneCall, Plus } from 'lucide-react';
import { maskPhone } from '@/app/manager/manager_crm/manager_crm_utils';
import { STATUS_BADGE } from '@/app/manager/manager_crm/manager_crm_constants';
import type { Enquiry, EnquiryStatus } from '@/app/manager/manager_crm/manager_crm_types';
import { MANAGER_CRM_URLS } from '@/app/manager/manager_crm/manager_crm_url_config';
import type { ManagerCrmEnquiriesTableProps } from '@/app/manager/manager_crm/manager_crm_types/ManagerCrmTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

// RESPONSIBILITY: Renders the Table view for CRM Enquiries.

// Props interface centralized.

export function ManagerCrmEnquiriesTable({ filtered, updateEnquiryStatus, onAddEnquiry }: ManagerCrmEnquiriesTableProps) {
    const table = useClientTable(filtered);
  const router = useRouter();

  if (filtered.length === 0) {
    return (
      <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex flex-col items-center justify-center p-12 text-center bg-bg-card border border-border rounded-lg">
          <PhoneCall size={40} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-primary font-semibold text-lg mb-2">No enquiries found</p>
          <p className="text-text-secondary text-sm mb-6">Try a different search or status filter</p>
          <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2" onClick={onAddEnquiry}>
            <Plus size={15} /> Add Enquiry
          </button>
        </div>
      </div>
    );
  }

  const handleQuickConvert = (e: React.MouseEvent, id: string, name: string, phone: string) => {
    e.stopPropagation();
    router.push(MANAGER_CRM_URLS.QUICK_CONVERT(name, phone));
  };

  const handleQuickLost = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    updateEnquiryStatus(id, 'Lost');
  };

  return (
    <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
      <div className="w-full overflow-x-auto">
        <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-border text-text-secondary text-sm">
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Shift</th>
              <th className="p-3">Status</th>
              <th className="p-3">Handled By</th>
              <th className="p-3">Date Added</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {table.paginatedData.map((enq, idx) => (
              <tr
                key={enq.id}
                onClick={() => router.push(MANAGER_CRM_URLS.ENQUIRY_DETAIL(enq.id))}
                className="border-b border-border hover:bg-bg-hover cursor-pointer transition-colors"
              >
                <td className="p-3 text-text-secondary">{idx + 1}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center text-xs font-bold text-text-secondary">
                      {enq.avatar}
                    </div>
                    <span className="font-medium text-text-primary">{enq.name}</span>
                  </div>
                </td>
                <td className="p-3 font-mono text-sm text-text-secondary">{maskPhone(enq.phone)}</td>
                <td className="p-3"><span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-info-bg text-info">{enq.shift}</span></td>
                <td className="p-3"><span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_BADGE[enq.status]}`}>{enq.status}</span></td>
                <td className="p-3 text-text-secondary">{enq.handledBy}</td>
                <td className="p-3 text-text-secondary">{enq.addedDate}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg border border-border text-text-secondary inline-flex items-center justify-center hover:bg-primary-subtle hover:text-primary transition-colors" title="View details" onClick={(e) => { e.stopPropagation(); router.push(MANAGER_CRM_URLS.ENQUIRY_DETAIL(enq.id)); }}>
                      <Eye size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg border border-border text-text-secondary inline-flex items-center justify-center hover:bg-primary-subtle hover:text-primary transition-colors text-success" title="Convert to Admission" onClick={(e) => handleQuickConvert(e, enq.id, enq.name, enq.phone)}>
                      <CheckCircle size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg border border-border text-text-secondary inline-flex items-center justify-center hover:bg-primary-subtle hover:text-primary transition-colors text-danger" title="Mark as Lost" onClick={(e) => handleQuickLost(e, enq.id)}>
                      <XCircle size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
      </div>
    </div>
  );
}
