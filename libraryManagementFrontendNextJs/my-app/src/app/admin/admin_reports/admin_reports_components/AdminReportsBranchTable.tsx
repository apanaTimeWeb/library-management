'use client';
// RESPONSIBILITY: Renders the AdminReportsBranchTable.tsx component/page.
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/ui/table-pagination';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ADMIN_REPORTS_MOCK_BRANCH_DATA, ADMIN_REPORTS_BRANCH_TABLE_HEADERS } from '../admin_reports_constants/AdminReportsConstants';

export function AdminReportsBranchTable({ rangeOptions, range }: { rangeOptions: any[], range: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Derive filtered data here instead of inline
  const filteredData = ADMIN_REPORTS_MOCK_BRANCH_DATA.filter(row => {
    if (!searchTerm) return true;
    const lowerSearch = searchTerm.toLowerCase();
    return Object.values(row).some(val => String(val).toLowerCase().includes(lowerSearch));
  });

  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  return (
    <Card className="shadow-none border-border bg-bg-card overflow-hidden rounded-[var(--radius-lg)]">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="font-bold text-base text-text-primary">Branch-wise Summary</h3>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold">
          {rangeOptions.find(o => o.key === range)?.label}
        </Badge>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64 p-4">
            <Search className="absolute left-6 top-6 h-4 w-4 text-text-secondary" />
            <Input 
              placeholder="Search..." 
              className="pl-8 bg-bg-input border-border focus-visible:ring-primary text-text-primary" 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-primary/5 text-text-secondary text-xs font-semibold uppercase tracking-wider">
            <tr>
              {ADMIN_REPORTS_BRANCH_TABLE_HEADERS.map(h => (
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.map((row) => (
              <tr key={row.branch} className="hover:bg-primary/5 transition-colors duration-200">
                <td className="px-4 py-3 font-bold text-sm text-text-primary">{row.branch}</td>
                <td className="px-4 py-3 font-bold text-sm text-text-primary">{row.revenue}</td>
                <td className="px-4 py-3 font-bold text-sm text-danger">{row.expense}</td>
                <td className="px-4 py-3 font-bold text-sm text-success">{row.profit}</td>
                <td className="px-4 py-3 font-medium text-sm text-text-primary">{row.students}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-bg-input rounded-full overflow-hidden border border-border">
                      <div 
                        className="h-full rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${row.occ}%`, 
                          backgroundColor: row.occ >= 85 ? 'var(--success)' : row.occ >= 70 ? 'var(--warning)' : 'var(--danger)' 
                        }} 
                      />
                    </div>
                    <span 
                      className="text-xs font-bold min-w-8" 
                      style={{ color: row.occ >= 85 ? 'var(--success)' : row.occ >= 70 ? 'var(--warning)' : 'var(--danger)' }}
                    >
                      {row.occ}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-text-secondary">
                  No branches found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> 
      <TablePagination
        page={page}
        limit={limit}
        totalItems={filteredData.length}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />
    </Card>
  );
}
