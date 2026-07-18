'use client';

// RESPONSIBILITY: Collapsible sidebar navigation for the Manager shell. Manages active route highlighting and mobile overlay.

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, BarChart2, Phone, Users, UserPlus, Users2,
  UserCheck, FolderOpen, Award, LayoutGrid, Armchair, RefreshCw,
  ArrowLeftRight, ClipboardList, History, Lock, IndianRupee,
  FileText, RotateCcw, CreditCard, Handshake, Shield, Clock,
  Ban, Receipt, DollarSign, CalendarCheck, ClipboardCheck,
  QrCode, Calendar, TrendingUp, BarChart, Wallet, BookOpen,
  MessageSquare, Bell, BellRing, Smartphone,
  LogOut, Menu, X, type LucideIcon,
} from 'lucide-react';

type NavItem = { group: string } | { href: string; icon: LucideIcon; label: string };

const NAV: NavItem[] = [
  { href: '/manager/manager_dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/manager/manager_reports',   icon: BarChart2,       label: 'Reports'   },
  { group: 'CRM' },
  { href: '/manager/manager_crm/enquiries',       icon: Phone,      label: 'Enquiries'        },
  { group: 'Students' },
  { href: '/manager/manager_students',            icon: Users,      label: 'All Students'     },
  { href: '/manager/manager_students/new',        icon: UserPlus,   label: 'New Admission'    },
  { href: '/manager/manager_students/group',      icon: Users2,     label: 'Group Admission'  },
  { href: '/manager/manager_students/alumni',     icon: UserCheck,  label: 'Alumni'           },
  { href: '/manager/manager_documents',           icon: FolderOpen, label: 'Document Vault'   },
  { href: '/manager/manager_students/referrals',  icon: Award,      label: 'Referral Bonus'   },
  { href: '/manager/manager_students/id-card',    icon: CreditCard, label: 'ID Card Generator'},
  { group: 'Seats & Shifts' },
  { href: '/manager/manager_seats_shifts_lockers/seat-matrix',      icon: LayoutGrid,     label: 'Seat Matrix'     },
  { href: '/manager/manager_seats_shifts_lockers/seat-management',  icon: Armchair,       label: 'Seats'           },
  { href: '/manager/manager_seats_shifts_lockers/shift-management', icon: RefreshCw,      label: 'Shifts'          },
  { href: '/manager/manager_seats_shifts_lockers/shift-migration',  icon: ArrowLeftRight, label: 'Shift Migration' },
  { href: '/manager/manager_seats_shifts_lockers/allocations',      icon: ClipboardList,  label: 'Allocations'     },
  { href: '/manager/manager_seats_shifts_lockers/seat-history',     icon: History,        label: 'Seat History'    },
  { href: '/manager/manager_seats_shifts_lockers/lockers',          icon: Lock,           label: 'Lockers'         },
  { href: '/manager/manager_seats_shifts_lockers/locker-matrix',    icon: LayoutGrid,     label: 'Locker Matrix'   },
  { group: 'Finance' },
  { href: '/manager/manager_finance/collect-fee',       icon: IndianRupee, label: 'Collect Fee'       },
  { href: '/manager/manager_finance/subscriptions',     icon: FileText,    label: 'Subscriptions'     },
  { href: '/manager/manager_finance/renewals',          icon: RotateCcw,   label: 'Renewals'          },
  { href: '/manager/manager_finance/payments',          icon: CreditCard,  label: 'Payments'          },
  { href: '/manager/manager_finance/payment-promises',  icon: Handshake,   label: 'Payment Promises'  },
  { href: '/manager/manager_finance/trust-score',       icon: Shield,      label: 'Trust Scores'      },
  { href: '/manager/manager_finance/security-deposits', icon: Wallet,      label: 'Security Deposits' },
  { href: '/manager/manager_finance/late-fees',         icon: Clock,       label: 'Late Fees'         },
  { href: '/manager/manager_finance/auto-suspend',      icon: Ban,         label: 'Auto-Suspend'      },
  { href: '/manager/manager_finance/invoice',           icon: Receipt,     label: 'Invoice'           },
  { href: '/manager/manager_finance/receipt',           icon: BookOpen,    label: 'Receipt'           },
  { href: '/manager/manager_finance/referrals',         icon: Award,       label: 'Referrals'         },
  { href: '/manager/manager_finance/refunds',           icon: DollarSign,  label: 'Refunds'           },
  { group: 'Operations' },
  { href: '/manager/manager_engagement/attendance',       icon: CalendarCheck,  label: 'Attendance'       },
  { href: '/manager/manager_engagement/absentee-report',  icon: ClipboardCheck, label: 'Absentee Report'  },
  { href: '/manager/manager_engagement/qr-scanner',       icon: QrCode,         label: 'QR Scanner'       },
  { href: '/manager/manager_engagement/holiday-calendar', icon: Calendar,       label: 'Holiday Calendar' },
  { group: 'Accounts & Assets' },
  { href: '/manager/manager_accounting/expenses',          icon: TrendingUp, label: 'Expenses'          },
  { href: '/manager/manager_accounting/daily-settlement',  icon: Receipt,    label: 'Daily Settlement'  },
  { href: '/manager/manager_accounting/seat-gap-report',   icon: LayoutGrid, label: 'Seat Gap Report'   },
  { href: '/manager/manager_accounting/assets',            icon: BarChart,   label: 'Assets'            },
  { href: '/manager/manager_accounting/asset-maintenance', icon: BarChart,   label: 'Asset Maintenance' },
  { group: 'Communication' },
  { href: '/manager/manager_communication/notices',             icon: Bell,          label: 'Notices'             },
  { href: '/manager/manager_communication/complaints',          icon: MessageSquare, label: 'Complaints'          },
  { href: '/manager/manager_communication/notification-center', icon: BellRing,      label: 'Notification Center' },
  { href: '/manager/manager_communication/whatsapp-logs',       icon: Smartphone,    label: 'WhatsApp Logs'       },
  { href: '/manager/manager_communication/whatsapp-templates',  icon: Smartphone,    label: 'WhatsApp Templates'  },
];

// All nav hrefs for specificity check
const ALL_HREFS = NAV.filter((n): n is { href: string; icon: LucideIcon; label: string } => 'href' in n).map(n => n.href);

const ICON_COLORS = ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--info)', 'var(--purple)', 'var(--danger)', 'var(--primary)'];

import { ManagerSidebarProps } from '@/app/manager/manager_types/manager_types';

export default function ManagerSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: ManagerSidebarProps) {
  const pathname = usePathname();
  const router   = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  function isActive(href: string): boolean {
    if (pathname === href) return true;
    if (href !== '/' && pathname.startsWith(href + '/')) {
      const moreSpecific = ALL_HREFS.some(
        other => other !== href && other.startsWith(href) && pathname.startsWith(other)
      );
      return !moreSpecific;
    }
    return false;
  }

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onMobileClose} aria-hidden="true" />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-bg-sidebar border-r border-border z-50 flex flex-col transition-all duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ width: collapsed ? 60 : 240 }}
      >
        <div className="h-16 flex items-center px-4 border-b border-border shrink-0 gap-3">
          <button
            onClick={mobileOpen ? onMobileClose : onToggle}
            className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label={mobileOpen ? 'Close sidebar' : 'Toggle sidebar'}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {(!collapsed || mobileOpen) && (
            <span className="font-bold text-text-primary truncate"><BookOpen size={14} style={{ display: 'inline', marginRight: 6 }} />Smart Library 360</span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {NAV.map((item, i) => {
            if ('group' in item) {
              if (collapsed && !mobileOpen) return null;
              return <div key={i} className="px-3 text-[11px] font-bold uppercase tracking-wider text-text-secondary mt-6 mb-2">{item.group}</div>;
            }
            const Icon = item.icon;
            const active = isActive(item.href);
            const color = ICON_COLORS[i % ICON_COLORS.length];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${active ? 'bg-primary-subtle text-primary' : 'text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary'}`}
                title={(collapsed && !mobileOpen) ? item.label : undefined}
                onClick={mobileOpen ? onMobileClose : undefined}
              >
                <Icon size={15} className="shrink-0" style={{ color: active ? 'inherit' : color }} />
                {(!collapsed || mobileOpen) && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {(!collapsed || mobileOpen) && (
          <div className="p-4 border-t border-border flex items-center gap-3 bg-bg-page/50">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[13px] font-bold shrink-0">MG</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">Manager</p>
              <p className="text-[11px] text-text-secondary truncate">manager@library.com</p>
            </div>
            <button className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors" aria-label="Log out" onClick={() => setShowLogout(true)}>
              <LogOut size={14} />
            </button>
          </div>
        )}
      </aside>

      {showLogout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowLogout(false)}>
          <div className="bg-bg-card border border-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
            <p className="text-lg font-bold text-text-primary mb-2">Log out?</p>
            <p className="text-sm text-text-secondary mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3 mt-6">
              <button className="bg-transparent border border-border text-text-primary rounded-lg px-4 py-2 text-sm font-medium hover:bg-bg-page transition-colors" onClick={() => setShowLogout(false)}>Cancel</button>
              <button className="bg-danger text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity" onClick={() => router.push('/auth/login')}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
