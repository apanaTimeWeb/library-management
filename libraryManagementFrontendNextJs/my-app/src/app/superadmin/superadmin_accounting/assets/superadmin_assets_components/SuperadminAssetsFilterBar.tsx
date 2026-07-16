import React from 'react';

interface Props {
  categories: string[];
  catFilter: string;
  setCatFilter: (val: string) => void;
}

export function SuperadminAssetsFilterBar({ categories, catFilter, setCatFilter }: Props) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-4 shadow-sm mb-6 flex items-center gap-3">
      <label className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Filter Category:</label>
      <select 
        className="bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md)] py-1.5 px-3 text-sm font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors shadow-inner" 
        value={catFilter} 
        onChange={e => setCatFilter(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}
