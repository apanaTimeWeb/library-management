'use client';
import { SuperadminKpiCard } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminKpiCard';
import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { Wrench, Package, Lock, ChevronRight } from 'lucide-react';
import {
  SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS,
  SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS,
  SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS
} from '@superadmin/superadmin_system/superadmin_system_data/SuperadminSystemMockData';



export default function MaintenancePage() {
  const seatsNeedingAttention = SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS.filter(s => s.status === 'Needs Attention').length;
  const assetsOverdue = SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS.filter(a => a.daysOverdue > 0).length;
  const lockerIssues = SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS.filter(l => l.status === 'Issue Reported').length;

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
        <SuperadminKpiCard title="Seats Needing Attention" value={seatsNeedingAttention} icon="🪑" trend="down" trendLabel="Action required" />
        <SuperadminKpiCard title="Assets Overdue" value={assetsOverdue} icon="⚙️" trend="down" trendLabel="Service overdue" />
        <SuperadminKpiCard title="Locker Issues" value={lockerIssues} icon="🔒" trend="down" trendLabel="Reported issues" />
      </div>

      {/* Section 1 — Seats */}
      <SuperadminCard className="mb-6">
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
                {SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_SEATS.map((seat) => (
                  <tr key={seat.id} className="hover:bg-surface-container-high transition-colors">
                    <td className="py-3 pr-4 font-mono font-medium text-on-surface">{seat.id}</td>
                    <td className="py-3 pr-4">
                      <SuperadminBadge variant={seat.status === 'OK' ? 'success' : 'danger'}>{seat.status}</SuperadminBadge>
                    </td>
                    <td className="py-3 pr-4 text-on-surface-variant">{seat.lastMaint}</td>
                    <td className="py-3 pr-4">
                      <span className={seat.daysSince > 30 ? 'text-error font-semibold' : 'text-on-surface-variant'}>
                        {seat.daysSince}d
                      </span>
                    </td>
                    <td className="py-3">
                      <SuperadminButton id={`log-seat-maint-${seat.id}`} variant="ghost" size="sm">🔧 Log Maintenance</SuperadminButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                {SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_ASSETS.map((asset, i) => (
                  <tr key={asset.name} className="hover:bg-surface-container-high transition-colors">
                    <td className="py-3 pr-4 font-medium text-on-surface">{asset.name}</td>
                    <td className="py-3 pr-4 text-center text-on-surface-variant">{asset.qty}</td>
                    <td className="py-3 pr-4">
                      <SuperadminBadge variant={asset.status === 'OK' ? 'success' : asset.status === 'Due Soon' ? 'warning' : 'danger'}>
                        {asset.status}
                      </SuperadminBadge>
                    </td>
                    <td className="py-3 pr-4 text-on-surface-variant">{asset.lastServiced}</td>
                    <td className="py-3 pr-4 text-on-surface-variant">{asset.nextDue}</td>
                    <td className="py-3 pr-4">
                      {asset.daysOverdue > 0 ? (
                        <SuperadminBadge variant="danger">+{asset.daysOverdue}d overdue</SuperadminBadge>
                      ) : (
                        <span className="text-on-surface-variant text-xs">{Math.abs(asset.daysOverdue)}d left</span>
                      )}
                    </td>
                    <td className="py-3">
                      <SuperadminButton id={`log-asset-service-${asset.name}`} variant="ghost" size="sm">📝 Log Service</SuperadminButton>
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
                <tr className="border-b border-outline-variant text-on-surface-variant text-xs uppercase tracking-wide">
                  <th className="text-left py-3 pr-4">Locker #</th>
                  <th className="text-left py-3 pr-4">Status</th>
                  <th className="text-left py-3 pr-4">Last Reported Issue</th>
                  <th className="text-left py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {SUPERADMIN_SYSTEM_MOCK_MAINTENANCE_LOCKERS.map((locker, i) => (
                  <tr key={locker.id} className="hover:bg-surface-container-high transition-colors">
                    <td className="py-3 pr-4 font-mono font-medium text-on-surface">{locker.id}</td>
                    <td className="py-3 pr-4">
                      <SuperadminBadge variant={locker.status === 'OK' ? 'success' : 'danger'}>{locker.status}</SuperadminBadge>
                    </td>
                    <td className="py-3 pr-4 text-on-surface-variant">{locker.lastIssue}</td>
                    <td className="py-3">
                      <SuperadminButton id={`update-locker-${locker.id}`} variant="ghost" size="sm">✏️ Update Status</SuperadminButton>
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
