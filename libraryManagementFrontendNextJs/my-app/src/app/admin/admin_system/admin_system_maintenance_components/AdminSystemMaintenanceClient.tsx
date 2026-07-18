// RESPONSIBILITY: Renders the AdminSystemMaintenanceClient component.
'use client';

import { useState } from 'react';
import { KpiCard } from '@/app/admin/admin_system/admin_system_components/AdminSystemKpiCard/AdminSystemKpiCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/admin/admin_system/admin_system_components/AdminSystemCard/AdminSystemCard';
import { Badge } from '@/app/admin/admin_system/admin_system_components/AdminSystemBadge/AdminSystemBadge';
import { Button } from '@/app/admin/admin_system/admin_system_components/AdminSystemButton/AdminSystemButton';
import { Wrench, Package, Lock, ChevronRight } from 'lucide-react';
import { useAdminSystemMaintenance } from '@/app/admin/admin_system/admin_system_maintenance_hooks/useAdminSystemMaintenance';
import { TablePagination } from '@/components/ui/table-pagination';

export function AdminSystemMaintenanceClient() {
  const { seatsNeedingAttention, assetsOverdue, lockerIssues, seats, assets, lockers } = useAdminSystemMaintenance();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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
        <KpiCard title="Seats Needing Attention" value={seatsNeedingAttention} icon="🪑" trend="down" trendLabel="Action required" />
        <KpiCard title="Assets Overdue" value={assetsOverdue} icon="⚙️" trend="down" trendLabel="Service overdue" />
        <KpiCard title="Locker Issues" value={lockerIssues} icon="🔒" trend="down" trendLabel="Reported issues" />
      </div>

      {/* Section 1 — Seats */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Wrench size={18} className="text-primary" /> Seats</CardTitle>
          <CardDescription>Seat maintenance status and last service log.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
                {seats.slice((page - 1) * limit, page * limit).map((seat) => (
                  <tr key={seat.id} className="hover:bg-bg-card transition-colors">
                    <td className="py-3 pr-4 font-mono font-medium text-text-primary">{seat.id}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={seat.status === 'OK' ? 'success' : 'danger'}>{seat.status}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-text-secondary">{seat.lastMaint}</td>
                    <td className="py-3 pr-4">
                      <span className={seat.daysSince > 30 ? 'text-danger font-semibold' : 'text-text-secondary'}>
                        {seat.daysSince}d
                      </span>
                    </td>
                    <td className="py-3">
                      <Button id={`log-seat-maint-${seat.id}`} variant="ghost" size="sm">🔧 Log Maintenance</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TablePagination
            page={page}
            limit={limit}
            totalItems={seats.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </CardContent>
      </Card>

      {/* Section 2 — Assets */}
      <Card className="mb-6">
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
                {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                {assets.map((asset, i) => (
                  <tr key={asset.name} className="hover:bg-bg-card transition-colors">
                    <td className="py-3 pr-4 font-medium text-text-primary">{asset.name}</td>
                    <td className="py-3 pr-4 text-center text-text-secondary">{asset.qty}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={asset.status === 'OK' ? 'success' : asset.status === 'Due Soon' ? 'warning' : 'danger'}>
                        {asset.status}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-text-secondary">{asset.lastServiced}</td>
                    <td className="py-3 pr-4 text-text-secondary">{asset.nextDue}</td>
                    <td className="py-3 pr-4">
                      {asset.daysOverdue > 0 ? (
                        <Badge variant="danger">+{asset.daysOverdue}d overdue</Badge>
                      ) : (
                        <span className="text-text-secondary text-xs">{Math.abs(asset.daysOverdue)}d left</span>
                      )}
                    </td>
                    <td className="py-3">
                      <Button id={`log-asset-service-${asset.name}`} variant="ghost" size="sm">📝 Log Service</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section 3 — Lockers */}
      <Card>
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
                  <tr key={locker.id} className="hover:bg-bg-card transition-colors">
                    <td className="py-3 pr-4 font-mono font-medium text-text-primary">{locker.id}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={locker.status === 'OK' ? 'success' : 'danger'}>{locker.status}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-text-secondary">{locker.lastIssue}</td>
                    <td className="py-3">
                      <Button id={`update-locker-${locker.id}`} variant="ghost" size="sm">✏️ Update Status</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
