"use client";
// RESPONSIBILITY: Component or Page.
import React from 'react';
import { Search } from 'lucide-react';

export interface TableToolbarProps {
  search: string;
  onSearch: (s: string) => void;
  title?: string;
  placeholder?: string;
}

export function TableToolbar({ search, onSearch, title, placeholder = "Search..." }: TableToolbarProps) {
  return (
    <div className="p-4 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card rounded-t-[var(--radius-lg)]">
      {title ? (
        <h2 className="text-base font-bold text-text-primary">{title}</h2>
      ) : <div />}
      
      <div className="relative w-full sm:w-72">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
        <input 
          type="text" 
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-md text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}


