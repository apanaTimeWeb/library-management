// RESPONSIBILITY: Renders the top header for the admin_crm sub-module. Receives onMenuClick via props. No API calls.
'use client';
// DATA FLOW: AdminCrmLayout -> AdminCrmHeader

import { BellRing, Building2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface AdminCrmHeaderProps {
  onMenuClick?: () => void;
}

export default function AdminCrmHeader({ onMenuClick }: AdminCrmHeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-card border-b border-border shrink-0 sticky top-0 z-30 shadow-sm">
      {/* ── Brand ── */}
      <div className="flex items-center gap-3">
        {/* Hamburger (mobile only) */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={onMenuClick}
          title="Toggle sidebar"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </Button>

        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shadow-sm">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>

        <span className="font-bold text-lg hidden sm:block tracking-tight">Smart Library 360</span>
      </div>

      {/* ── Right section ── */}
      <div className="flex items-center gap-4">
        {/* Branch chip */}
        <div className="hidden sm:flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full border border-border">
          <Building2 size={14} className="text-muted-foreground" />
          <span className="text-xs font-semibold">Downtown Hub</span>
        </div>

        {/* Bell */}
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground" title="Notifications" aria-label="Notifications">
          <BellRing size={18} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-danger rounded-full border border-card" />
        </Button>

        {/* Avatar + name */}
        <div className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l sm:border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shadow-sm">LA</div>
          <span className="text-sm font-semibold hidden md:block">Library Admin</span>
        </div>
      </div>
    </header>
  );
}
