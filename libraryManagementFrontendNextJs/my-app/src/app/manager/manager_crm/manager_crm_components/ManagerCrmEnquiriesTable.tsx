import { useRouter } from 'next/navigation';
import { Eye, CheckCircle, XCircle, PhoneCall, Plus } from 'lucide-react';
import { maskPhone } from '@/app/manager/manager_crm/manager_crm_utils';
import { STATUS_BADGE } from '@/app/manager/manager_crm/manager_crm_constants';
import type { Enquiry, EnquiryStatus } from '@/app/manager/manager_crm/manager_crm_types';
import { MANAGER_CRM_URLS } from '@/app/manager/manager_crm/manager_crm_url_config';

// RESPONSIBILITY: Renders the Table view for CRM Enquiries.

interface ManagerCrmEnquiriesTableProps {
  filtered: Enquiry[];
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
}

export function ManagerCrmEnquiriesTable({ filtered, updateEnquiryStatus }: ManagerCrmEnquiriesTableProps) {
  const router = useRouter();

  if (filtered.length === 0) {
    return (
      <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex flex-col items-center justify-center p-12 text-center bg-bg-card border border-border rounded-lg">
          <PhoneCall size={40} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-primary font-semibold text-lg mb-2">No enquiries found</p>
          <p className="text-text-secondary text-sm mb-6">Try a different search or status filter</p>
          <button className="mgr-btn-primary" onClick={() => router.push(MANAGER_CRM_URLS.ADD_ENQUIRY)}>
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
            {filtered.map((enq, idx) => (
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
                <td className="p-3"><span className="mgr-badge mgr-badge--info">{enq.shift}</span></td>
                <td className="p-3"><span className={`mgr-badge ${STATUS_BADGE[enq.status]}`}>{enq.status}</span></td>
                <td className="p-3 text-text-secondary">{enq.handledBy}</td>
                <td className="p-3 text-text-secondary">{enq.addedDate}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button className="mgr-btn-icon" title="View details" onClick={(e) => { e.stopPropagation(); router.push(MANAGER_CRM_URLS.ENQUIRY_DETAIL(enq.id)); }}>
                      <Eye size={14} />
                    </button>
                    <button className="mgr-btn-icon text-success" title="Convert to Admission" onClick={(e) => handleQuickConvert(e, enq.id, enq.name, enq.phone)}>
                      <CheckCircle size={14} />
                    </button>
                    <button className="mgr-btn-icon text-danger" title="Mark as Lost" onClick={(e) => handleQuickLost(e, enq.id)}>
                      <XCircle size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
