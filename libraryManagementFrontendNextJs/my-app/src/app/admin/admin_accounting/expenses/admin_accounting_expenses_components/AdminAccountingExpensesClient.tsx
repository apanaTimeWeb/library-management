// RESPONSIBILITY: Renders the AdminAccountingExpensesClient component.
'use client';

import { useState } from 'react';
import { Search, Plus, Filter, IndianRupee, TrendingUp } from 'lucide-react';
import { useAdminAccountingExpenses } from '@/app/admin/admin_accounting/expenses/admin_accounting_expenses_hooks/useAdminAccountingExpenses';
import { AdminAccountingExpensesAddDialog } from '@/app/admin/admin_accounting/expenses/admin_accounting_expenses_components/AdminAccountingExpensesAddDialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function ModeBadge({ value }: { value: string }) {
  if (!value) return null;
  const modeClasses: Record<string, string> = {
    cash: 'bg-success/10 text-success hover:bg-success/20',
    upi: 'bg-info/10 text-info hover:bg-info/20',
    card: 'bg-primary/10 text-primary hover:bg-primary/20',
    bank: 'bg-warning/10 text-warning hover:bg-warning/20',
  };
  return (
    <Badge variant="secondary" className={`${modeClasses[value] || 'bg-muted text-muted-foreground'} border-none font-bold tracking-wide`}>
      {value.toUpperCase()}
    </Badge>
  );
}

export function AdminAccountingExpensesClient() {
  const {
    expenses,
    categories,
    totalValue,
    fetchState,
    searchInput,
    categoryFilter,
    setSearchInput,
    setCategoryFilter,
    handleCreateExpense,
    handleResetFilters,
  } = useAdminAccountingExpenses();

  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manual Expenses</h1>
          <p className="text-sm text-muted-foreground mt-1">Log and track miscellaneous accounting expenses.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2">
          <Plus size={16} /> Log Expense
        </Button>
      </div>

      {/* Overview Stat */}
      <Card className="p-6 shadow-none border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total (Filtered)</h3>
          <p className="text-3xl font-bold text-foreground flex items-center">
            <IndianRupee size={24} className="mr-1 text-danger" />
            {totalValue.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="p-3 bg-danger/10 text-danger rounded-full">
          <TrendingUp size={24} />
        </div>
      </Card>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9 w-full"
            placeholder="Search description or paid by…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <select
            className="flex h-10 w-44 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {(searchInput || categoryFilter !== 'all') && (
          <Button variant="ghost" size="sm" onClick={handleResetFilters} className="text-info hover:text-info/80 hover:bg-info/10">
            Clear Filters
          </Button>
        )}
      </div>

      {/* Grid */}
      <Card className="flex-1 shadow-none border-border overflow-hidden flex flex-col min-h-96">
        {fetchState === 'loading' && expenses.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">Loading expenses…</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 border-y text-muted-foreground text-xs font-medium uppercase tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Paid By</th>
                  <th className="px-4 py-3">Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {expenses.map((expense, index) => (
                  <tr key={index} className="hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-4 text-muted-foreground text-xs">{expense.date}</td>
                    <td className="px-4 py-4 font-semibold text-foreground">{expense.category}</td>
                    <td className="px-4 py-4 text-muted-foreground font-medium">{expense.description}</td>
                    <td className="px-4 py-4 font-semibold text-foreground flex items-center gap-0.5 mt-2">
                      <IndianRupee size={12} /> {expense.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{expense.paidBy}</td>
                    <td className="px-4 py-4">
                      <ModeBadge value={expense.mode} />
                    </td>
                  </tr>
                ))}
                {expenses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      No expenses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <AdminAccountingExpensesAddDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreateExpense}
      />
    </div>
  );
}
