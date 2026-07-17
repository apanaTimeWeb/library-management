'use client';
// RESPONSIBILITY: Entry page for the admin_system module.
// DATA FLOW: Next.js Router -> Page -> Components

import { KpiCard } from '@/app/admin/admin_system/admin_system_components/AdminSystemKpiCard/AdminSystemKpiCard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/admin/admin_system/admin_system_components/AdminSystemCard/AdminSystemCard';
import { Badge } from '@/app/admin/admin_system/admin_system_components/AdminSystemBadge/AdminSystemBadge';
import { Button } from '@/app/admin/admin_system/admin_system_components/AdminSystemButton/AdminSystemButton';
import { Wrench, Package, Lock, ChevronRight } from 'lucide-react';
import { ADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS, ADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS, ADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS } from '@/app/admin/admin_system/admin_system_constants/AdminSystemConstants';



export default function MaintenancePage() {
  const seatsNeedingAttention = ADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS.filter(s => s.status === 'Needs Attention').length;
  const assetsOverdue = ADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS.filter(a => a.daysOverdue > 0).length;
  const lockerIssues = ADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS.filter(l => l.status === 'Issue Reported').length;

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium tracking-wide mb-1">
          <span>System</span>
          <ChevronRight size={12} />
          <span>Maintenance</span>
        </div>
        <h1 className="text-3xl font-bold text-on-surface flex items-center gap-3">
          <Wrench size={28} className="text-primary" />
          Maintenance Dashboard
        </h1>
        <p className="text-on-surface-variant mt-1 text-sm">Track and manage maintenance for seats, assets, and lockers.</p>
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
                <tr className="border-b border-outline-variant text-on-surface-variant text-xs uppercase tracking-wide">
                  <th className="text-left py-3 pr-4">Seat #</th>
                  <th className="text-left py-3 pr-4">Status</th>
                  <th className="text-left py-3 pr-4">Last Maintenance</th>
                  <th className="text-left py-3 pr-4">Days Since</th>
                  <th className="text-left py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {ADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS.map((seat) => (
                  <tr key={seat.id} className="hover:bg-surface-container-high transition-colors">
                    <td className="py-3 pr-4 font-mono font-medium text-on-surface">{seat.id}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={seat.status === 'OK' ? 'success' : 'danger'}>{seat.status}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-on-surface-variant">{seat.lastMaint}</td>
                    <td className="py-3 pr-4">
                      <span className={seat.daysSince > 30 ? 'text-error font-semibold' : 'text-on-surface-variant'}>
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
                <tr className="border-b border-outline-variant text-on-surface-variant text-xs uppercase tracking-wide">
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
                {ADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS.map((asset, i) => (
                  <tr key={asset.name} className="hover:bg-surface-container-high transition-colors">
                    <td className="py-3 pr-4 font-medium text-on-surface">{asset.name}</td>
                    <td className="py-3 pr-4 text-center text-on-surface-variant">{asset.qty}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={asset.status === 'OK' ? 'success' : asset.status === 'Due Soon' ? 'warning' : 'danger'}>
                        {asset.status}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-on-surface-variant">{asset.lastServiced}</td>
                    <td className="py-3 pr-4 text-on-surface-variant">{asset.nextDue}</td>
                    <td className="py-3 pr-4">
                      {asset.daysOverdue > 0 ? (
                        <Badge variant="danger">+{asset.daysOverdue}d overdue</Badge>
                      ) : (
                        <span className="text-on-surface-variant text-xs">{Math.abs(asset.daysOverdue)}d left</span>
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
                <tr className="border-b border-outline-variant text-on-surface-variant text-xs uppercase tracking-wide">
                  <th className="text-left py-3 pr-4">Locker #</th>
                  <th className="text-left py-3 pr-4">Status</th>
                  <th className="text-left py-3 pr-4">Last Reported Issue</th>
                  <th className="text-left py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {ADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS.map((locker) => (
                  <tr key={locker.id} className="hover:bg-surface-container-high transition-colors">
                    <td className="py-3 pr-4 font-mono font-medium text-on-surface">{locker.id}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={locker.status === 'OK' ? 'success' : 'danger'}>{locker.status}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-on-surface-variant">{locker.lastIssue}</td>
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

