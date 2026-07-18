'use client';
import { NavGroup, NavItem } from './SuperadminSidebar_types';
// RESPONSIBILITY: Renders the SuperadminSidebar component.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/superadmin_url_config';
import {
  LayoutDashboard, BarChart2, PhoneCall, Users, UserPlus, Users2,
  GraduationCap, FolderLock, Medal, LayoutGrid, Armchair, Timer,
  ArrowLeftRight, ClipboardList, ScrollText, Lock, Map, IndianRupee,
  RefreshCw, CreditCard, Wallet, Handshake, ShieldCheck, FileStack,
  Clock, Ban, Receipt, FileText, UserCheck, CalendarDays, ClipboardCheck,
  ScanQrCode, CalendarX, BadgeDollarSign, TrendingUp, Activity, Sofa,
  Wrench, Megaphone, MessageSquare, Bell, Smartphone, Building2, KeyRound,
  Tag, Hourglass, ShieldX, PackageSearch, Download, HardDrive, FileCheck2,
  Settings, UserCircle, Palette, type LucideProps,
} from 'lucide-react';
import type { FC } from 'react';



const NAV: NavGroup[] = [
  {
    group: '',
    items: [
      { href: '/superadmin/superadmin_dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { href: '/superadmin/superadmin_reports',   icon: BarChart2,        label: 'Reports'   },
    ],
  },
  {
    group: 'CRM',
    items: [{ href: '/superadmin/superadmin_crm/enquiries', icon: PhoneCall, label: 'Enquiries' }],
  },
  {
    group: 'Students',
    items: [
      { href: '/manager/manager_students',                 icon: Users,         label: 'All Students'    },
      { href: '/manager/manager_students/new',   icon: UserPlus,      label: 'New Admission'   },
      { href: '/manager/manager_students/group-admission', icon: Users2,        label: 'Group Admission' },
      { href: '/superadmin/superadmin_alumni',                   icon: GraduationCap, label: 'Alumni'          },
      { href: '/superadmin/superadmin_document-vault',           icon: FolderLock,    label: 'Document Vault'  },
      { href: '/superadmin/superadmin_referral-bonus',           icon: Medal,         label: 'Referral Bonus'  },
    ],
  },
  {
    group: 'Seats & Shifts',
    items: [
      { href: '/superadmin/superadmin_seats_shifts_lockers/seat-matrix',     icon: LayoutGrid,     label: 'Seat Matrix'     },
      { href: '/superadmin/superadmin_seats',           icon: Armchair,       label: 'Seats'           },
      { href: '/superadmin/superadmin_shifts',          icon: Timer,          label: 'Shifts'          },
      { href: '/superadmin/superadmin_shift-migration', icon: ArrowLeftRight, label: 'Shift Migration' },
      { href: '/superadmin/superadmin_allocations',     icon: ClipboardList,  label: 'Allocations'     },
      { href: '/superadmin/superadmin_seat-history',    icon: ScrollText,     label: 'Seat History'    },
      { href: '/superadmin/superadmin_lockers',         icon: Lock,           label: 'Lockers'         },
      { href: '/superadmin/superadmin_locker-matrix',   icon: Map,            label: 'Locker Matrix'   },
    ],
  },
  {
    group: 'Finance',
    items: [
      { href: '/superadmin/superadmin_collect-fee',       icon: IndianRupee,     label: 'Collect Fee'       },
      { href: '/superadmin/superadmin_subscriptions',     icon: FileStack,       label: 'Subscriptions'     },
      { href: '/superadmin/superadmin_renewals',          icon: RefreshCw,       label: 'Renewals'          },
      { href: '/superadmin/superadmin_payments',          icon: CreditCard,      label: 'Payments'          },
      { href: '/superadmin/superadmin_payment-promises',  icon: Handshake,       label: 'Payment Promises'  },
      { href: '/superadmin/superadmin_trust-scores',      icon: ShieldCheck,     label: 'Trust Scores'      },
      { href: '/superadmin/superadmin_security-deposits', icon: Wallet,          label: 'Security Deposits' },
      { href: '/superadmin/superadmin_late-fees',         icon: Clock,           label: 'Late Fees'         },
      { href: '/superadmin/superadmin_auto-suspend',      icon: Ban,             label: 'Auto-Suspend'      },
      { href: '/superadmin/superadmin_invoices',          icon: Receipt,         label: 'Invoices'          },
      { href: '/superadmin/superadmin_receipts',          icon: FileText,        label: 'Receipts'          },
      { href: '/superadmin/superadmin_referrals',         icon: UserCheck,       label: 'Referrals'         },
      { href: '/superadmin/superadmin_refunds',           icon: BadgeDollarSign, label: 'Refunds'           },
    ],
  },
  {
    group: 'Operations',
    items: [
      { href: '/superadmin/superadmin_attendance',       icon: CalendarDays,   label: 'Attendance'       },
      { href: '/superadmin/superadmin_absentee-report',  icon: ClipboardCheck, label: 'Absentee Report'  },
      { href: '/superadmin/superadmin_qr-scanner',       icon: ScanQrCode,     label: 'QR Scanner'       },
      { href: '/superadmin/superadmin_holiday-calendar', icon: CalendarX,      label: 'Holiday Calendar' },
    ],
  },
  {
    group: 'Accounts & Assets',
    items: [
      { href: '/superadmin/superadmin_accounting/expenses',           icon: BadgeDollarSign, label: 'Expenses'           },
      { href: '/superadmin/superadmin_accounting/financial-reports',  icon: TrendingUp,      label: 'Financial Reports'  },
      { href: '/superadmin/superadmin_accounting/daily-settlement',   icon: Activity,        label: 'Daily Settlement'   },
      { href: '/superadmin/superadmin_accounting/seat-gap-report',    icon: Sofa,            label: 'Seat Gap Report'    },
      { href: '/superadmin/superadmin_accounting/shift-gap-analyzer', icon: ArrowLeftRight,  label: 'Shift Gap Analyzer' },
      { href: '/superadmin/superadmin_accounting/assets',             icon: PackageSearch,   label: 'Assets'             },
      { href: '/superadmin/superadmin_accounting/asset-maintenance',  icon: Wrench,          label: 'Asset Maintenance'  },
    ],
  },
  {
    group: 'Communication',
    items: [
      { href: '/superadmin/superadmin_communication/notices',             icon: Megaphone,     label: 'Notices'             },
      { href: '/superadmin/superadmin_communication/complaints',          icon: MessageSquare, label: 'Complaints'          },
      { href: '/superadmin/superadmin_communication/notification-center', icon: Bell,          label: 'Notification Center' },
      { href: '/superadmin/superadmin_communication/whatsapp-logs',       icon: Smartphone,    label: 'WhatsApp Logs'      },
      { href: '/superadmin/superadmin_communication/whatsapp-templates',  icon: FileCheck2,    label: 'WhatsApp Templates'  },
    ],
  },
  {
    group: 'Admin',
    items: [
      { href: '/superadmin/superadmin_branches',     icon: Building2,      label: 'Branches'           },
      { href: '/superadmin/superadmin_staff',        icon: Users2,         label: 'Staff & Users'      },
      { href: '/superadmin/superadmin_permissions',  icon: KeyRound,       label: 'Permissions'        },
      { href: '/superadmin/superadmin_plans',        icon: IndianRupee,    label: 'Plans'              },
      { href: '/superadmin/superadmin_coupons',      icon: Tag,            label: 'Coupons'            },
      { href: '/superadmin/superadmin_waitlist',     icon: Hourglass,      label: 'Waitlist'           },
      { href: '/superadmin/superadmin_blacklist',    icon: ShieldX,        label: 'Blacklist'          },
      { href: '/superadmin/superadmin_audit-logs',   icon: ScrollText,     label: 'Audit Logs'         },
      { href: '/superadmin/superadmin_system/bulk-import',  icon: PackageSearch,  label: 'Bulk Import'        },
      { href: '/superadmin/superadmin_system/data-export',  icon: Download,       label: 'Data Export'        },
      { href: '/superadmin/superadmin_system/backups',      icon: HardDrive,      label: 'Backups'            },
      { href: '/superadmin/superadmin_gst-settings', icon: FileCheck2,     label: 'GST & Tax Settings' },
    ],
  },
  {
    group: 'System',
    items: [
      { href: '/superadmin/superadmin_system/settings',             icon: Settings,   label: 'Settings'             },
      { href: '/superadmin/superadmin_system/profile',              icon: UserCircle, label: 'Profile'              },
      { href: '/superadmin/superadmin_system/branding',             icon: Palette,    label: 'Branding'             },
      { href: '/superadmin/superadmin_system/whatsapp-integration', icon: Smartphone, label: 'WhatsApp Integration' },
    ],
  },
];

import type { SuperadminCrmSidebarProps as SidebarProps } from '@/app/superadmin/superadmin_crm/superadmin_crm_types/SuperadminCrmTypes';

export default function SuperadminSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-border z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
      {/* Spacer for mobile header overlap */}
      <div className="h-16 shrink-0 lg:hidden bg-primary shadow-sm" />

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {NAV.map((group, gi) => (
          <div key={gi} className="space-y-1.5">
            {group.group && <p className="px-3 text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">{group.group}</p>}

            {group.items.map(( item: NavItem ) => {
              const active =
                item.href === SUPERADMIN_ROUTES.CRM_ENQUIRIES
                  ? pathname.startsWith(SUPERADMIN_ROUTES.CRM_ENQUIRIES)
                  : pathname === item.href || pathname.startsWith(item.href + '/');
                  
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all cursor-pointer ${
                    active 
                      ? 'bg-primary/10 text-primary font-bold shadow-sm' 
                      : 'text-text-secondary font-medium hover:bg-input hover:text-text-primary'
                  }`}
                  onClick={onClose}
                  title={item.label}
                >
                  <item.icon size={18} className={`${active ? 'text-primary' : 'opacity-70 group-hover:opacity-100'}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className="h-4 shrink-0 bg-gradient-to-t from-sidebar to-transparent sticky bottom-0" />
    </aside>
  );
}
