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
  LogOut, Menu, X, LucideIcon
} from 'lucide-react';

import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
import { ManagerSidebarProps, ManagerNavItem } from '@/app/manager/manager_types/manager_types';

const NAV: ManagerNavItem[] = [
  { href: MANAGER_ROUTES.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
  { href: MANAGER_ROUTES.REPORTS,   icon: BarChart2,       label: 'Reports'   },
  { group: 'CRM' },
  { href: MANAGER_ROUTES.CRM_ENQUIRIES,       icon: Phone,      label: 'Enquiries'        },
  { group: 'Students' },
  { href: MANAGER_ROUTES.STUDENTS,            icon: Users,      label: 'All Students'     },
  { href: MANAGER_ROUTES.STUDENTS_NEW,        icon: UserPlus,   label: 'New Admission'    },
  { href: MANAGER_ROUTES.STUDENTS_GROUP,      icon: Users2,     label: 'Group Admission'  },
  { href: MANAGER_ROUTES.STUDENTS_ALUMNI,     icon: UserCheck,  label: 'Alumni'           },
  { href: MANAGER_ROUTES.DOCUMENTS,           icon: FolderOpen, label: 'Document Vault'   },
  { href: MANAGER_ROUTES.STUDENTS_REFERRALS,  icon: Award,      label: 'Referral Bonus'   },
  { href: MANAGER_ROUTES.STUDENTS_ID_CARD,    icon: CreditCard, label: 'ID Card Generator'},
  { group: 'Seats & Shifts' },
  { href: MANAGER_ROUTES.SEATS_SHIFTS_LOCKERS + '/seat-matrix',      icon: LayoutGrid,     label: 'Seat Matrix'     },
  { href: MANAGER_ROUTES.SEATS_SHIFTS_LOCKERS + '/seat-management',  icon: Armchair,       label: 'Seats'           },
  { href: MANAGER_ROUTES.SEATS_SHIFTS_LOCKERS + '/shift-management', icon: RefreshCw,      label: 'Shifts'          },
  { href: MANAGER_ROUTES.SEATS_SHIFTS_LOCKERS + '/shift-migration',  icon: ArrowLeftRight, label: 'Shift Migration' },
  { href: MANAGER_ROUTES.SEATS_SHIFTS_LOCKERS + '/allocations',      icon: ClipboardList,  label: 'Allocations'     },
  { href: MANAGER_ROUTES.SEATS_SHIFTS_LOCKERS + '/seat-history',     icon: History,        label: 'Seat History'    },
  { href: MANAGER_ROUTES.SEATS_SHIFTS_LOCKERS + '/lockers',          icon: Lock,           label: 'Lockers'         },
  { href: MANAGER_ROUTES.SEATS_SHIFTS_LOCKERS + '/locker-matrix',    icon: LayoutGrid,     label: 'Locker Matrix'   },
  { group: 'Finance' },
  { href: MANAGER_ROUTES.FINANCE_COLLECT_FEE,       icon: IndianRupee, label: 'Collect Fee'       },
  { href: MANAGER_ROUTES.SUBSCRIPTIONS,             icon: FileText,    label: 'Subscriptions'     },
  { href: MANAGER_ROUTES.FINANCE_RENEWALS,          icon: RotateCcw,   label: 'Renewals'          },
  { href: MANAGER_ROUTES.FINANCE_PAYMENTS,          icon: CreditCard,  label: 'Payments'          },
  { href: MANAGER_ROUTES.FINANCE_PAYMENT_PROMISES,  icon: Handshake,   label: 'Payment Promises'  },
  { href: MANAGER_ROUTES.FINANCE_TRUST_SCORE,       icon: Shield,      label: 'Trust Scores'      },
  { href: MANAGER_ROUTES.FINANCE_SECURITY_DEPOSITS, icon: Wallet,      label: 'Security Deposits' },
  { href: MANAGER_ROUTES.FINANCE_LATE_FEES,         icon: Clock,       label: 'Late Fees'         },
  { href: MANAGER_ROUTES.FINANCE_AUTO_SUSPEND,      icon: Ban,         label: 'Auto-Suspend'      },
  { href: MANAGER_ROUTES.FINANCE_INVOICE,           icon: Receipt,     label: 'Invoice'           },
  { href: MANAGER_ROUTES.FINANCE_RECEIPT,           icon: BookOpen,    label: 'Receipt'           },
  { href: MANAGER_ROUTES.FINANCE_REFERRALS,         icon: Award,       label: 'Referrals'         },
  { href: MANAGER_ROUTES.FINANCE_REFUNDS,           icon: DollarSign,  label: 'Refunds'           },
  { group: 'Operations' },
  { href: MANAGER_ROUTES.ENGAGEMENT_ATTENDANCE,       icon: CalendarCheck,  label: 'Attendance'       },
  { href: MANAGER_ROUTES.ENGAGEMENT_ABSENTEE_REPORT,  icon: ClipboardCheck, label: 'Absentee Report'  },
  { href: MANAGER_ROUTES.ENGAGEMENT_QR_SCANNER,       icon: QrCode,         label: 'QR Scanner'       },
  { href: MANAGER_ROUTES.ENGAGEMENT_HOLIDAY_CALENDAR, icon: Calendar,       label: 'Holiday Calendar' },
  { group: 'Accounts & Assets' },
  { href: MANAGER_ROUTES.ACCOUNTING_EXPENSES,          icon: TrendingUp, label: 'Expenses'          },
  { href: MANAGER_ROUTES.ACCOUNTING_DAILY_SETTLEMENT,  icon: Receipt,    label: 'Daily Settlement'  },
  { href: MANAGER_ROUTES.ACCOUNTING_SEAT_GAP_REPORT,   icon: LayoutGrid, label: 'Seat Gap Report'   },
  { href: MANAGER_ROUTES.ACCOUNTING_ASSETS,            icon: BarChart,   label: 'Assets'            },
  { href: MANAGER_ROUTES.ACCOUNTING_ASSET_MAINTENANCE, icon: BarChart,   label: 'Asset Maintenance' },
  { group: 'Communication' },
  { href: MANAGER_ROUTES.COMMUNICATION_NOTICES,             icon: Bell,          label: 'Notices'             },
  { href: MANAGER_ROUTES.COMMUNICATION_COMPLAINTS,          icon: MessageSquare, label: 'Complaints'          },
  { href: MANAGER_ROUTES.COMMUNICATION_NOTIFICATION_CENTER, icon: BellRing,      label: 'Notification Center' },
  { href: MANAGER_ROUTES.COMMUNICATION_WHATSAPP_LOGS,       icon: Smartphone,    label: 'WhatsApp Logs'       },
  { href: MANAGER_ROUTES.COMMUNICATION_WHATSAPP_TEMPLATES,  icon: Smartphone,    label: 'WhatsApp Templates'  },
];

// All nav hrefs for specificity check
const ALL_HREFS = NAV.filter((n): n is { href: string; icon: LucideIcon; label: string } => 'href' in n).map(n => n.href);

const ICON_COLORS = ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--info)', 'var(--purple)', 'var(--danger)', 'var(--primary)'];

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
        className={`fixed top-0 left-0 h-screen bg-sidebar border-r border-border z-50 flex flex-col transition-all duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${collapsed ? 'w-[60px]' : 'w-[240px]'}`}
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
            <span className="font-bold text-text-primary truncate"><BookOpen size={14} className="inline mr-[6px]" />Smart Library 360</span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {NAV.map((item, i) => {
            if ('group' in item) {
              if (collapsed && !mobileOpen) return null;
              return <div key={i} className="px-3 text-xs font-bold uppercase tracking-wider text-text-secondary mt-6 mb-2">{item.group}</div>;
            }
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-primary-subtle text-primary' : 'text-text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary'}`}
                title={(collapsed && !mobileOpen) ? item.label : undefined}
                onClick={mobileOpen ? onMobileClose : undefined}
              >
                <Icon size={15} className={`shrink-0 ${active ? 'text-primary' : 'text-text-secondary'}`} />
                {(!collapsed || mobileOpen) && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {(!collapsed || mobileOpen) && (
          <div className="p-4 border-t border-border flex items-center gap-3 bg-page/50">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">MG</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">Manager</p>
              <p className="text-xs text-text-secondary truncate">manager@library.com</p>
            </div>
            <button className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors" aria-label="Log out" onClick={() => setShowLogout(true)}>
              <LogOut size={14} />
            </button>
          </div>
        )}
      </aside>

      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowLogout(false)}>
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
            <p className="text-lg font-bold text-text-primary mb-2">Log out?</p>
            <p className="text-sm text-text-secondary mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3 mt-6">
              <button className="bg-transparent border border-border text-text-primary rounded-lg px-4 py-2 text-sm font-medium hover:bg-page transition-colors" onClick={() => setShowLogout(false)}>Cancel</button>
              <button className="bg-danger text-white rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity" onClick={() => router.push('/auth/login')}>Log out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


