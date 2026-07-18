'use client';
// RESPONSIBILITY: Renders the maintenance dashboard UI including KPI cards and data tables. No logic.

import { SuperadminKpiCard } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminKpiCard';
import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { Wrench, Package, Lock, ChevronRight } from 'lucide-react';
import { useSuperadminSystemMaintenance } from '@/app/superadmin/superadmin_system/superadmin_system_maintenance_hooks/useSuperadminSystemMaintenance';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

export function SuperadminSystemMaintenanceClient() {
    const table = useClientTable(seats);
  const { seatsNeedingAttention, assetsOverdue, lockerIssues, seats, assets, lockers } = useSuperadminSystemMaintenance();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-medium tracking-wide mb-1">
          <span>System</span>
          <ChevronRight size={12} />
          <span>Maintenance</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
          <Wrench size={28} className="text-primary" />
          Maintenance Dashboard
        </h1>
        <p className="text-text-secondary mt-1 text-sm">Track and manage maintenance for seats, assets, and lockers.</p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SuperadminKpiCard title="Seats Needing Attention" value={seatsNeedingAttention} icon={() => <span>🪑</span>} trend="down" trendLabel="Action required" />
        <SuperadminKpiCard title="Assets Overdue" value={assetsOverdue} icon={() => <span>⚙️</span>} trend="down" trendLabel="Service overdue" />
        <SuperadminKpiCard title="Locker Issues" value={lockerIssues} icon={() => <span>🔒</span>} trend="down" trendLabel="Reported issues" />
      </div>

      {/* Section 1 — Seats */}
      <SuperadminCard className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Wrench size={18} className="text-primary" /> Seats</CardTitle>
          <CardDescription>Seat maintenance status and last service log.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wide">
                  <th className="text-left py-3 pr-4">Seat #</th>
                  <th className="text-left py-3 pr-4">Status</th>
                  <th className="text-left py-3 pr-4">Last Maintenance</th>
                  <th className="text-left py-3 pr-4">Days Since</th>
                  <th className="text-left py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {table.paginatedData.map((seat) => (
                  <tr key={seat.id} className="hover:bg-bg-pageg-card transition-colors cursor-pointer group">
                    <td className="py-3 pr-4 font-mono font-medium text-text-primary">{seat.id}</td>
                    <td className="py-3 pr-4">
                      <SuperadminBadge variant={seat.status === 'OK' ? 'success' : 'danger'}>{seat.status}</SuperadminBadge>
                    </td>
                    <td className="py-3 pr-4 text-text-secondary">{seat.lastMaint}</td>
                    <td className="py-3 pr-4">
                      <span className={seat.daysSince > 30 ? 'text-danger font-semibold' : 'text-text-secondary'}>
                        {seat.daysSince}d
                      </span>
                    </td>
                    <td className="py-3">
                      <SuperadminButton id={`log-seat-maint-${seat.id}`} variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <Wrench size={14} className="mr-1 inline-block" /> Log Maintenance
                      </SuperadminButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
          </div>
        </CardContent>
      </SuperadminCard>

      {/* Section 2 — Assets */}
      <SuperadminCard className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Package size={18} className="text-primary" /> Assets</CardTitle>
          <CardDescription>Equipment and inventory maintenance tracking.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wide">
                  <th className="text-left py-3 pr-4">Asset</th>
                  <th className="text-center py-3 pr-4">Qty</th>
                  <th className="text-left py-3 pr-4">Status</th>
                  <th className="text-left py-3 pr-4">Last Serviced</th>
                  <th className="text-left py-3 pr-4">Next Due</th>
                  <th className="text-left py-3 pr-4">Days Overdue</th>
                  <th className="text-left py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {assets.map((asset) => (
                  <tr key={asset.name} className="hover:bg-bg-pageg-card transition-colors cursor-pointer group">
                    <td className="py-3 pr-4 font-medium text-text-primary">{asset.name}</td>
                    <td className="py-3 pr-4 text-center text-text-secondary">{asset.qty}</td>
                    <td className="py-3 pr-4">
                      <SuperadminBadge variant={asset.status === 'OK' ? 'success' : asset.status === 'Due Soon' ? 'warning' : 'danger'}>
                        {asset.status}
                      </SuperadminBadge>
                    </td>
                    <td className="py-3 pr-4 text-text-secondary">{asset.lastServiced}</td>
                    <td className="py-3 pr-4 text-text-secondary">{asset.nextDue}</td>
                    <td className="py-3 pr-4">
                      {asset.daysOverdue > 0 ? (
                        <SuperadminBadge variant="danger">+{asset.daysOverdue}d overdue</SuperadminBadge>
                      ) : (
                        <span className="text-text-secondary text-xs">{Math.abs(asset.daysOverdue)}d left</span>
                      )}
                    </td>
                    <td className="py-3">
                      <SuperadminButton id={`log-asset-service-${asset.name.replace(/\s+/g, '-')}`} variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <Package size={14} className="mr-1 inline-block" /> Log Service
                      </SuperadminButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </SuperadminCard>

      {/* Section 3 — Lockers */}
      <SuperadminCard>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lock size={18} className="text-primary" /> Lockers</CardTitle>
          <CardDescription>Locker issue reports and status updates.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wide">
                  <th className="text-left py-3 pr-4">Locker #</th>
                  <th className="text-left py-3 pr-4">Status</th>
                  <th className="text-left py-3 pr-4">Last Reported Issue</th>
                  <th className="text-left py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {lockers.map((locker) => (
                  <tr key={locker.id} className="hover:bg-bg-pageg-card transition-colors cursor-pointer group">
                    <td className="py-3 pr-4 font-mono font-medium text-text-primary">{locker.id}</td>
                    <td className="py-3 pr-4">
                      <SuperadminBadge variant={locker.status === 'OK' ? 'success' : 'danger'}>{locker.status}</SuperadminBadge>
                    </td>
                    <td className="py-3 pr-4 text-text-secondary">{locker.lastIssue}</td>
                    <td className="py-3">
                      <SuperadminButton id={`update-locker-${locker.id}`} variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <Lock size={14} className="mr-1 inline-block" /> Update Status
                      </SuperadminButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </SuperadminCard>
    </div>
  );
}
