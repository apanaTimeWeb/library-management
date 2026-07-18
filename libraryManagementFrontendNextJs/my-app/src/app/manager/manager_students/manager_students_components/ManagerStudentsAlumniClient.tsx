'use client';
// RESPONSIBILITY: Renders the ManagerStudentsAlumniClient.tsx component.
import React, { useState } from 'react';
import { Search, Filter, Mail, Award } from 'lucide-react';
import { AlumniData } from '@/app/manager/manager_students/manager_students_types';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

const ALUMNI_DATA: AlumniData[] = [
  { id: 'AL-1001', name: 'Neha Reddy',  phone: '+91 9988776655', leftDate: '2025-12-01', duration: '12 Months', exam: 'UPSC CSE',  currentStatus: 'Selected (IAS)'      },
  { id: 'AL-1002', name: 'Karan Mehra', phone: '+91 8877665544', leftDate: '2026-02-15', duration: '6 Months',  exam: 'SSC CGL',   currentStatus: 'Selected'             },
  { id: 'AL-1003', name: 'Anita Desai', phone: '+91 7766554433', leftDate: '2026-04-10', duration: '8 Months',  exam: 'Bank PO',   currentStatus: 'Preparing from home'  },
];

export function ManagerStudentsAlumniClient() {
    const table = useClientTable(filteredData.slice((page - 1) * limit, page * limit));
  const [searchTerm, setSearchTerm] = useState('');

  const [rowData] = useState<AlumniData[]>(ALUMNI_DATA);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filteredData = rowData.filter(item => 
    !searchTerm || 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.exam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen">
      <div className="p-6 min-h-screen-header">
        <div>
          <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Students › Alumni</div>
          <h1 className="text-[22px] font-bold text-text-primary">Alumni Directory</h1>
          <p className="text-[13px] text-text-secondary mt-1.5">Students who have successfully completed their journey here.</p>
        </div>
        <div className="p-6 min-h-screen-actions">
          <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2"><Award size={16} /> Success Stories</button>
        </div>
      </div>

      <div className="bg-bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon-wrap max-w-[320px]">
            <Search size={14} className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-icon" />
            <input type="text" placeholder="Search alumni by name or exam…" className="w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full bg-bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent-with-icon" />
          </div>
          <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2"><Filter size={14} /> Filters</button>
        </div>
        
        <div className="flex justify-end mb-[16px]">
          <input 
            type="text" 
            placeholder="Search in table..." 
            className="px-3 py-2 border border-border rounded-md text-sm bg-bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full overflow-x-auto border-t border-border mt-4">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-bg-elevated border-b border-border">
                <tr className="text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Alumni Name</th>
                  <th className="px-4 py-3 font-semibold">Studied For</th>
                  <th className="px-4 py-3 font-semibold">Target Exam</th>
                  <th className="px-4 py-3 font-semibold">Current Status</th>
                  <th className="px-4 py-3 font-semibold">Left On</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-text-secondary">No alumni found</td>
                  </tr>
                ) : (
                  table.paginatedData.map((row) => {
                    const isSelected = row.currentStatus?.includes('Selected');
                    return (
                      <tr key={row.id} className="hover:bg-bg-page transition-colors cursor-pointer group">
                        <td className="px-4 py-4 font-medium text-text-primary">{row.id}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-subtle text-primary flex items-center justify-center text-xs font-bold shrink-0">{row.name?.charAt(0)}</div>
                            <div>
                              <p className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors truncate">{row.name}</p>
                              <p className="text-xs text-text-secondary mt-0.5 truncate">{row.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-text-secondary">{row.duration}</td>
                        <td className="px-4 py-4 font-semibold text-text-primary">{row.exam}</td>
                        <td className="px-4 py-4">
                          <span className={`flex items-center gap-1.5 ${isSelected ? 'text-success font-semibold' : 'text-text-secondary font-medium'}`}>
                            {isSelected && <Award size={14} />}
                            {row.currentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-text-secondary">{row.leftDate}</td>
                        <td className="px-4 py-4 text-right">
                          <button className="w-8 h-8 rounded-lg border border-border text-text-secondary inline-flex items-center justify-center hover:bg-primary-subtle hover:text-primary transition-colors" title="Send Message" onClick={(e) => e.stopPropagation()}>
                            <Mail size={14} />
                          </button>
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
          {filteredData.length > 0 && (
            <TablePagination
              page={page}
              limit={limit}
              totalItems={filteredData.length}
              onPageChange={setPage}
              onLimitChange={setLimit}
            />
          )}
      </div>
    </div>
  );
}
