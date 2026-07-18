'use client';
// RESPONSIBILITY: Renders the gap filling visualization UI and controls. No raw logic.

import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminInput } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminInput';
import { SuperadminLabel } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminLabel';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';
import { SuperadminSelect, SuperadminSelectTrigger, SuperadminSelectValue, SuperadminSelectContent, SuperadminSelectItem } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminSelect';
import { GitBranch, ChevronRight, Zap, CheckCircle } from 'lucide-react';
import { useSuperadminSystemGapFilling } from '@/app/superadmin/superadmin_system/superadmin_system_gap_filling_hooks/useSuperadminSystemGapFilling';

export function SuperadminSystemGapFillingClient() {
  const {
    analyzed,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    shift,
    setShift,
    assigned,
    runAnalysis,
    assignSeat,
    seatGaps
  } = useSuperadminSystemGapFilling();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-medium tracking-wide mb-1">
          <span>System</span><ChevronRight size={12} /><span>Gap Filling</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
          <GitBranch size={28} className="text-primary" />
          Gap Filling Algorithm
        </h1>
        <p className="text-text-secondary mt-1 text-sm">Visualize empty time slots and monetize unused seat capacity.</p>
      </div>

      <SuperadminCard className="mb-6">
        <CardHeader>
          <CardTitle>Analysis Controls</CardTitle>
          <CardDescription>Select a date range and shift to identify available seat gaps.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-2">
              <SuperadminLabel htmlFor="gap-from-date">From Date</SuperadminLabel>
              <SuperadminInput id="gap-from-date" type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-44" />
            </div>
            <div className="space-y-2">
              <SuperadminLabel htmlFor="gap-to-date">To Date</SuperadminLabel>
              <SuperadminInput id="gap-to-date" type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="w-44" />
            </div>
            <div className="space-y-2 w-44">
              <SuperadminLabel htmlFor="gap-shift-select">Shift</SuperadminLabel>
              <SuperadminSelect value={shift} onValueChange={setShift}>
                <SuperadminSelectTrigger id="gap-shift-select"><SuperadminSelectValue placeholder="All shifts" /></SuperadminSelectTrigger>
                <SuperadminSelectContent>
                  <SuperadminSelectItem value="all">All Shifts</SuperadminSelectItem>
                  <SuperadminSelectItem value="morning">Morning (6AM–12PM)</SuperadminSelectItem>
                  <SuperadminSelectItem value="afternoon">Afternoon (12PM–6PM)</SuperadminSelectItem>
                  <SuperadminSelectItem value="evening">Evening (6PM–10PM)</SuperadminSelectItem>
                </SuperadminSelectContent>
              </SuperadminSelect>
            </div>
            <SuperadminButton id="run-gap-analysis-btn" onClick={runAnalysis} variant="primary" size="md">
              <GitBranch size={16} className="mr-2 inline-block" /> Run Gap Analysis
            </SuperadminButton>
          </div>
        </CardContent>
      </SuperadminCard>

      {analyzed ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-text-primary">Gap Analysis Results</h2>
            <SuperadminBadge variant="primary">{seatGaps.length} seats analyzed</SuperadminBadge>
          </div>
          {seatGaps.map((seat) => (
            <SuperadminCard key={seat.seat}>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-14 shrink-0">
                    <span className="text-sm font-mono font-bold text-text-primary">{seat.seat}</span>
                  </div>
                  {/* Time bar — left/width are computed values, style is correct here */}
                  <div className="flex-1 relative h-8 rounded-lg overflow-hidden bg-bg-input">
                    {seat.booked.map((b, i) => (
                      <div key={i} className="absolute top-0 h-full bg-primary/70 flex items-center justify-center transition-all duration-300"
                        style={{ left: `${b.start}%`, width: `${b.end - b.start}%` }}>
                        <span className="text-xs text-on-primary font-medium truncate px-1">Booked</span>
                      </div>
                    ))}
                    <div className="absolute top-0 h-full bg-tertiary/30 border border-dashed border-tertiary/60 flex items-center justify-center animate-pulse transition-all duration-300"
                      style={{ left: `${seat.gap.start}%`, width: `${seat.gap.end - seat.gap.start}%` }}>
                      <span className="text-xs text-tertiary font-medium truncate px-1">🕳️ Gap</span>
                    </div>
                  </div>
                  <div className="w-64 shrink-0 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-text-primary">{seat.gap.label}</p>
                      <p className="text-xs text-text-secondary">💡 {seat.gap.hours}hrs available</p>
                    </div>
                    {assigned.includes(seat.seat) ? (
                      <SuperadminBadge variant="success"><CheckCircle size={14} className="inline mr-1" /> Assigned</SuperadminBadge>
                    ) : (
                      <SuperadminButton id={`quick-assign-${seat.seat}`} variant="secondary" size="sm"
                        onClick={() => assignSeat(seat.seat)}>
                        <Zap size={14} className="mr-1 inline-block" /> Quick Assign
                      </SuperadminButton>
                    )}
                  </div>
                </div>
              </CardContent>
            </SuperadminCard>
          ))}
        </div>
      ) : (
        <SuperadminCard>
          <CardContent className="py-16 flex flex-col items-center justify-center gap-3 text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <GitBranch size={32} />
            </div>
            <p className="text-text-primary font-medium text-lg">Run an analysis to see seat gaps</p>
            <p className="text-sm text-text-secondary max-w-sm">Select a date range and click "Run Gap Analysis" to visualize available slots.</p>
          </CardContent>
        </SuperadminCard>
      )}
    </div>
  );
}
