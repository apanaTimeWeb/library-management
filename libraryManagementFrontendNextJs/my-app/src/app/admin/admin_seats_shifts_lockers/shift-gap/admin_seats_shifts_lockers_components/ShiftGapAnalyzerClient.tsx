'use client';

import { Zap } from 'lucide-react';
import { useShiftGapAnalyzer, pct, fmtH, DAY_START_H, DAY_END_H } from '@/app/admin/admin_seats_shifts_lockers/shift-gap/admin_seats_shifts_lockers_hooks/useShiftGapAnalyzer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ShiftGapAnalyzerClient() {
  const {
    shiftFilter,
    setShiftFilter,
    period,
    setPeriod,
    visible,
    handleQuickFill,
    ADMIN_SEATS_MOCK_SHIFT_GAPS,
    ADMIN_SEATS_MOCK_VIEW_PERIODS
  } = useShiftGapAnalyzer();

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Seats & Shifts</nav>
          <h1 className="text-2xl font-bold tracking-tight">Shift Gap Analyzer</h1>
          <p className="text-sm text-muted-foreground mt-1">Identify revenue-loss gaps and fill empty time slots.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        <select 
          className="h-10 px-3 rounded-md border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring min-w-[150px]"
          value={shiftFilter} 
          onChange={(e) => setShiftFilter(e.target.value)}
        >
          <option value="All">All Shifts</option>
          {ADMIN_SEATS_MOCK_SHIFT_GAPS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
        </select>
        
        <select 
          className="h-10 px-3 rounded-md border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring min-w-[150px]"
          value={period} 
          onChange={(e) => setPeriod(e.target.value)}
        >
          {ADMIN_SEATS_MOCK_VIEW_PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {visible.map(shift => {
          const utilPct = Math.round((shift.occupied / shift.capacity) * 100);
          
          return (
            <Card key={shift.id} className="p-5 shadow-sm border-border bg-card flex flex-col gap-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-primary">{shift.name} Shift</h2>
                  <p className="text-sm text-muted-foreground font-medium mt-1">{shift.occupied} / {shift.capacity} seats occupied</p>
                </div>
                
                <div className="flex flex-col bg-muted/20 p-3 rounded-md border border-border min-w-[200px]">
                  <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                    <span>Utilization</span>
                    <span className={utilPct < 50 ? 'text-danger' : utilPct < 80 ? 'text-warning' : 'text-success'}>
                      {utilPct}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${utilPct < 50 ? 'bg-danger' : utilPct < 80 ? 'bg-warning' : 'bg-success'}`}
                      style={{ width: `${utilPct}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="relative h-10 w-full bg-muted/30 rounded-md border border-border overflow-hidden mb-2">
                  {shift.booked.map((b, i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 bg-primary/20 border-x border-primary/30 flex items-center justify-center overflow-hidden"
                      style={{ left: `${pct(b.startH)}%`, width: `${pct(b.endH) - pct(b.startH)}%` }}
                      title={b.label}
                    >
                      <span className="text-[10px] font-bold text-primary truncate px-1 opacity-70">
                        {pct(b.endH) - pct(b.startH) > 5 ? b.label : ''}
                      </span>
                    </div>
                  ))}
                  {shift.gaps.map((g, i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 bg-warning/20 border-x border-warning border-dashed flex items-center justify-center overflow-hidden"
                      style={{ left: `${pct(g.startH)}%`, width: `${pct(g.endH) - pct(g.startH)}%` }}
                      title={`Gap: ${fmtH(g.startH)} – ${fmtH(g.endH)}`}
                    >
                      <span className="text-[10px] font-black text-warning uppercase tracking-wider truncate px-1">
                        {pct(g.endH) - pct(g.startH) > 5 ? 'GAP' : ''}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                  <span>{fmtH(DAY_START_H)}</span>
                  <span>{fmtH(Math.round((DAY_START_H + DAY_END_H) / 2))}</span>
                  <span>{fmtH(DAY_END_H)}</span>
                </div>
              </div>

              {shift.gaps.length === 0 ? (
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2 bg-muted/20 p-3 rounded-md border border-border">
                  <span className="text-success text-lg">✅</span> No gaps detected — fully utilized.
                </p>
              ) : (
                <div className="grid gap-3">
                  {shift.gaps.map((g, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-md bg-warning/5 border border-warning/20">
                      <div className="flex items-start gap-3">
                        <Badge variant="secondary" className="bg-warning/20 text-warning border-none uppercase tracking-wider font-bold text-[10px] shrink-0 mt-0.5">
                          🕳️ Gap
                        </Badge>
                        <div>
                          <p className="text-sm font-bold text-primary mb-1">
                            {fmtH(g.startH)} – {fmtH(g.endH)} <span className="text-muted-foreground font-medium mx-1">·</span> {g.seats} seats free
                          </p>
                          <p className="text-xs font-medium text-danger">
                            Est. revenue loss: ₹{g.revLoss}/day
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="gap-2 shrink-0 h-8"
                        onClick={() => handleQuickFill(shift.name, g.startH, g.endH)}
                      >
                        <Zap size={14} /> Quick Fill
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
