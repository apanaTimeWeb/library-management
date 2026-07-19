'use client';
import { useUrlState } from '@/app/admin/admin_shared_hooks/useUrlState';

// RESPONSIBILITY: Client view rendering financial reports with fixed keys and tailwind classes (`Rule 1`, `Rule 36`, `Rule 57`).
// DATA FLOW: Store -> AdminAccountingFinancialReportsClient (`Rule 39`).

import { useState } from 'react';
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MONTHLY = [
  { month: 'Oct', income: 42000, expense: 18000 },
  { month: 'Nov', income: 38000, expense: 15000 },
  { month: 'Dec', income: 51000, expense: 22000 },
  { month: 'Jan', income: 47000, expense: 19000 },
  { month: 'Feb', income: 44000, expense: 17000 },
  { month: 'Mar', income: 56000, expense: 21000 },
  { month: 'Apr', income: 61000, expense: 24000 },
];

const CATEGORY_BREAKDOWN = [
  { category: 'Electricity',   amount: 4200,  pct: 17 },
  { category: 'Maintenance',   amount: 3600,  pct: 15 },
  { category: 'Internet',      amount: 2200,  pct: 9  },
  { category: 'Salary',        amount: 12000, pct: 50 },
  { category: 'Miscellaneous', amount: 2200,  pct: 9  },
];

const maxIncome = Math.max(...MONTHLY.map(m => m.income));

export function AdminAccountingFinancialReportsClient() {
  const [period, setPeriod] = useUrlState('period', 'monthly' as string);

  const totalIncome  = MONTHLY.reduce((s, m) => s + m.income, 0);
  const totalExpense = MONTHLY.reduce((s, m) => s + m.expense, 0);
  const netProfit    = totalIncome - totalExpense;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Income vs expense overview and category breakdown.</p>
        </div>
        <div className="flex gap-2 bg-muted/50 p-1 rounded-lg border border-border">
          {['monthly', 'quarterly', 'yearly'].map(p => (
            <Button
              key={`period-${p}`}
              variant={period === p ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setPeriod(p)}
              className={`text-xs font-semibold capitalize ${period === p ? 'bg-card shadow-sm' : ''}`}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 shadow-sm border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-success" />
            <p className="text-xs font-bold uppercase tracking-wider text-success">Total Income</p>
          </div>
          <p className="text-3xl font-extrabold text-success tracking-tighter">₹{totalIncome.toLocaleString()}</p>
        </Card>
        
        <Card className="p-5 shadow-sm border-danger/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={16} className="text-danger" />
            <p className="text-xs font-bold uppercase tracking-wider text-danger">Total Expenses</p>
          </div>
          <p className="text-3xl font-extrabold text-danger tracking-tighter">₹{totalExpense.toLocaleString()}</p>
        </Card>
        
        <Card className="p-5 shadow-sm border-border">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 size={16} className="text-muted-foreground" />
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Net Profit</p>
          </div>
          <p className={`text-3xl font-extrabold tracking-tighter ${netProfit >= 0 ? 'text-foreground' : 'text-danger'}`}>
            ₹{netProfit.toLocaleString()}
          </p>
        </Card>
      </div>

      <Card className="p-6 shadow-sm border-border">
        <p className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">Monthly Income vs Expense</p>
        <div className="flex items-end gap-3 h-52 overflow-x-auto pb-2">
          {MONTHLY.map((m) => (
            <div key={`chart-col-${m.month}`} className="flex flex-col items-center gap-2 flex-1 min-w-12">
              <div className="flex items-end gap-1.5 w-full justify-center h-40">
                <div
                  className="rounded-t w-6 transition-all bg-success hover:brightness-110 h-[length:var(--h)]" style={{ '--h': `${(m.income / maxIncome) * 100}%` } as React.CSSProperties}
                  title={`Income: ₹${m.income.toLocaleString()}`}
                />
                <div
                  className="rounded-t w-6 transition-all bg-danger hover:brightness-110 h-[length:var(--h)]" style={{ '--h': `${(m.expense / maxIncome) * 100}%` } as React.CSSProperties}
                  title={`Expense: ₹${m.expense.toLocaleString()}`}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-5 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-success" />
            <span className="text-xs font-semibold text-foreground">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-danger" />
            <span className="text-xs font-semibold text-foreground">Expense</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-sm border-border">
        <p className="text-sm font-bold text-foreground mb-5 uppercase tracking-wider">Expense Category Breakdown</p>
        <div className="space-y-4">
          {CATEGORY_BREAKDOWN.map(c => (
            <div key={`cat-breakdown-${c.category}`}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">{c.category}</span>
                <span className="text-xs font-semibold text-muted-foreground">₹{c.amount.toLocaleString()} ({c.pct}%)</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all w-[length:var(--w)]" style={{ '--w': `${c.pct}%` } as React.CSSProperties} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

