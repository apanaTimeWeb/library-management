'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Send, Mail, Phone } from 'lucide-react';
import { AbsenteeRow } from '@/app/manager/manager_engagement/manager_engagement_types/ManagerEngagementTypes';
import { useManagerEngagementAbsentee } from '@/app/manager/manager_engagement/manager_engagement_hooks/useManagerEngagementAbsentee';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { TablePagination } from '@/components/ui/table-pagination';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';


// RESPONSIBILITY: Renders the absentee report grid with filtering and notification actions.

export function ManagerEngagementAbsenteeReportClient() {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    threshold, setThreshold,
    shift, setShift,
    toast, toastType,
    filtered, critical, moderate,
    notify, notifyAll
  } = useManagerEngagementAbsentee();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const searchedFiltered = filtered.filter(item => 
    !searchTerm || 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.smartId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const badgeClass = (d: number) => d >= 7 ? 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-danger-bg text-danger' : 'rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-warning-bg text-warning';
  

  return (
    <div className="p-6 min-h-screen">
      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`bg-bg-card border border-border shadow-lg rounded-xl px-4 py-3 text-sm text-text-primary ${toastType === 'info' ? 'bg-info-bg border-info text-info' : ''}`}>{toast}</div>
        </div>
      )}

      {/* ── Breadcrumb ── */}
      <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Link href={MANAGER_ROUTES.ENGAGEMENT_ATTENDANCE}>Engagement</Link>
        <ChevronRight size={12} className="mx-1"/>
        <span>Absentee Report</span>
      </div>

      {/* ── Page Header ── */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-bold text-text-primary">📋 Absentee Report</h1>
            <p className="text-[13px] text-text-secondary mt-1.5">Students with consecutive absences requiring attention.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={notifyAll} className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
              <Send size={14}/> Bulk Alert Parents
            </button>
          </div>
        </div>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Total Absentees</div>
          <div className="text-2xl font-bold text-text-primary">{filtered.length}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">above {threshold === 'all' ? '0' : threshold} day threshold</div>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Critical (7+ days)</div>
          <div className="text-2xl font-bold text-danger">{critical.length}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">Immediate action needed</div>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Moderate (3–6 days)</div>
          <div className="text-2xl font-bold text-warning">{moderate.length}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">Monitoring required</div>
        </div>
        <div className="bg-bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="text-[13px] font-medium text-text-secondary mb-1.5">Parents Notified</div>
          <div className="text-2xl font-bold text-success">{filtered.filter(r=>r.notified).length}</div>
          <div className="text-[11px] font-medium text-text-secondary mt-1">of {filtered.length} total</div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="bg-bg-card rounded-xl border border-border mb-6 p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <span className="block text-[13px] font-medium text-text-secondary mb-1.5">Days Threshold</span>
              <div className="w-[180px]">
                <ManagerSearchableDropdown
                  value={threshold}
                  onChange={v => setThreshold(v)}
                  options={[
                    { label: '3+ Days', value: '3' },
                    { label: '5+ Days', value: '5' },
                    { label: '7+ Days (Critical)', value: '7' },
                    { label: 'Show All', value: 'all' },
                  ]}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="block text-[13px] font-medium text-text-secondary mb-1.5">Shift</span>
              <div className="w-[150px]">
                <ManagerSearchableDropdown
                  value={shift}
                  onChange={v => setShift(v)}
                  options={[
                    { label: 'All', value: 'All' },
                    { label: 'Morning', value: 'Morning' },
                    { label: 'Afternoon', value: 'Afternoon' },
                    { label: 'Evening', value: 'Evening' },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-danger-bg text-danger">{critical.length} critical</span>
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-warning-bg text-warning">{moderate.length} moderate</span>
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success">{filtered.filter(r=>r.notified).length} notified</span>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-bg-card rounded-xl border border-border p-4">
        {filtered.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-lg font-semibold text-text-primary mb-1">No absentees above threshold!</p>
            <p className="text-sm text-text-secondary">All students have great attendance above the selected threshold.</p>
          </div>
        ) : (
<>
<div className="flex justify-end mb-[16px]">
          <input 
            type="text" 
            placeholder="Search in table..." 
            className="px-3 py-2 border border-border rounded-md text-sm bg-bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
          <div className="w-full overflow-x-auto border border-border rounded-xl">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-bg-elevated border-b border-border">
                <tr className="text-text-secondary text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">Smart ID</th>
                  <th className="px-4 py-3 font-semibold">Shift</th>
                  <th className="px-4 py-3 font-semibold">Days Absent</th>
                  <th className="px-4 py-3 font-semibold">Last Seen</th>
                  <th className="px-4 py-3 font-semibold">Parent Contact</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-bg-card">
                {searchedFiltered.slice((page - 1) * limit, page * limit).map((row) => (
                  <tr key={row.id} className={`hover:bg-bg-page transition-colors ${row.daysAbsent >= 7 ? 'bg-danger-bg' : row.daysAbsent >= 3 ? 'bg-warning-bg' : ''}`}>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-subtle text-primary flex items-center justify-center text-xs font-bold shrink-0 mr-3">
                          {row.initials}
                        </div>
                        <span className="text-sm font-semibold text-text-primary">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4"><span className="font-mono text-[12px] text-text-primary tracking-tight">{row.smartId}</span></td>
                    <td className="px-4 py-4"><span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-bg-elevated text-text-secondary">{row.shift}</span></td>
                    <td className="px-4 py-4">
                      <span className={badgeClass(row.daysAbsent)}>{row.daysAbsent} days</span>
                    </td>
                    <td className="px-4 py-4 text-xs text-text-secondary">{row.lastSeen}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className="font-mono text-[12px] text-text-primary tracking-tight flex items-center">
                          <Phone size={10} className="mr-1"/> {row.parentPhone}
                        </span>
                        <span className="text-xs text-text-secondary flex items-center">
                          <Mail size={10} className="mr-1"/> {row.parentEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {row.notified ? (
                        <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-success-bg text-success">✅ Notified</span>
                      ) : (
                        <button onClick={() => notify(row.id)} className="bg-transparent border border-border text-text-primary rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2">
                          <Send size={12} className="mr-1"/> Alert
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {searchedFiltered.length > 0 && (
            <div className="mt-4">
              <TablePagination
                page={page}
                limit={limit}
                totalItems={searchedFiltered.length}
                onPageChange={setPage}
                onLimitChange={setLimit}
              />
            </div>
          )}
        </>
)}
      </div>
    </div>
  );
}
