'use client';
import { BellRing, Building2, Menu } from 'lucide-react';

// RESPONSIBILITY: Renders the top header for the CRM module.

interface ManagerCrmHeaderProps {
  onMenuClick?: () => void;
}

export function ManagerCrmHeader({ onMenuClick }: ManagerCrmHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6 bg-bg-header border-b border-border backdrop-blur-md">
      {/* ── Brand ── */}
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-transparent text-text-secondary cursor-pointer"
          onClick={onMenuClick}
          title="Toggle sidebar"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple flex items-center justify-center shadow-lg shadow-primary/40 shrink-0">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>

        <span className="text-base font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple">Smart Library 360</span>
      </div>

      {/* ── Right section ── */}
      <div className="flex items-center gap-2">
        {/* Branch chip */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-pointer bg-bg-input border border-border text-[13px] text-text-secondary transition-colors hover:border-text-secondary">
          <Building2 size={14} />
          <span>Downtown Hub</span>
        </div>

        {/* Bell */}
        <button className="relative flex items-center justify-center w-9 h-9 rounded-lg border-none bg-transparent cursor-pointer text-text-secondary transition-colors hover:bg-primary/10 hover:text-primary" title="Notifications" aria-label="Notifications">
          <BellRing size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border-2 border-bg-header" />
        </button>

        {/* Avatar + name */}
        <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg transition-colors hover:bg-primary/10">
          <div className="w-8 h-8 rounded-full shrink-0 bg-gradient-to-br from-primary to-purple flex items-center justify-center text-xs font-bold text-white">LA</div>
          <span className="text-[13px] font-medium text-text-primary">Library Admin</span>
        </div>
      </div>
    </header>
  );
}
