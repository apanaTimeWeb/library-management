'use client';

// RESPONSIBILITY: Renders the sidebar navigation for the admin module.
// DATA FLOW: AdminRoute -> AdminSidebar

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ADMIN_SIDEBAR_NAV } from '@/app/admin/admin_constants/admin_constants';
import { logout } from '@/lib/auth';

export interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-card border-r border-border z-50 flex flex-col transition-all duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ width: collapsed && !mobileOpen ? 60 : 240 }}
      >
        <div className="h-16 flex items-center shrink-0 border-b border-border px-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={mobileOpen ? onMobileClose : onToggle}
            aria-label={mobileOpen ? 'Close sidebar' : 'Toggle sidebar'}
            className="h-8 w-8 hover:bg-muted/50"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
          {(!collapsed || mobileOpen) && (
            <span className="font-bold text-base text-foreground ml-3 truncate">📚 Smart Library</span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1">
          {ADMIN_SIDEBAR_NAV.map((item, i) => {
            if ('group' in item) {
              if (collapsed && !mobileOpen) return null;
              return <div key={i} className="px-3 pt-4 pb-1 text-xs font-bold tracking-wider text-muted-foreground uppercase">{item.group}</div>;
            }
            const Icon = item.icon;
            const isExactMatch = pathname === item.href;
            const isSubRouteMatch = pathname.startsWith(item.href + '/');
            const isActive = isExactMatch || (isSubRouteMatch && !ADMIN_SIDEBAR_NAV.some(
              nav => 'href' in nav && nav.href !== item.href && (pathname === nav.href || pathname.startsWith(nav.href + '/'))
            ));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                } ${collapsed && !mobileOpen ? 'justify-center' : ''}`}
                title={(collapsed && !mobileOpen) ? item.label : undefined}
                onClick={mobileOpen ? onMobileClose : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {(!collapsed || mobileOpen) && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {(!collapsed || mobileOpen) && (
          <div className="p-4 border-t border-border flex items-center gap-3 bg-muted/10 shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
              LA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate leading-tight">Library Admin</p>
              <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">admin@library.com</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-danger hover:bg-danger/10 ml-auto shrink-0"
              aria-label="Log out"
              onClick={() => setShowLogout(true)}
            >
              <LogOut size={16} />
            </Button>
          </div>
        )}
      </aside>

      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogContent className="max-w-[360px]">
          <DialogHeader>
            <DialogTitle>Log out?</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of your session?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 sm:justify-end gap-2">
            <Button variant="outline" onClick={() => setShowLogout(false)}>Cancel</Button>
            <Button variant="destructive" onClick={logout}>Log out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
