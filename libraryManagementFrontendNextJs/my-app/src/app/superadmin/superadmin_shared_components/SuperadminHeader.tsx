'use client';
// RESPONSIBILITY: Renders the SuperadminHeader component.
import { Building2, Bell, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAdmin } from '@/app/admin/admin_store/AdminContext';
import { SuperadminSelect, SuperadminSelectContent, SuperadminSelectItem, SuperadminSelectTrigger, SuperadminSelectValue } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminSelect';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminHeaderProps } from '@/app/superadmin/superadmin_shared_components/superadmin_shared_types';

export default function SuperadminHeader({ sidebarWidth, onMobileOpen }: SuperadminHeaderProps) {
  const { selectedBranch, setSelectedBranch } = useAdmin();

  return (
    <header className="fixed top-0 right-0 h-16 bg-bg-header border-b border-border z-40 flex items-center justify-between px-6 transition-all duration-300" style={{ left: sidebarWidth }}>

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
            <SuperadminSelectTrigger className="w-40 h-8 text-sm font-medium border-none shadow-none bg-transparent hover:bg-muted/50 focus:ring-0">
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
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-danger border-2 border-bg-header" />
        </SuperadminButton>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold ring-2 ring-primary/20">
          SA
        </div>
      </div>
    </header>
  );
}
