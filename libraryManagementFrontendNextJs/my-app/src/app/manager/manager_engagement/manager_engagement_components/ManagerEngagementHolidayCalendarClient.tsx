'use client';
// RESPONSIBILITY: Renders the ManagerEngagementHolidayCalendarClient component.
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Plus, X, Trash2, CalendarDays } from 'lucide-react';
import { Holiday } from '@/app/manager/manager_engagement/manager_engagement_types/ManagerEngagementTypes';
import { INIT_HOLIDAYS } from '@/app/manager/manager_engagement/manager_engagement_constants/ManagerEngagementConstants';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
const WEEK_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function getDays(y:number, m:number) { return new Date(y, m+1, 0).getDate(); }
function getFirstDayIdx(y:number, m:number) { const d=new Date(y,m,1).getDay(); return d===0?6:d-1; }

const TYPE_BADGE: Record<string, string> = {
  National:  'bg-primary/10 text-primary',
  Religious: 'bg-warning-bg text-warning',
  Library:   'bg-info-bg text-info',
};

export function ManagerEngagementHolidayCalendarClient() {
  const now = new Date();
  const [year, setYear]         = useState(now.getFullYear());
  const [month, setMonth]       = useState(now.getMonth());
  const [holidays, setHolidays] = useState<Holiday[]>(INIT_HOLIDAYS);
  const [showAdd, setShowAdd]   = useState(false);
  const [form, setForm]         = useState({ date:'', name:'', type:'National' });
  const [toast, setToast]       = useState('');

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500); };

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
    showToast('ðŸ“… Holiday added successfully');
  };

  const removeHoliday = (id: string) => {
    setHolidays(p => p.filter(h => h.id !== id));
    showToast('ðŸ—‘ï¸ Holiday removed');
  };

  const monthLabel = new Date(year, month).toLocaleDateString('en-IN', { month:'long', year:'numeric' });

  const thisMonthHolidays = holidays
    .filter(h => { const d=new Date(h.date); return d.getFullYear()===year && d.getMonth()===month; })
    .sort((a,b) => a.date.localeCompare(b.date));

  return (
    <div className="p-6 min-h-screen relative">
      {/* â”€â”€ Toast â”€â”€ */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-card border border-border shadow-lg rounded-xl px-4 py-3 text-sm text-text-primary">{toast}</div>
        </div>
      )}

      {/* â”€â”€ Add Holiday Modal â”€â”€ */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-page w-full rounded-2xl shadow-2xl flex flex-col p-6 max-w-sm relative">
            <button onClick={()=>setShowAdd(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-text-secondary transition-colors absolute top-4 right-4"><X size={16}/></button>
            <p className="text-lg font-bold text-text-primary">ðŸ“… Add Holiday</p>
            <p className="text-sm text-text-secondary mt-1 mb-6">Mark a library closure or holiday in the calendar.</p>

            <div className="flex flex-col mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Date <span className="text-danger ml-1">*</span></label>
              <input type="date" className="w-full bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" value={form.date}
                onChange={e => setForm(f=>({...f, date:e.target.value}))} />
            </div>
            <div className="flex flex-col mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Event Name <span className="text-danger ml-1">*</span></label>
              <input className="w-full bg-input border border-border rounded-lg px-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Diwali" value={form.name}
                onChange={e => setForm(f=>({...f, name:e.target.value}))} />
            </div>
            <div className="flex flex-col mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Type</label>
              <ManagerSearchableDropdown
                value={form.type}
                onChange={v => setForm(f=>({...f, type:v}))}
                options={[
                  { label: 'National', value: 'National' },
                  { label: 'Religious', value: 'Religious' },
                  { label: 'Library', value: 'Library' },
                ]}
              />
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
              <button onClick={()=>setShowAdd(false)} className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2">Cancel</button>
              <button onClick={addHoliday} disabled={!form.date||!form.name}
                className="bg-primary text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2 disabled:opacity-50">
                <CalendarDays size={14}/> Add Holiday
              </button>
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Link href={MANAGER_ROUTES.ENGAGEMENT_ATTENDANCE}>Engagement</Link>
        <ChevronRight size={12} className="mx-1"/>
        <span>Holiday Calendar</span>
      </div>

      {/* â”€â”€ Page Header â”€â”€ */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-text-primary">ðŸ“… Holiday Calendar</h1>
            <p className="text-sm text-text-secondary mt-1.5">Manage library holidays, closures, and special events.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setShowAdd(true)} className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
              <Plus size={14}/> Add Holiday
            </button>
          </div>
        </div>
      </div>

      {/* â”€â”€ Stats â”€â”€ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-sm font-medium text-text-secondary mb-1.5">Total Holidays</div>
          <div className="text-text-primary text-xl font-bold text-text-primary">{holidays.length}</div>
          <div className="text-xs font-medium text-text-secondary mt-1">This year</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-sm font-medium text-text-secondary mb-1.5">This Month</div>
          <div className="text-text-primary text-xl font-bold text-text-primary">{thisMonthHolidays.length}</div>
          <div className="text-xs font-medium text-text-secondary mt-1">{monthLabel}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-sm font-medium text-text-secondary mb-1.5">National</div>
          <div className="text-text-primary text-xl font-bold text-text-primary">{holidays.filter(h=>h.type==='National').length}</div>
          <div className="text-xs font-medium text-text-secondary mt-1">National holidays</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-sm font-medium text-text-secondary mb-1.5">Religious</div>
          <div className="text-text-primary text-xl font-bold text-text-primary">{holidays.filter(h=>h.type==='Religious').length}</div>
          <div className="text-xs font-medium text-text-secondary mt-1">Religious observances</div>
        </div>
      </div>

      {/* â”€â”€ Two-column Layout â”€â”€ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Calendar Grid */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-xl p-6">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="w-8 h-8 rounded-lg border border-border text-text-secondary inline-flex items-center justify-center hover:bg-primary-subtle hover:text-primary transition-colors">
                <ChevronLeft size={18}/>
              </button>
              <span className="text-lg font-bold text-text-primary">{monthLabel}</span>
              <button onClick={nextMonth} className="w-8 h-8 rounded-lg border border-border text-text-secondary inline-flex items-center justify-center hover:bg-primary-subtle hover:text-primary transition-colors">
                <ChevronRight size={18}/>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {WEEK_DAYS.map(d => (
                <div key={d} className="text-center text-xs font-bold text-text-secondary uppercase tracking-wider">{d}</div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-2">
              {cells.map((day, i) => {
                if (!day) return <div key={i} className="aspect-square rounded-lg flex items-center justify-center text-sm font-semibold transition-all border border-border/50 invisible"/>;
                const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                const isToday   = ds === todayStr;
                const hol       = holidayMap.get(day);
                return (
                  <div key={i}
                    className={[
                      'aspect-square rounded-lg flex items-center justify-center text-sm font-semibold transition-all border border-border/50 cursor-default hover:bg-card',
                      isToday  ? 'border-primary bg-primary-subtle text-primary ring-1 ring-primary/20'   : '',
                      hol      ? 'bg-danger/10 text-danger border-danger/20 shadow-inner' : '',
                    ].filter(Boolean).join(' ')}
                    title={hol?.name}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                <div className="w-3 h-3 rounded-full bg-danger/50"/>
                <span>Holiday</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-text-secondary">
                <div className="w-3 h-3 rounded-full bg-primary"/>
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Holiday List */}
        <div className="flex flex-col gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-base font-semibold text-text-primary">
                  {monthLabel} Holidays
                </div>
                <div className="text-sm text-text-secondary mt-1">{thisMonthHolidays.length} this month</div>
              </div>
              <button onClick={()=>setShowAdd(true)} className="bg-primary text-white rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
                <Plus size={13}/> Add
              </button>
            </div>

            {thisMonthHolidays.length === 0 ? (
              <div className="text-sm text-text-secondary italic text-center py-6">
                No holidays in {monthLabel} ðŸŽ‰
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-2">
                {thisMonthHolidays.map(h => (
                  <div key={h.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-card transition-colors">
                    <div>
                      <div className="text-sm font-bold text-text-primary mb-1">{h.name}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-text-secondary">{h.date}</div>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${TYPE_BADGE[h.type]||'bg-card text-text-secondary'}`}>
                          {h.type}
                        </span>
                      </div>
                    </div>
                    <button onClick={()=>removeHoliday(h.id)}
                      className="w-8 h-8 rounded-lg text-text-secondary inline-flex items-center justify-center hover:bg-danger/10 hover:text-danger transition-colors">
                      <Trash2 size={13}/>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* All holidays summary */}
            {holidays.length > 0 && (
              <>
                <div className="h-px w-full bg-border my-4" />
                <div className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
                  All Holidays ({holidays.length})
                </div>
                <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-2">
                  {holidays
                    .sort((a,b)=>a.date.localeCompare(b.date))
                    .map(h => (
                    <div key={h.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-card transition-colors">
                      <div>
                        <div className="text-sm font-bold text-text-primary mb-1">{h.name}</div>
                        <div className="text-xs text-text-secondary">{h.date}</div>
                      </div>
                      <button onClick={()=>removeHoliday(h.id)}
                        className="w-8 h-8 rounded-lg text-text-secondary inline-flex items-center justify-center hover:bg-danger/10 hover:text-danger transition-colors">
                        <Trash2 size={11}/>
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
  );
}


