'use client';

import { useEffect } from 'react';
import { MessageCircle, Plus, Edit } from 'lucide-react';
import { useManagerCommunicationStore } from '@/app/manager/manager_communication/manager_communication_store/manager_communication_store';
import { COMMUNICATION_STATUS_COLORS } from '@/app/manager/manager_communication/manager_communication_constants/manager_communication_constants';

export function ManagerCommunicationWhatsappTemplatesClient() {
  const { whatsappTemplates, status, error, fetchWhatsAppTemplates } = useManagerCommunicationStore();

  useEffect(() => {
    fetchWhatsAppTemplates();
  }, [fetchWhatsAppTemplates]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load templates: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Communication</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><MessageCircle size={24} className="text-[#25D366]" /> WhatsApp Templates</h1>
          <p className="text-sm text-text-secondary mt-1.5">Manage and submit automated message templates for approval.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
          <Plus size={16} /> New Template
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Template Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Category & Lang</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Content Preview</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Last Updated</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading templates...</td></tr>
              ) : whatsappTemplates.map((template) => (
                <tr key={template.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-text-primary">{template.templateName}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{template.category}</span>
                      <span className="text-xs text-text-secondary uppercase">{template.language}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-text-secondary max-w-[300px] truncate" title={template.content}>
                      {template.content}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{template.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${COMMUNICATION_STATUS_COLORS[template.status]}`}>
                      {template.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
                      <Edit size={14} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
