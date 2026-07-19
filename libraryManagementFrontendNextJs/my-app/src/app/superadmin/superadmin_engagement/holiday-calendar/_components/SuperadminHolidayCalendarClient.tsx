'use client';
// RESPONSIBILITY: Renders the SuperadminHolidayCalendarClient component.
import Link from 'next/link';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/SuperadminUrlConfig';
import { ChevronRight, ChevronLeft, Plus, X, Trash2, CalendarDays } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useSuperadminHolidayCalendarClient } from '@/app/superadmin/superadmin_engagement/holiday-calendar/_components/useSuperadminHolidayCalendarClient';

const WEEK_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function getDays(y:number, m:number) { return new Date(y, m+1, 0).getDate(); }
function getFirstDayIdx(y:number, m:number) { const d=new Date(y,m,1).getDay(); return d===0?6:d-1; }

const TYPE_BADGE: Record<string, string> = {
  National:  'bg-primary/10 text-primary',
  Religious: 'bg-warning/10 text-warning',
  Library:   'bg-info/10 text-info',
};

export function SuperadminHolidayCalendarClient() {
  const {
    year, month, holidays, showAdd, setShowAdd, form, setForm, toast,
    prevMonth, nextMonth, addHoliday, removeHoliday
  } = useSuperadminHolidayCalendarClient();

  const now = new Date();
  const daysInMonth = getDays(year, month);
  const firstDayIdx = getFirstDayIdx(year, month);
  const todayStr = now.toISOString().split('T')[0];

  const holidayMap = new Map();
  holidays.forEach(h => {
    const d = new Date(h.date);
    if (d.getFullYear()===year && d.getMonth()===month) holidayMap.set(d.getDate(), h);
  });

  const cells: (number|null)[] = [
    ...Array(firstDayIdx).fill(null),
    ...Array.from({length:daysInMonth}, (_,i)=>i+1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const monthLabel = new Date(year, month).toLocaleDateString('en-IN', { month:'long', year:'numeric' });

  const thisMonthHolidays = holidays
    .filter(h => { const d=new Date(h.date); return d.getFullYear()===year && d.getMonth()===month; })
    .sort((a,b) => a.date.localeCompare(b.date));

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-page animate-in fade-in duration-200">
      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5">
          <div className="bg-text-primary text-bg-card px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
            {toast}
          </div>
        </div>
      )}

      {/* ── Add Holiday Modal ── */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border w-full max-w-sm rounded-xl shadow-2xl overflow-hidden relative">
            <button onClick={()=>setShowAdd(false)} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"><X size={16}/></button>
            <div className="p-5 border-b border-border bg-muted/30">
              <p className="text-lg font-extrabold text-text-primary">📅 Add Holiday</p>
              <p className="text-xs text-text-secondary mt-1">Mark a library closure or holiday.</p>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-primary flex gap-1">Date <span className="text-danger">*</span></label>
                <input type="date" className="w-full h-10 px-3 rounded-md border border-border bg-input text-text-primary text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" value={form.date}
                  onChange={e => setForm(f=>({...f, date:e.target.value}))} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-primary flex gap-1">Event Name <span className="text-danger">*</span></label>
                <input className="w-full h-10 px-3 rounded-md border border-border bg-input text-text-primary text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-text-secondary" placeholder="e.g. Diwali" value={form.name}
                  onChange={e => setForm(f=>({...f, name:e.target.value}))} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-primary">Type</label>
                <SuperadminSearchableDropdown
                  options={[
                    { label: 'National', value: 'National' },
                    { label: 'Religious', value: 'Religious' },
                    { label: 'Library', value: 'Library' }
                  ]}
                  value={form.type}
                  onChange={val => setForm(f=>({...f, type:val}))}
                />
              </div>
            </div>

            <div className="p-4 border-t border-border flex justify-end gap-3 bg-muted/30">
              <button onClick={()=>setShowAdd(false)} className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-input border border-transparent rounded-md transition-colors cursor-pointer">Cancel</button>
              <button onClick={addHoliday} disabled={!form.date||!form.name}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                <CalendarDays size={14}/> Add Holiday
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-2 text-text-secondary text-xs font-bold tracking-wide mb-6">
        <Link href={SUPERADMIN_ROUTES.ENGAGEMENT_ATTENDANCE} className="hover:text-primary transition-colors">Engagement</Link>
        <ChevronRight size={12} className="opacity-50" />
        <span className="text-text-primary">Holiday Calendar</span>
      </div>

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">📅 Holiday Calendar</h1>
          <p className="text-sm text-text-secondary mt-1">Manage library holidays, closures, and special events.</p>
        </div>
        <button onClick={()=>setShowAdd(true)} className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-md hover:bg-primary/90 shadow-sm transition-all cursor-pointer">
          <Plus size={16}/> Add Holiday
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">Total Holidays</div>
          <div className="text-3xl font-extrabold text-text-primary mt-2 leading-none">{holidays.length}</div>
          <div className="text-xs text-text-secondary mt-2">This year</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">This Month</div>
          <div className="text-3xl font-extrabold text-text-primary mt-2 leading-none">{thisMonthHolidays.length}</div>
          <div className="text-xs text-text-secondary mt-2">{monthLabel}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">National</div>
          <div className="text-3xl font-extrabold text-text-primary mt-2 leading-none">{holidays.filter(h=>h.type==='National').length}</div>
          <div className="text-xs text-text-secondary mt-2">National holidays</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">Religious</div>
          <div className="text-3xl font-extrabold text-text-primary mt-2 leading-none">{holidays.filter(h=>h.type==='Religious').length}</div>
          <div className="text-xs text-text-secondary mt-2">Religious observances</div>
        </div>
      </div>

      {/* ── Two-column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Calendar Grid */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6 flex flex-col items-center">
            {/* Month navigation */}
            <div className="w-full flex items-center justify-between mb-6 pb-4 border-b border-border">
              <button onClick={prevMonth} className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-input text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                <ChevronLeft size={18}/>
              </button>
              <span className="text-lg font-extrabold text-text-primary">{monthLabel}</span>
              <button onClick={nextMonth} className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-input text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                <ChevronRight size={18}/>
              </button>
            </div>

            {/* Day headers */}
            <div className="w-full grid grid-cols-7 gap-2 mb-2">
              {WEEK_DAYS.map(( d ) => (
                <div key={d} className="text-center text-xs font-bold text-text-secondary uppercase">{d}</div>
              ))}
            </div>

            {/* Day cells */}
            <div className="w-full grid grid-cols-7 gap-2">
              {cells.map((day, i) => {
                if (!day) return <div key={i} className="aspect-square rounded-md bg-transparent"/>;
                const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                const isToday   = ds === todayStr;
                const hol       = holidayMap.get(day);
                
                return (
                  <div key={i}
                    className={`aspect-square flex flex-col items-center justify-center rounded-md text-sm font-bold transition-all relative ${
                      isToday ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary ring-offset-2 ring-offset-bg-card' : 
                      hol ? 'bg-danger/10 text-danger border border-danger/20 cursor-pointer hover:bg-danger/20' : 
                      'bg-input/50 text-text-primary hover:bg-input cursor-pointer border border-transparent'
                    }`}
                    title={hol?.name}
                  >
                    {day}
                    {hol && !isToday && <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-danger" />}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="w-full flex justify-center gap-6 mt-8 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-xs font-bold text-text-secondary">
                <div className="w-2.5 h-2.5 rounded-full bg-danger/50 border border-danger" />
                <span>Holiday</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-text-secondary">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Holiday List */}
        <div className="flex flex-col gap-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-128">
            <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between shrink-0">
              <div>
                <div className="text-base font-extrabold text-text-primary">
                  {monthLabel} Holidays
                </div>
                <div className="text-xs text-text-secondary mt-0.5">{thisMonthHolidays.length} this month</div>
              </div>
              <button onClick={()=>setShowAdd(true)} className="h-8 w-8 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-colors shadow-sm cursor-pointer">
                <Plus size={16}/>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-border">
              {thisMonthHolidays.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6 text-text-secondary">
                  <div className="text-4xl mb-3 opacity-50">🎉</div>
                  <p className="text-sm font-bold">No holidays in {monthLabel}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {thisMonthHolidays.map(( h ) => (
                    <div key={h.id} className="flex items-center justify-between p-3 rounded-md border border-border bg-page hover:border-danger/30 transition-colors group">
                      <div>
                        <div className="text-sm font-bold text-text-primary">{h.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-xs text-text-secondary font-mono">{h.date}</div>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${TYPE_BADGE[h.type]||'bg-muted text-text-secondary'}`}>
                            {h.type}
                          </span>
                        </div>
                      </div>
                      <button onClick={()=>removeHoliday(h.id)}
                        className="h-7 w-7 rounded-md flex items-center justify-center text-text-secondary hover:text-danger hover:bg-danger/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* All holidays summary */}
              {holidays.length > 0 && (
                <>
                  <div className="h-px bg-border my-6" />
                  <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3 px-1">
                    All Holidays ({holidays.length})
                  </div>
                  <div className="space-y-2">
                    {holidays
                      .sort((a,b)=>a.date.localeCompare(b.date))
                      .map(( h ) => (
                      <div key={h.id} className="flex items-center justify-between p-2 rounded-sm hover:bg-input transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="text-xs font-mono text-text-secondary w-20 shrink-0">{h.date}</div>
                          <div className="text-sm font-bold text-text-primary truncate">{h.name}</div>
                        </div>
                        <button onClick={()=>removeHoliday(h.id)}
                          className="text-text-secondary hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer px-2">
                          <Trash2 size={12}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

