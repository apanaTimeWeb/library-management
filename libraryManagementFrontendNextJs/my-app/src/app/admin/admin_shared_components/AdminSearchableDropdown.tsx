'use client';
// RESPONSIBILITY: Generic searchable dropdown component for the admin module. Wraps a native <select> with consistent design system styling.

import React from 'react';
import type { AdminSearchableDropdownProps } from '@/app/admin/admin_shared_components/AdminSharedTypes';

export function AdminSearchableDropdown({ options, onValueChange, className, onChange, ...props }: AdminSearchableDropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onValueChange) onValueChange(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <select
      className={`flex h-10 w-full items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
      onChange={handleChange}
      {...props}
    >
      {options && options.map((opt) => {
        if (typeof opt === 'string') {
          return <option key={opt} value={opt}>{opt}</option>;
        }
        return <option key={opt.value} value={opt.value}>{opt.label}</option>;
      })}
      {!options && props.children}
    </select>
  );
}
