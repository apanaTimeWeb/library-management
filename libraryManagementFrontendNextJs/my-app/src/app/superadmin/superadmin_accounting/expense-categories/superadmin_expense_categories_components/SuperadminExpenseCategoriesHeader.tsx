// RESPONSIBILITY: Renders the SuperadminExpenseCategoriesHeader component.
import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onAddClick: () => void;
}

export function SuperadminExpenseCategoriesHeader({ onAddClick }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Expense Categories</h1>
        <p className="text-sm font-medium text-text-secondary">Manage budget allocation per expense category.</p>
      </div>
      <button 
        className="flex items-center justify-center gap-1.5 bg-info hover:opacity-90 text-white text-sm font-bold py-2 px-4 rounded-[var(--radius-md)] transition-opacity shadow-sm" 
        onClick={onAddClick}
      >
        <Plus size={16} /> Add Category
      </button>
    </div>
  );
}

