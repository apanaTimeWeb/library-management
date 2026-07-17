// RESPONSIBILITY: Renders the SuperadminSystemPowerSavingClient component.
'use client';
import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminInput } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminInput';
import { SuperadminLabel } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminLabel';
import { SuperadminSwitch } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminSwitch';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';
import { SuperadminProgress } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminProgress';
import { Zap, ChevronRight, ZapOff, CheckCircle } from 'lucide-react';
import { useSuperadminSystemPowerSaving } from '@/app/superadmin/superadmin_system/superadmin_system_power_saving_hooks/useSuperadminSystemPowerSaving';

export function SuperadminSystemPowerSavingClient() {
  const {
    threshold,
    setThreshold,
    alertsEnabled,
    setAlertsEnabled,
    zones,
    alerts,
    getZoneStatus
  } = useSuperadminSystemPowerSaving();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium tracking-wide mb-1">
          <span>System</span>
          <ChevronRight size={12} />
          <span>Power Saving</span>
        </div>
        <h1 className="text-3xl font-bold text-on-surface flex items-center gap-3">
          <Zap size={28} className="text-primary" />
          Power Saving Mode
        </h1>
        <p className="text-on-surface-variant mt-1 text-sm">Optimize energy usage based on real-time zone occupancy.</p>
      </div>

      {/* Config Card */}
      <SuperadminCard className="mb-6">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>Set the occupancy threshold below which consolidation is suggested.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <SuperadminLabel htmlFor="power-threshold">Occupancy Threshold (%)</SuperadminLabel>
            <div className="flex items-center gap-3">
              <SuperadminInput
                id="power-threshold"
                type="number"
                value={threshold}
                onChange={e => setThreshold(+e.target.value)}
                className="w-28"
                min={5}
                max={95}
              />
              <span className="text-sm text-on-surface-variant">
                If shift occupancy drops below <strong className="text-on-surface">{threshold}%</strong>, suggest consolidation.
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-high border border-outline-variant">
            <div>
              <p className="text-sm font-medium text-on-surface">Enable Power Saving Alerts</p>
              <p className="text-xs text-on-surface-variant">Send alerts when zones fall below threshold</p>
            </div>
            <SuperadminSwitch id="power-saving-toggle" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
          </div>
        </CardContent>
        <CardFooter>
          <SuperadminButton id="save-power-config-btn" variant="primary">💾 Save Configuration</SuperadminButton>
        </CardFooter>
      </SuperadminCard>

      {/* Zone Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {zones.map((zone) => {
          const status = getZoneStatus(zone.occupancy);
          return (
            <SuperadminCard key={zone.name} className={status.isLow ? 'border-tertiary/30' : ''}>
              <CardContent>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-on-surface">{zone.name}</p>
                    <p className="text-xs text-on-surface-variant">{zone.current} / {zone.capacity} seats occupied</p>
                  </div>
                  <SuperadminBadge variant={status.variant}>
                    {status.isLow ? <><ZapOff size={14} className="inline mr-1" /> Low — Consolidation Suggested</> : <><CheckCircle size={14} className="inline mr-1" /> Normal</>}
                  </SuperadminBadge>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Occupancy</span>
                    <span className={status.isLow ? 'text-tertiary font-semibold' : 'text-green-400 font-semibold'}>{zone.occupancy}%</span>
                  </div>
                  <SuperadminProgress value={zone.occupancy} barClassName={status.isLow ? 'bg-tertiary' : 'bg-green-500'} />
                </div>
                {status.isLow && (
                  <div className="mt-3 p-2.5 rounded-lg bg-tertiary/10 border border-tertiary/20 text-xs text-tertiary">
                    💡 Suggested: Move students to Zone A → Turn off {zone.name} AC
                  </div>
                )}
              </CardContent>
            </SuperadminCard>
          );
        })}
      </div>

      {/* Alert Log */}
      <SuperadminCard>
        <CardHeader>
          <CardTitle>Alert Log</CardTitle>
          <CardDescription>History of power saving threshold breaches and actions taken.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant text-on-surface-variant text-xs uppercase tracking-wide">
                  <th className="text-left py-3 pr-4">Date</th>
                  <th className="text-left py-3 pr-4">Shift</th>
                  <th className="text-left py-3 pr-4">Zone</th>
                  <th className="text-left py-3 pr-4">Threshold Breached</th>
                  <th className="text-left py-3">Action Taken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {alerts.map((log) => (
                  <tr key={log.date + log.zone} className="hover:bg-surface-container-high transition-colors">
                    <td className="py-3 pr-4 text-on-surface-variant">{log.date}</td>
                    <td className="py-3 pr-4 text-on-surface">{log.shift}</td>
                    <td className="py-3 pr-4 text-on-surface">{log.zone}</td>
                    <td className="py-3 pr-4"><SuperadminBadge variant="warning">&lt; {log.threshold}</SuperadminBadge></td>
                    <td className="py-3 text-on-surface-variant">{log.action}</td>
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
