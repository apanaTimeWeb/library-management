'use client';

import { Building2, Bell, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAdmin } from '@/app/admin/admin_context/AdminContext';
import { SuperadminSelect, SuperadminSelectContent, SuperadminSelectItem, SuperadminSelectTrigger, SuperadminSelectValue } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminSelect';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';

interface HeaderProps {
  sidebarWidth: number;
  onMobileOpen: () => void;
}

export default function SuperadminHeader({ sidebarWidth, onMobileOpen }: HeaderProps) {
  const { selectedBranch, setSelectedBranch } = useAdmin();

  return (
    <header className="admin-header" style={{ left: sidebarWidth }}>

      <div className="flex items-center gap-3">
        <SuperadminButton
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onMobileOpen}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </SuperadminButton>

        <div className="flex items-center gap-2">
          <Building2 size={15} className="text-muted-foreground hidden sm:block" />
          <SuperadminSelect value={selectedBranch} onValueChange={setSelectedBranch}>
            <SuperadminSelectTrigger className="w-[160px] h-8 text-sm font-medium border-none shadow-none bg-transparent hover:bg-muted/50 focus:ring-0">
              <SuperadminSelectValue placeholder="Select Branch" />
            </SuperadminSelectTrigger>
            <SuperadminSelectContent>
              <SuperadminSelectItem value="Main Branch">Main Branch</SuperadminSelectItem>
              <SuperadminSelectItem value="Branch 2">Branch 2</SuperadminSelectItem>
              <SuperadminSelectItem value="Kothrud Center">Kothrud Center</SuperadminSelectItem>
              <SuperadminSelectItem value="Nashik Branch">Nashik Branch</SuperadminSelectItem>
            </SuperadminSelectContent>
          </SuperadminSelect>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <SuperadminButton variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
          <Bell size={17} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
        </SuperadminButton>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
          LA
        </div>
      </div>
    </header>
  );
}
