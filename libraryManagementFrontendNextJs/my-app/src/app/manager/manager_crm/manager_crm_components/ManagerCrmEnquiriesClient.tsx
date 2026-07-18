'use client';

import { useRouter } from 'next/navigation';
import { ManagerCrmEnquiriesAddClient } from '@/app/manager/manager_crm/manager_crm_components/ManagerCrmEnquiriesAddClient';
import { useState } from 'react';
import { LayoutGrid, List, Plus, Search } from 'lucide-react';
import { useManagerCrmEnquiries } from '@/app/manager/manager_crm/manager_crm_hooks/useManagerCrmEnquiries';
import { ManagerCrmEnquiriesKanban } from '@/app/manager/manager_crm/manager_crm_components/ManagerCrmEnquiriesKanban';
import { ManagerCrmEnquiriesTable } from '@/app/manager/manager_crm/manager_crm_components/ManagerCrmEnquiriesTable';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { MANAGER_CRM_URLS } from '@/app/manager/manager_crm/manager_crm_url_config';

// RESPONSIBILITY: Main Client view for CRM Enquiries.

export function ManagerCrmEnquiriesClient() {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    status, error, filtered,
    view, setView,
    search, setSearch,
    statusFilter, setStatusFilter,
    getCardsByStatus, updateEnquiryStatus
  } = useManagerCrmEnquiries();

  if (status === 'error') return <div className="p-8 text-danger">Failed to load: {error}</div>;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* ── Page Header ── */}
      <div className="mb-8 space-y-4">
        <nav className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2 block">CRM &rsaquo; Enquiries</nav>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Enquiry Pipeline</h1>
            <p className="text-sm text-text-secondary">
              {status === 'loading' ? 'Loading...' : `${filtered.length} leads`} {'•'} Track every prospect from enquiry to admission
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* View toggle */}
            <div className="flex bg-bg-elevated p-1 rounded-md border border-border">
              <button
                className={`p-1.5 rounded text-text-secondary hover:text-text-primary transition-colors ${view === 'kanban' ? 'bg-bg-card shadow-sm text-text-primary' : ''}`}
                onClick={() => setView('kanban')} title="Kanban view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={`p-1.5 rounded text-text-secondary hover:text-text-primary transition-colors ${view === 'table' ? 'bg-bg-card shadow-sm text-text-primary' : ''}`}
                onClick={() => setView('table')} title="Table view"
              >
                <List size={16} />
              </button>
            </div>
            <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2" onClick={() => setIsAddModalOpen(true)}>
              <Plus size={16} /> Add Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="relative flex-grow max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            className="w-full pl-9 pr-3 py-2 bg-bg-card border border-border rounded-md text-sm text-text-primary outline-none focus:border-primary transition-colors"
            placeholder="Search by name or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ManagerSearchableDropdown
          className="w-48"
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          options={[
            { label: 'All Statuses', value: 'All' },
            { label: 'New', value: 'New' },
            { label: 'Visited', value: 'Visited' },
            { label: 'Interested', value: 'Interested' },
            { label: 'Converted', value: 'Converted' },
            { label: 'Lost', value: 'Lost' },
          ]}
        />
      </div>

      {/* ── Views ── */}
      {status === 'loading' ? (
        <div className="flex items-center justify-center p-24 text-text-secondary">Loading pipeline...</div>
      ) : view === 'kanban' ? (
        <ManagerCrmEnquiriesKanban isEmpty={filtered.length === 0} getCardsByStatus={getCardsByStatus} onAddEnquiry={() => setIsAddModalOpen(true)} />
      ) : (
        <ManagerCrmEnquiriesTable filtered={filtered} updateEnquiryStatus={updateEnquiryStatus} onAddEnquiry={() => setIsAddModalOpen(true)} />
      )}
      {isAddModalOpen && (
        <ManagerCrmEnquiriesAddClient onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}
