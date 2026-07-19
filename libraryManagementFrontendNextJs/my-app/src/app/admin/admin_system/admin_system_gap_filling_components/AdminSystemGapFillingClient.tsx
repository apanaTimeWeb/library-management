'use client';
// RESPONSIBILITY: Renders the AdminSystemGapFillingClient component.
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/admin/admin_system/admin_system_components/AdminSystemCard/AdminSystemCard';
import { Button } from '@/app/admin/admin_system/admin_system_components/AdminSystemButton/AdminSystemButton';
import { Input } from '@/app/admin/admin_system/admin_system_components/AdminSystemInput/AdminSystemInput';
import { Label } from '@/app/admin/admin_system/admin_system_components/AdminSystemLabel/AdminSystemLabel';
import { Badge } from '@/app/admin/admin_system/admin_system_components/AdminSystemBadge/AdminSystemBadge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/admin/admin_system/admin_system_components/AdminSystemSelect/AdminSystemSelect';
import { GitBranch, ChevronRight, Zap } from 'lucide-react';
import { useAdminSystemGapFilling } from '@/app/admin/admin_system/admin_system_gap_filling_hooks/useAdminSystemGapFilling';

export function AdminSystemGapFillingClient() {
  const {
    analyzed, setAnalyzed,
    fromDate, setFromDate,
    toDate, setToDate,
    shift, setShift,
    assigned, setAssigned,
    gaps
  } = useAdminSystemGapFilling();

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

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Analysis Controls</CardTitle>
          <CardDescription>Select a date range and shift to identify available seat gaps.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-2">
              <Label htmlFor="gap-from-date">From Date</Label>
              <Input id="gap-from-date" type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-44" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gap-to-date">To Date</Label>
              <Input id="gap-to-date" type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="w-44" />
            </div>
            <div className="space-y-2 w-44">
              <Label htmlFor="gap-shift-select">Shift</Label>
              <Select value={shift} onValueChange={setShift}>
                <SelectTrigger id="gap-shift-select"><SelectValue placeholder="All shifts" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shifts</SelectItem>
                  <SelectItem value="morning">Morning (6AMâ€“12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PMâ€“6PM)</SelectItem>
                  <SelectItem value="evening">Evening (6PMâ€“10PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button id="run-gap-analysis-btn" onClick={() => setAnalyzed(true)} variant="primary" size="md">
              ðŸ” Run Gap Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {analyzed ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-text-primary">Gap Analysis Results</h2>
            <Badge variant="primary">{gaps.length} seats analyzed</Badge>
          </div>
          {gaps.map(seat => (
            <Card key={seat.seat}>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-14 shrink-0">
                    <span className="text-sm font-mono font-bold text-text-primary">{seat.seat}</span>
                  </div>
                  {/* Time bar â€” left/width are computed values, style is correct here */}
                  <div className="flex-1 relative h-8 rounded-lg overflow-hidden bg-input">
                    {seat.booked.map((b, i) => (
                      <div key={i} className="absolute top-0 h-full bg-primary/70 flex items-center justify-center left-[length:var(--left)] w-[length:var(--w)]" style={{ '--left': `${b.start}%`, '--w': `${b.end - b.start}%` } as React.CSSProperties}>
                        <span className="text-xs text-on-primary font-medium truncate px-1">Booked</span>
                      </div>
                    ))}
                    <div className="absolute top-0 h-full bg-tertiary/30 border border-dashed border-tertiary/60 flex items-center justify-center animate-pulse left-[length:var(--left)] w-[length:var(--w)]" style={{ '--left': `${seat.gap.start}%`, '--w': `${seat.gap.end - seat.gap.start}%` } as React.CSSProperties}>
                      <span className="text-xs text-tertiary font-medium truncate px-1">ðŸ•³ï¸ Gap</span>
                    </div>
                  </div>
                  <div className="w-64 shrink-0 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-text-primary">{seat.gap.label}</p>
                      <p className="text-xs text-text-secondary">ðŸ’¡ {seat.gap.hours}hrs available</p>
                    </div>
                    {assigned.includes(seat.seat) ? (
                      <Badge variant="success">âœ… Assigned</Badge>
                    ) : (
                      <Button id={`quick-assign-${seat.seat}`} variant="secondary" size="sm"
                        onClick={() => setAssigned(p => [...p, seat.seat])}>
                        <Zap size={14} className="mr-1" /> Quick Assign
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 flex flex-col items-center justify-center gap-3 text-center">
            <div className="text-5xl">ðŸ”</div>
            <p className="text-text-primary font-medium">Run an analysis to see seat gaps</p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p className="text-sm text-text-secondary">Select a date range and click "Run Gap Analysis" to visualize available slots.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
