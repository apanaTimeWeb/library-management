// RESPONSIBILITY: Renders the Admin Dashboard, fetching data server-side and displaying KPI metrics, seating, and actions.
// DATA FLOW: Server Fetch -> AdminDashboardPage -> (AdminReusableKpiCard, AdminReusableSeatMatrixGrid, AdminReusableActionItemsList, AdminReusableRecentPaymentsFeed)

import { cookies } from 'next/headers';
import { ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import AdminReusableKpiCard from '@/app/admin/admin_reusable/admin_reusable_components/AdminReusableKpiCard/AdminReusableKpiCard';
import AdminReusableSeatMatrixGrid, { type AdminReusableSeatData } from '@/app/admin/admin_reusable/admin_reusable_components/AdminReusableSeatMatrixGrid/AdminReusableSeatMatrixGrid';
import AdminReusableActionItemsList, { type AdminReusableActionItem } from '@/app/admin/admin_reusable/admin_reusable_components/AdminReusableActionItemsList/AdminReusableActionItemsList';
import AdminReusableRecentPaymentsFeed, { type AdminReusablePayment } from '@/app/admin/admin_reusable/admin_reusable_components/AdminReusableRecentPaymentsFeed/AdminReusableRecentPaymentsFeed';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ADMIN_KPI_META, ADMIN_ACTION_ICONS } from '@/app/admin/admin_constants/admin_constants';
import { fetchAdminDashboard } from '@/app/admin/admin_dashboard/admin_dashboard_api/admin_dashboard_api';

async function getDashboardData() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value || '';
  const response = await fetchAdminDashboard(token);
  
  if (!response.success) {
    return null;
  }
  return response.data;
}

interface DashboardData {
  actionItems: { label: string; count: number; type: string; href?: string }[];
  kpiCards: { label: string; value: string; trend: { value: string; up: boolean }; sub: string }[];
  seats: AdminReusableSeatData[];
  shifts: string[];
  recentPayments: AdminReusablePayment[];
}

export default async function AdminDashboardPage() {
  const rawData = await getDashboardData();
  if (!rawData) return <div className="p-8">Failed to load dashboard data. Check backend connection.</div>;
  const data = rawData as never as DashboardData;

  const actionItems: AdminReusableActionItem[] = data.actionItems?.map((a) => ({
    ...a,
    icon: ADMIN_ACTION_ICONS[a.label] ?? AlertCircle,
    type: a.type as 'danger' | 'warning',
    href: a.href || '#',
  })) || [];

  return (
    <div className="space-y-6 pb-10">

      {/* Breadcrumb + Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Smart Library 360 › Admin › Dashboard</p>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome back — here's what's happening today.</p>
        </div>
        <Link href="/admin/admin_reports">
          <Button variant="outline" size="sm">
            View Full Reports <ChevronRight size={14} className="ml-1" />
          </Button>
        </Link>
      </div>

      {/* Row 1: 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.kpiCards.map((card, i: number) => (
          <AdminReusableKpiCard
            key={i}
            label={card.label}
            value={card.value}
            icon={ADMIN_KPI_META[i].icon}
            iconColor={ADMIN_KPI_META[i].iconColor}
            iconBg={ADMIN_KPI_META[i].iconBg}
            trend={card.trend}
            sub={card.sub}
          />
        ))}
      </div>

      {/* Row 2: Seat Matrix (60%) + Action Items (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col h-full">
          <AdminReusableSeatMatrixGrid seats={data.seats || []} shifts={data.shifts || []} />
        </div>

        <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full">
          <Card className="flex flex-col h-full border-border bg-bg-card shadow-none">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base">Action Items</CardTitle>
              <CardDescription className="text-xs">
                {data.actionItems?.reduce((s: number, a) => s + a.count, 0) || 0} items need your attention
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4 flex-1">
              <AdminReusableActionItemsList items={actionItems} />
            </CardContent>

            <div className="px-4 pb-3">
              <div className="flex items-start gap-2 bg-info/10 border border-info/20 p-3 rounded-md">
                <span className="text-sm">💡</span>
                <p className="text-xs text-info font-medium leading-relaxed">
                  5 students expire within 7 days. Consider sending renewal reminders via WhatsApp.
                </p>
              </div>
            </div>

            <CardFooter className="pt-2 pb-4 border-t px-4">
              <Button asChild variant="ghost" className="w-full text-xs text-muted-foreground hover:text-text-primary">
                <Link href="/admin/admin_audit-logs">
                  View All Activities <ChevronRight size={13} className="ml-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Row 3: Recent Payments AG Grid */}
      <AdminReusableRecentPaymentsFeed payments={data.recentPayments || []} />
    </div>
  );
}
