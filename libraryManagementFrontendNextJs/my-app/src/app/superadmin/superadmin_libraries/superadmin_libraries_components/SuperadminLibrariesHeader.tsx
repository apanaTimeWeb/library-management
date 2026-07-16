import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export function SuperadminLibrariesHeader() {
  return (
    <div className="flex flex-col gap-1 mb-6">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-disabled uppercase tracking-widest mb-2">
        <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span className="text-primary">Libraries</span>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">Registered Libraries</h1>
        <Link href="/superadmin/superadmin_setup-wizard" className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold px-4 py-2.5 rounded-[var(--radius-md)] transition-all duration-200 active:scale-95 shadow-[0_0_10px_rgba(99,102,241,0.3)] hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]">
          <Plus size={16} /> Add Branch
        </Link>
      </div>
    </div>
  );
}
