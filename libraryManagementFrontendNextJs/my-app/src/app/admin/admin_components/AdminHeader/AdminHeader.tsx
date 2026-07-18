// RESPONSIBILITY: Renders the top header for the admin module.
'use client';
// DATA FLOW: AdminRoute -> AdminHeader

import { Building2, Bell, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAdmin } from '@/app/admin/admin_context/AdminContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AdminHeaderProps } from "./AdminHeader_types";

export default function AdminHeader({ sidebarWidth, onMobileOpen }: AdminHeaderProps) {
  const { selectedBranch, setSelectedBranch } = useAdmin();

  return (
    <header 
      className="fixed top-0 right-0 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-6 z-40 transition-all duration-300 left-[length:var(--left)]" style={{ '--left': sidebarWidth } as React.CSSProperties}
    >

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
            <SelectTrigger className="w-40 h-8 text-sm font-medium border-none shadow-none bg-transparent hover:bg-muted/50 focus:ring-0">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Main Branch">Main Branch</SelectItem>
              <SelectItem value="Branch 2">Branch 2</SelectItem>
              <SelectItem value="Kothrud Center">Kothrud Center</SelectItem>
              <SelectItem value="Nashik Branch">Nashik Branch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
          <Bell size={17} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-danger" />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
          LA
        </div>
      </div>
    </header>
  );
}
