'use client';
// RESPONSIBILITY: Renders the global Command Palette overlay for quick module navigation.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Manager Dashboard', href: '/manager/manager_dashboard' },
  { label: 'Manager Students', href: '/manager/manager_students' },
  { label: 'Manager Engagement', href: '/manager/manager_engagement' },
  { label: 'Manager Seats, Shifts & Lockers', href: '/manager/manager_seats_shifts_lockers' },
  { label: 'Manager Documents', href: '/manager/manager_documents' },
  { label: 'Manager Communications', href: '/manager/manager_communication' },
  { label: 'Manager CRM', href: '/manager/manager_crm' },
  { label: 'Superadmin Dashboard', href: '/superadmin/superadmin_dashboard' },
  { label: 'Superadmin Setup Wizard', href: '/superadmin/superadmin_setup-wizard' },
  { label: 'Superadmin Support Tickets', href: '/superadmin/superadmin_support-tickets' },
  { label: 'Login', href: '/auth/login' },
];

export function GlobalCommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open]);

  const filtered = MENU_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (!open) return;
    const handleKeyNav = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          setOpen(false);
          router.push(filtered[selectedIndex].href);
        }
      }
    };
    document.addEventListener('keydown', handleKeyNav);
    return () => document.removeEventListener('keydown', handleKeyNav);
  }, [open, filtered, selectedIndex, router]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex items-start justify-center pt-32 sm:pt-40" onClick={() => setOpen(false)}>
      <div className="relative z-50 flex max-h-96 w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-2xl border border-border" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search size={18} className="text-text-secondary" />
          <input
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-tertiary text-lg"
            placeholder="Search modules..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-text-secondary hover:text-text-primary p-1 rounded-md hover:bg-bg-pageg-elevated transition-colors" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-text-secondary">No results found.</div>
          ) : (
            filtered.map((item, index) => (
              <button
                key={item.href}
                onClick={() => {
                  setOpen(false);
                  router.push(item.href);
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${selectedIndex === index ? 'bg-primary text-white shadow-sm shadow-primary/20' : 'text-text-primary hover:bg-primary/10 hover:text-primary'}`}
              >
                {item.label}
                <span className={`text-xs ${selectedIndex === index ? 'text-white/70' : 'text-text-tertiary group-hover:text-primary/70'}`}>Jump to</span>
              </button>
            ))
          )}
        </div>
        <div className="bg-bg-pageg-elevated px-4 py-2 border-t border-border flex items-center gap-4 text-xs text-text-secondary">
          <span className="flex items-center gap-1"><kbd className="bg-bg-pageg-card border border-border rounded px-1.5 py-0.5 font-sans shadow-sm text-text-primary">↑↓</kbd> to navigate</span>
          <span className="flex items-center gap-1"><kbd className="bg-bg-pageg-card border border-border rounded px-1.5 py-0.5 font-sans shadow-sm text-text-primary">↵</kbd> to select</span>
          <span className="flex items-center gap-1"><kbd className="bg-bg-pageg-card border border-border rounded px-1.5 py-0.5 font-sans shadow-sm text-text-primary">esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}

