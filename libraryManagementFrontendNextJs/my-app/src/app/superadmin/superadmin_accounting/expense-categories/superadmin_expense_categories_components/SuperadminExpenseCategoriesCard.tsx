import React from 'react';
import { Trash2 } from 'lucide-react';
import type { SuperadminExpenseCategory } from '../superadmin_expense_categories_types/SuperadminExpenseCategoriesTypes';

interface Props {
  category: SuperadminExpenseCategory;
  onDelete: (id: number) => void;
}

export function SuperadminExpenseCategoriesCard({ category, onDelete }: Props) {
  const pct = Math.min(Math.round((category.spent / category.budget) * 100), 100);
  const over = category.spent > category.budget;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: category.color }} />
          <span className="text-base font-extrabold text-[var(--text-primary)] tracking-tight">{category.name}</span>
        </div>
        <button 
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--danger-bg,rgba(248,113,113,0.1))] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white transition-colors duration-200" 
          onClick={() => onDelete(category.id)}
          title="Delete Category"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[var(--text-secondary)]">Spent: <span className={`font-bold ${over ? 'text-[var(--danger)]' : 'text-[var(--text-primary)]'}`}>₹{category.spent.toLocaleString()}</span></span>
        <span className="font-medium text-[var(--text-secondary)]">Budget: <span className="font-bold text-[var(--text-primary)]">₹{category.budget.toLocaleString()}</span></span>
      </div>

      <div className="h-2.5 w-full bg-[var(--bg-input)] rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${pct}%`, backgroundColor: over ? 'var(--danger)' : category.color }} 
        />
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${over ? 'bg-[var(--danger-bg,rgba(248,113,113,0.1))] text-[var(--danger)]' : pct > 80 ? 'bg-[var(--warning-bg,rgba(251,191,36,0.1))] text-[var(--warning)]' : 'bg-[var(--success-bg,rgba(52,211,153,0.1))] text-[var(--success)]'}`}>
          {pct}% used
        </span>
        {over && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[var(--danger-bg,rgba(248,113,113,0.1))] text-[var(--danger)]">
            Over budget by ₹{(category.spent - category.budget).toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}
