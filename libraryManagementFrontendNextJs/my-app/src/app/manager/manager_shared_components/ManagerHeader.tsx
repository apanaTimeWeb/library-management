'use client';
// RESPONSIBILITY: Fixed top header for the Manager shell. Receives sidebar width and mobile open handler via props.

import { Bell, Menu, BookOpen } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

import { ManagerHeaderProps } from '@/app/manager/manager_types/manager_types';

export default function ManagerHeader({ collapsed, onMobileOpen }: ManagerHeaderProps) {
  const leftClass = collapsed ? 'md:left-[60px]' : 'md:left-[240px]';
  return (
    <header className={`fixed top-0 right-0 h-16 bg-header border-b border-border z-40 flex items-center justify-between px-6 transition-all duration-300 left-0 ${leftClass}`}>

      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-sidebar transition-colors" onClick={onMobileOpen} aria-label="Open menu">
          <Menu size={20} />
        </button>
        <BookOpen size={16} className="text-primary hidden md:block" />
        <span className="hidden md:block text-sm font-semibold text-text-primary">
          Smart Library 360
        </span>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="relative p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-sidebar transition-colors" aria-label="Notifications">
          <Bell size={17} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-bg-header" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold ring-2 ring-primary/20" title="Manager">
          MG
        </div>
      </div>

    </header>
  );
}

