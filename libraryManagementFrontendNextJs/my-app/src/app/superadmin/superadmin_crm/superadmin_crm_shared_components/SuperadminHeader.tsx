// RESPONSIBILITY: Renders the SuperadminHeader component.
'use client';
import { BellRing, Building2, Menu } from 'lucide-react';
import type { SuperadminCrmHeaderProps as HeaderProps } from '@/app/superadmin/superadmin_crm/superadmin_crm_types/SuperadminCrmTypes';

export default function SuperadminHeader({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-primary text-primary-foreground z-40 flex items-center justify-between px-4 shadow-md lg:ml-64 transition-all">
      {/* ── Brand ── */}
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile only) */}
        <button
          className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
          onClick={onMenuClick}
          title="Toggle sidebar"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="h-8 w-8 rounded-[var(--radius-md)] bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-inner">
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

        <span className="text-[18px] font-extrabold tracking-tight hidden sm:block">Smart Library 360</span>
      </div>

      {/* ── Right section ── */}
      <div className="flex items-center gap-4">
        {/* Branch chip */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-[12px] font-bold border border-white/10 backdrop-blur-sm">
          <Building2 size={14} className="opacity-80" />
          <span>Downtown Hub</span>
        </div>

        {/* Bell */}
        <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50" title="Notifications" aria-label="Notifications">
          <BellRing size={18} />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-danger border-2 border-primary" />
        </button>

        {/* Avatar + name */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/20">
          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-[12px] font-bold border border-white/30">LA</div>
          <span className="text-[14px] font-bold hidden sm:block">Library Admin</span>
        </div>
      </div>
    </header>
  );
}
