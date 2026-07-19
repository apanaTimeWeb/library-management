'use client';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

// RESPONSIBILITY: Entry page for the admin_engagement module.
// DATA FLOW: Next.js Router -> page -> Components

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Plus, Trash2, CalendarDays } from 'lucide-react';
import { ADMIN_ENGAGEMENT_MOCK_HOLIDAYS, ADMIN_ENGAGEMENT_WEEK_DAYS } from '@/app/admin/admin_engagement/admin_engagement_constants/AdminEngagementConstants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { Holiday } from "./AdminEngagementHolidayCalendarClient_types";

function getDays(y:number, m:number) { return new Date(y, m+1, 0).getDate(); }
function getFirstDayIdx(y:number, m:number) { const d=new Date(y,m,1).getDay(); return d===0?6:d-1; }

const TYPE_BADGE: Record<string, string> = {
  National:  'bg-primary/10 text-primary hover:bg-primary/20',
  Religious: 'bg-warning/10 text-warning hover:bg-warning/20',
  Library:   'bg-info/10 text-info hover:bg-info/20',
};

export function AdminEngagementHolidayCalendarClient() {
  const now = new Date();
  const [year, setYear]         = useState(now.getFullYear());
  const [month, setMonth]       = useState(now.getMonth());
  const [holidays, setHolidays] = useState<Holiday[]>(ADMIN_ENGAGEMENT_MOCK_HOLIDAYS);
  const [showAdd, setShowAdd]   = useState(false);
  const [form, setForm]         = useState({ date:'', name:'', type:'National' });

  const prevMonth = () => month===0 ? (setYear(y=>y-1), setMonth(11)) : setMonth(m=>m-1);
  const nextMonth = () => month===11 ? (setYear(y=>y+1), setMonth(0))  : setMonth(m=>m+1);

  const daysInMonth = getDays(year, month);
  const firstDayIdx = getFirstDayIdx(year, month);
  const todayStr = now.toISOString().split('T')[0];

  const holidayMap = new Map<number, Holiday>();
  holidays.forEach(h => {
    const d = new Date(h.date);
    if (d.getFullYear()===year && d.getMonth()===month) holidayMap.set(d.getDate(), h);
  });

  const cells: (number|null)[] = [
    ...Array(firstDayIdx).fill(null),
    ...Array.from({length:daysInMonth}, (_,i)=>i+1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const addHoliday = () => {
    if (!form.date || !form.name) return;
    setHolidays(p => [...p, { id: Date.now().toString(), ...form }]);
    setForm({ date:'', name:'', type:'National' });
    setShowAdd(false);
    toast.success('Holiday added successfully');
  };

  const removeHoliday = (id: string) => {
    setHolidays(p => p.filter(h => h.id !== id));
    toast.success('Holiday removed');
  };

  const monthLabel = new Date(year, month).toLocaleDateString('en-IN', { month:'long', year:'numeric' });

  const thisMonthHolidays = holidays
    .filter(h => { const d=new Date(h.date); return d.getFullYear()===year && d.getMonth()===month; })
    .sort((a,b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-6 pb-10">
      {/* ── Breadcrumb ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 uppercase tracking-wider mb-1">
            Engagement <ChevronRight size={12} /> Holiday Calendar
          </p>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">📅 Holiday Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage library holidays, closures, and special events.</p>
        </div>
        <Button onClick={()=>setShowAdd(true)} className="gap-2">
          <Plus size={16}/> Add Holiday
        </Button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Holidays</p>
          <p className="text-3xl font-bold text-foreground mb-1">{holidays.length}</p>
          <p className="text-xs font-medium text-muted-foreground">This year</p>
        </Card>
        <Card className="p-4 shadow-sm bg-primary/5 border-primary/20">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">This Month</p>
          <p className="text-3xl font-bold text-primary mb-1">{thisMonthHolidays.length}</p>
          <p className="text-xs font-medium text-primary/70">{monthLabel}</p>
        </Card>
        <Card className="p-4 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">National</p>
          <p className="text-3xl font-bold text-foreground mb-1">{holidays.filter(h=>h.type==='National').length}</p>
          <p className="text-xs font-medium text-muted-foreground">National holidays</p>
        </Card>
        <Card className="p-4 shadow-sm">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Religious</p>
          <p className="text-3xl font-bold text-foreground mb-1">{holidays.filter(h=>h.type==='Religious').length}</p>
          <p className="text-xs font-medium text-muted-foreground">Religious observances</p>
        </Card>
      </div>

      {/* ── Two-column Layout ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Left: Calendar Grid */}
        <div className="w-full lg:flex-1 lg:max-w-3xl">
          <Card className="shadow-sm border-border p-4 sm:p-6">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8 text-muted-foreground">
                <ChevronLeft size={16}/>
              </Button>
              <span className="text-lg font-bold text-foreground uppercase tracking-wider">{monthLabel}</span>
              <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8 text-muted-foreground">
                <ChevronRight size={16}/>
              </Button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
              {ADMIN_ENGAGEMENT_WEEK_DAYS.map(d => (
                <div key={d} className="text-center text-xs font-bold text-muted-foreground uppercase tracking-wider py-2">
                  {d.slice(0,3)}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {cells.map((day, i) => {
                if (!day) return <div key={i} className="aspect-square bg-muted/10 rounded-md" />;
                const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                const isToday   = ds === todayStr;
                const hol       = holidayMap.get(day);
                
                return (
                  <div key={i} className={`aspect-square rounded-md flex flex-col items-center justify-center relative transition-colors cursor-default select-none border ${
                    hol ? 'bg-danger/10 border-danger/20 text-danger' : 
                    isToday ? 'bg-primary border-primary text-primary-foreground font-bold shadow-md' : 
                    'bg-card border-transparent text-foreground hover:bg-muted/50'
                  }`} title={hol?.name}>
                    <span className={`text-sm sm:text-base font-semibold ${isToday ? 'text-primary-foreground' : ''}`}>{day}</span>
                    {hol && <div className="absolute bottom-1 sm:bottom-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-danger"></div>}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-danger"></div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Holiday</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary ring-2 ring-primary/20"></div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Today</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Holiday List */}
        <div className="w-full lg:w-96 shrink-0">
          <Card className="shadow-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border bg-muted/20">
              <div>
                <CardTitle className="text-lg">Holidays in {monthLabel.split(' ')[0]}</CardTitle>
                <CardDescription>{thisMonthHolidays.length} holidays this month</CardDescription>
              </div>
              <Button onClick={()=>setShowAdd(true)} size="sm" className="h-8 gap-1">
                <Plus size={14}/> Add
              </Button>
            </CardHeader>

            <CardContent className="p-0">
              {thisMonthHolidays.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm font-medium">
                  No holidays in {monthLabel} 🎉
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {thisMonthHolidays.map(h => (
                    <div key={h.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors group">
                      <div>
                        <div className="font-bold text-foreground text-sm">{h.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-mono text-muted-foreground">{h.date}</span>
                          <Badge variant="secondary" className={`${TYPE_BADGE[h.type]||'bg-muted/50'} border-none text-xs uppercase tracking-wide px-1.5 py-0`}>
                            {h.type}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={()=>removeHoliday(h.id)} className="h-8 w-8 text-muted-foreground hover:text-danger hover:bg-danger/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={14}/>
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* All holidays summary */}
              {holidays.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-muted/50 border-y border-border text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    All Upcoming Holidays ({holidays.length})
                  </div>
                  <div className="divide-y divide-border max-h-72 overflow-y-auto">
                    {holidays
                      .sort((a,b)=>a.date.localeCompare(b.date))
                      .map(h => (
                      <div key={h.id} className="p-3 px-4 flex items-center justify-between hover:bg-muted/30 transition-colors group">
                        <div>
                          <div className="font-medium text-foreground text-sm">{h.name}</div>
                          <div className="text-xs font-mono text-muted-foreground mt-0.5">{h.date}</div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={()=>removeHoliday(h.id)} className="h-6 w-6 text-muted-foreground hover:text-danger hover:bg-danger/10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={12}/>
                        </Button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Add Holiday Modal ── */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>📅 Add Holiday</DialogTitle>
            <DialogDescription>Mark a library closure or holiday in the calendar.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date *</label>
              <Input type="date" value={form.date} onChange={e => setForm(f=>({...f, date:e.target.value}))} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Event Name *</label>
              <Input placeholder="e.g. Diwali" value={form.name} onChange={e => setForm(f=>({...f, name:e.target.value}))} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</label>
              <AdminSearchableDropdown value={form.type} onChange={e => setForm(f=>({...f, type:e.target.value}))} className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option>National</option>
                <option>Religious</option>
                <option>Library</option>
              </AdminSearchableDropdown>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={()=>setShowAdd(false)}>Cancel</Button>
            <Button onClick={addHoliday} disabled={!form.date||!form.name} className="gap-2">
              <CalendarDays size={14}/> Add Holiday
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
