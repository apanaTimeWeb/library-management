'use client';
// RESPONSIBILITY: Client view component rendering expenses table, search filter, and branch context (`Rule 1`, `Rule 8`).
// DATA FLOW: useAdminExpenses -> AdminExpensesClient -> Table (`Rule 39`).

import { useState } from 'react';
import { Search, Download, IndianRupee } from 'lucide-react';
import { useAdminExpenses } from '@/app/admin/admin_expenses/admin_expenses_hooks/useAdminExpenses';
import { AdminExpensesSkeleton } from '@/app/admin/admin_expenses/admin_expenses_components/AdminExpensesSkeleton';
import { AdminExpensesEmptyState } from '@/app/admin/admin_expenses/admin_expenses_components/AdminExpensesEmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

export function AdminExpensesClient() {

  const {
    expenses,
    totalCount,
    fetchState,
    searchInput,
    selectedBranch,
    setSearchInput,
    handleResetSearch,
  } = useAdminExpenses();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  if (fetchState === 'loading' && expenses.length === 0) {
    return <AdminExpensesSkeleton />;
  }

  const showBranchColumn = selectedBranch === 'All Branches';
    const table = useClientTable(expenses, 10);
  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* page Header */}
      <div className="border-b border-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Smart Library 360 <span className="opacity-50">â€º</span> Admin <span className="opacity-50">â€º</span> Expenses
          </p>
          <h1 className="text-text-primary text-xl font-bold tracking-tight text-foreground">{selectedBranch} - Expenses</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor expenses logged by managers during daily settlement for the selected branch.</p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="gap-2 bg-card hover:bg-muted"
          title="Export table data to CSV"
        >
          <Download size={16} /> Export CSV
        </Button>
      </div>

      {/* Search Bar (`Rule 15`) */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search category, branch, or managerâ€¦"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="text-xs font-medium text-muted-foreground">
          Showing <strong className="text-foreground">{totalCount}</strong> expenses
        </div>
      </div>

      {/* Table or Empty State (`Rule 50`) */}
      {expenses.length === 0 ? (
        <AdminExpensesEmptyState onResetSearch={handleResetSearch} isSearching={Boolean(searchInput.trim())} />
      ) : (
        <Card className="flex-1 min-h-96 shadow-sm border-border bg-card overflow-hidden flex flex-col">
          <div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  {showBranchColumn && <th className="px-6 py-3 font-semibold">Branch</th>}
                  <th className="px-6 py-3 font-semibold">Recorded By</th>
                  <th className="px-6 py-3 font-semibold text-right">Amount</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {expenses.slice((page - 1) * limit, page * limit).map((expense, idx) => (
                  <tr key={`${expense.id}-${idx}`} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 text-xs text-muted-foreground">{expense.date}</td>
                    <td className="px-6 py-3 font-medium text-foreground">{expense.category}</td>
                    {showBranchColumn && (
                      <td className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">{expense.branch}</td>
                    )}
                    <td className="px-6 py-3 text-sm text-foreground">{expense.recordedBy}</td>
                    <td className="px-6 py-3 text-right">
                      <span className="font-semibold text-foreground inline-flex items-center gap-0.5 justify-end">
                        <IndianRupee size={12} /> {expense.amount.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <Badge 
                        variant="secondary" 
                        className={`border-none ${
                          expense.status === 'Approved' ? 'bg-success/10 text-success' : 
                          expense.status === 'Pending' ? 'bg-warning/10 text-warning' : 
                          'bg-danger/10 text-danger'
                        }`}
                      >
                        {expense.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
      <TablePagination 
        totalItems={table.totalItems} 
        page={table.page} 
        limit={table.limit} 
        onPageChange={table.setPage} 
      />
          <TablePagination
            page={page}
            limit={limit}
            totalItems={expenses.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      )}
    </div>
  );
}
