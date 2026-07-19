'use client';
// RESPONSIBILITY: Renders the AdminReportsBranchTable.tsx component/page.
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function AdminReportsBranchTable({ rangeOptions, range }: { rangeOptions: any[], range: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const branchData = [
    { branch: 'Main Branch',    revenue: 'â‚¹62,000', expense: 'â‚¹18,000', profit: 'â‚¹44,000', students: 248, occ: 92 },
    { branch: 'Branch 2',       revenue: 'â‚¹48,000', expense: 'â‚¹14,500', profit: 'â‚¹33,500', students: 180, occ: 85 },
    { branch: 'Kothrud Center', revenue: 'â‚¹28,000', expense: 'â‚¹9,000',  profit: 'â‚¹19,000', students: 95,  occ: 78 },
    { branch: 'Nashik Branch',  revenue: 'â‚¹14,000', expense: 'â‚¹5,000',  profit: 'â‚¹9,000',  students: 42,  occ: 60 },
  ];

  return (
    <Card className="shadow-none border-border bg-card overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="font-bold text-base text-primary">Branch-wise Summary</h3>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold">
          {rangeOptions.find(o => o.key === range)?.label}
        </Badge>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64 p-4">
            <Search className="absolute left-6 top-6 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-muted-foreground text-xs font-medium uppercase tracking-wider">
            <tr>
              {['Branch', 'Revenue', 'Expenses', 'Net Profit', 'Students', 'Occupancy'].map(h => (
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {branchData.filter(row => JSON.stringify(row).toLowerCase().includes(searchTerm.toLowerCase())).slice((page - 1) * limit, page * limit).map((row, i) => (
              <tr key={row.branch} className="hover:bg-muted/10 transition-colors">
                <td className="px-4 py-3 font-bold text-sm text-primary">{row.branch}</td>
                <td className="px-4 py-3 font-bold text-sm text-primary">{row.revenue}</td>
                <td className="px-4 py-3 font-bold text-sm text-danger">{row.expense}</td>
                <td className="px-4 py-3 font-bold text-sm text-success">{row.profit}</td>
                <td className="px-4 py-3 font-medium text-sm text-primary">{row.students}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${row.occ}%`, 
                          backgroundColor: row.occ >= 85 ? 'var(--chart-green)' : row.occ >= 70 ? 'var(--chart-amber)' : 'var(--chart-red)' 
                        }} 
                      />
                    </div>
                    <span 
                      className="text-xs font-bold min-w-8 text-[color:var(--c)]" style={{ '--c': row.occ >= 85 ? 'var(--success)' : row.occ >= 70 ? 'var(--warning)' : 'var(--danger)' } as React.CSSProperties}
                    >
                      {row.occ}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
      <TablePagination
        page={page}
        limit={limit}
        totalItems={branchData.length}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />
    </Card>
  );
}

