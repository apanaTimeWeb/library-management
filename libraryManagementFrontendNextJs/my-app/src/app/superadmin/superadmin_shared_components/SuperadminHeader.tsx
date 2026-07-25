'use client';
// RESPONSIBILITY: Renders the SuperadminHeader component.
import React, { useState } from 'react';
import { Building2, Bell, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SuperadminHeaderProps } from '@/app/superadmin/superadmin_shared_components/SuperadminSharedTypes';

export default function SuperadminHeader({ sidebarWidth, onMobileOpen }: SuperadminHeaderProps) {
  const [selectedBranch, setSelectedBranch] = useState('Main Branch');

  return (
    <header className={`fixed top-0 right-0 h-16 bg-header border-b border-border z-40 flex items-center justify-between px-6 transition-all duration-300 left-0 ${sidebarWidth === 60 ? 'md:left-[60px]' : 'md:left-[240px]'}`}>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMobileOpen}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </Button>

        <div className="flex items-center gap-2">
          <Building2 size={15} className="text-muted-foreground hidden sm:block" />
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-[180px] h-9 border-border bg-card">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Branches">All Branches</SelectItem>
              <SelectItem value="Main Branch">Main Branch</SelectItem>
              <SelectItem value="North Branch">North Branch</SelectItem>
              <SelectItem value="South Branch">South Branch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
          <Bell size={17} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-danger border-2 border-bg-header" />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold ring-2 ring-primary/20">
          SA
        </div>
      </div>
    </header>
  );
}
