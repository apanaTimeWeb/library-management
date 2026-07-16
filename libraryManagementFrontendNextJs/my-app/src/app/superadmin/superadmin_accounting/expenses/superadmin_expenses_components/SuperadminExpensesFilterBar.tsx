import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  categories: string[];
  catFilter: string;
  setCatFilter: (val: string) => void;
}

export function SuperadminExpensesFilterBar({ categories, catFilter, setCatFilter }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] shadow-sm mb-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold text-[var(--text-disabled)] uppercase tracking-wider">Filter by Category</label>
        <select 
          className="w-full sm:w-48 bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md)] py-2 px-3 text-sm font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors shadow-inner" 
          value={catFilter} 
          onChange={e => setCatFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <button 
        className="flex items-center justify-center gap-2 bg-[var(--bg-page)] border border-[var(--border)] hover:bg-[var(--bg-input)] hover:border-[var(--primary)] text-[var(--text-primary)] text-sm font-bold py-2 px-4 rounded-[var(--radius-md)] transition-colors shadow-sm mt-auto" 
        onClick={() => router.push('/superadmin/superadmin_accounting/expense-categories')}
      >
        <TrendingUp size={14} className="text-[var(--primary)]" /> View Categories
      </button>
    </div>
  );
}
