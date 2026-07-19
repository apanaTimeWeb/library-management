'use client';
import { useUrlState } from '@/app/manager/manager_shared_hooks/useUrlState';

// RESPONSIBILITY: Renders the ManagerStudentsReferralsClient.tsx component.
import React, { useState } from 'react';
import { Award, Search, Filter, IndianRupee } from 'lucide-react';
import { ReferralData } from '@/app/manager/manager_students/manager_students_types';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

const REFERRALS_DATA: ReferralData[] = [
  { id: 'REF-001', referrer: 'Arjun Das',    referred: 'Riya Sen',    date: '2026-05-15', status: 'Claimed',  bonus: 'â‚¹500', method: 'Fee Discount' },
  { id: 'REF-002', referrer: 'Priya Verma',  referred: 'Kunal Singh', date: '2026-06-02', status: 'Pending',  bonus: 'â‚¹500', method: 'Cash'         },
  { id: 'REF-003', referrer: 'Rohan Sharma', referred: 'Aditi Jain',  date: '2026-06-03', status: 'Approved', bonus: 'â‚¹500', method: 'Fee Discount' },
];

export function ManagerStudentsReferralsClient() {
const [searchTerm, setSearchTerm] = useUrlState('searchTerm', '' as string);

  const [rowData] = useState<ReferralData[]>(REFERRALS_DATA);


  const filteredData = rowData.filter(item => 
    !searchTerm || 
    item.referrer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.referred.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const table = useClientTable(filteredData, 10);


  return (
    <div className="p-6 min-h-screen">
      <div className="p-6 min-h-screen-header">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Students â€º Referrals</div>
          <h1 className="text-xl font-bold text-text-primary">Referral Program</h1>
          <p className="p-6 min-h-screen-subtitle">Track and manage student referral bonuses.</p>
        </div>
        <div className="p-6 min-h-screen-actions">
          <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
            <Award size={16} /> New Referral
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Referrals',        value: '45',       icon: Award,        iconClass: 'bg-primary/10 text-primary' },
          { label: 'Pending Approvals',       value: '8',        icon: Search,       iconClass: 'bg-warning/10 text-warning' },
          { label: 'Total Bonus Distributed', value: 'â‚¹18,500', icon: IndianRupee,  iconClass: 'bg-success/10 text-success' },
        ].map(k => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${k.iconClass}`}><Icon size={18} /></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-text-secondary mb-1">{k.label}</p>
                <p className="text-text-primary text-xl font-bold text-text-primary tracking-tight">{k.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-full bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap max-w-[320px]">
            <Search size={14} className="w-full bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
            <input type="text" placeholder="Search by student nameâ€¦" className="w-full bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon" />
          </div>
          <button className="bg-transparent border border-border text-text-primary rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2"><Filter size={14} /> Filters</button>
        </div>
        
        <div className="flex justify-end mb-[16px]">
          <input 
            type="text" 
            placeholder="Search in table..." 
            className="px-3 py-2 border border-border rounded-md text-sm bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
          <div className="w-full overflow-x-auto">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-card border-b border-border">
                <tr className="text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">Ref ID</th>
                  <th className="px-4 py-3 font-semibold">Referrer (Existing)</th>
                  <th className="px-4 py-3 font-semibold">Referred Student</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Bonus</th>
                  <th className="px-4 py-3 font-semibold">Payout Method</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-text-secondary">No referrals found</td>
                  </tr>
                ) : (
                  table.paginatedData.map((row) => {
                    const statusCls = row.status === 'Claimed' ? 'bg-success-bg text-success' : row.status === 'Approved' ? 'bg-info-bg text-info' : 'bg-warning-bg text-warning';
                    return (
                      <tr key={row.id} className="hover:bg-page transition-colors cursor-pointer group">
                        <td className="px-4 py-4 font-medium text-text-primary">{row.id}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-text-secondary">{row.referrer}</td>
                        <td className="px-4 py-4 text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">{row.referred}</td>
                        <td className="px-4 py-4 text-text-secondary">{row.date}</td>
                        <td className="px-4 py-4 font-semibold text-text-primary">{row.bonus}</td>
                        <td className="px-4 py-4 text-text-secondary">{row.method}</td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusCls}`}>{row.status}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          {row.status !== 'Claimed' && (
                            <button className="bg-transparent border border-border text-text-primary rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>Process</button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
          </div>

      </div>
    </div>
  );
}


