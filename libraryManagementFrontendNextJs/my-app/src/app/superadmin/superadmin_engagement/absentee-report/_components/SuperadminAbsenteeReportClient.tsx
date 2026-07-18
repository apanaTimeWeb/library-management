'use client';
// RESPONSIBILITY: Renders the SuperadminAbsenteeReportClient component.
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/Superadminsuperadmin_url_config';
import { ChevronRight, Send, Mail, Phone, CheckCircle, ChevronLeft } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useSuperadminAbsenteeReportClient } from '@/app/superadmin/superadmin_engagement/absentee-report/_components/useSuperadminAbsenteeReportClient';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export function SuperadminAbsenteeReportClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const {
    threshold, setThreshold, shift, setShift, toast, toastType,
    filtered, critical, moderate, notify, notifyAll
  } = useSuperadminAbsenteeReportClient();

  const searchedAbsentees = useMemo(() => {
    if (!searchTerm) return filtered;
    const lowerSearch = searchTerm.toLowerCase();
    return filtered.filter(a => 
      a.name?.toLowerCase().includes(lowerSearch) ||
      a.smartId?.toLowerCase().includes(lowerSearch) ||
      a.parentPhone?.toLowerCase().includes(lowerSearch) ||
      a.parentEmail?.toLowerCase().includes(lowerSearch)
    );
  }, [filtered, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, threshold, shift]);

  const totalPages = Math.ceil(searchedAbsentees.length / pageSize);
  const paginatedAbsentees = searchedAbsentees.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const badgeClass = (d: number) => d >= 7 ? 'bg-danger-bg text-danger' : 'bg-warning-bg text-warning';
  const getRowClass = (d: number) => {
    if (d >= 7) return 'bg-danger-bg/50 hover:bg-danger-bg/70';
    if (d >= 3) return 'bg-warning-bg/30 hover:bg-warning-bg/50';
    return 'hover:bg-bg-page/50';
  };

  return (
    <div className="relative p-2 sm:p-4">
      {/* ── Toast ── */}
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-bg-card border border-border shadow-xl rounded-md px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <span className={`text-sm font-bold ${toastType === 'info' ? 'text-info' : 'text-text-primary'}`}>{toast}</span>
        </div>
      )}

      {/* ── Breadcrumb ── */}
      <div className="flex items-center text-xs font-bold text-text-secondary mb-2 space-x-2">
        <Link href={SUPERADMIN_ROUTES.ENGAGEMENT_ATTENDANCE} className="hover:text-primary transition-colors">Engagement</Link>
        <ChevronRight size={12} />
        <span className="text-primary">Absentee Report</span>
      </div>

      {/* ── Page Header ── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary flex items-center gap-2 tracking-tight">📋 Absentee Report</h1>
          <p className="text-sm text-text-secondary mt-1">Students with consecutive absences requiring attention.</p>
        </div>
        <button onClick={notifyAll} className="flex items-center justify-center gap-1.5 bg-primary hover:brightness-95 text-primary-foreground text-sm font-bold py-2 px-4 rounded-md transition-all shadow-sm cursor-pointer">
          <Send size={14}/> Bulk Alert Parents
        </button>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center text-center">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Total Absentees</div>
          <div className="text-3xl font-extrabold text-text-primary leading-none mb-1">{filtered.length}</div>
          <div className="text-xs text-text-secondary">above {threshold === 'all' ? '0' : threshold} day threshold</div>
        </div>
        <div className="bg-bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center text-center">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Critical (7+ days)</div>
          <div className="text-3xl font-extrabold text-danger leading-none mb-1">{critical.length}</div>
          <div className="text-xs text-text-secondary">Immediate action needed</div>
        </div>
        <div className="bg-bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center text-center">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Moderate (3–6 days)</div>
          <div className="text-3xl font-extrabold text-warning leading-none mb-1">{moderate.length}</div>
          <div className="text-xs text-text-secondary">Monitoring required</div>
        </div>
        <div className="bg-bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col items-center text-center">
          <div className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Parents Notified</div>
          <div className="text-3xl font-extrabold text-success leading-none mb-1">{filtered.filter(r=>r.notified).length}</div>
          <div className="text-xs text-text-secondary">of {filtered.length} total</div>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="bg-bg-card border border-border rounded-t-lg p-4 border-b">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
            <div className="flex flex-col w-40">
              <span className="text-xs font-bold text-text-secondary mb-1">Days Threshold</span>
              <SuperadminSearchableDropdown
                options={[
                  { label: '3+ Days', value: '3' },
                  { label: '5+ Days', value: '5' },
                  { label: '7+ Days (Critical)', value: '7' },
                  { label: 'Show All', value: 'all' }
                ]}
                value={threshold}
                onChange={setThreshold}
              />
            </div>
            <div className="flex flex-col w-40">
              <span className="text-xs font-bold text-text-secondary mb-1">Shift</span>
              <SuperadminSearchableDropdown
                options={[
                  { label: 'All', value: 'All' },
                  { label: 'Morning', value: 'Morning' },
                  { label: 'Afternoon', value: 'Afternoon' },
                  { label: 'Evening', value: 'Evening' }
                ]}
                value={shift}
                onChange={setShift}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-danger-bg text-danger">{critical.length} critical</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-warning-bg text-warning">{moderate.length} moderate</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-success-bg text-success">{filtered.filter(r=>r.notified).length} notified</span>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-bg-card border border-border border-t-0 rounded-b-lg shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center p-4">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-base font-bold text-text-primary mb-1">No absentees above threshold!</p>
            <p className="text-sm text-text-secondary">All students have great attendance above the selected threshold.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full p-4">
            <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
            
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-bg-page/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Student</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Smart ID</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Shift</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Days Absent</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Last Seen</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Parent Contact</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedAbsentees.length > 0 ? (
                    paginatedAbsentees.map((a, index) => (
                      <TableRow 
                        key={index}
                        className={`transition-colors ${getRowClass(a.daysAbsent)}`}
                      >
                        <TableCell>
                          <div className="flex items-center py-2 h-full">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex flex-shrink-0 items-center justify-center text-xs font-bold mr-3">
                              {a.initials}
                            </div>
                            <span className="text-sm font-bold text-text-primary truncate">{a.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm text-text-secondary">
                          {a.smartId}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-bg-input text-text-secondary mt-2 inline-block">
                            {a.shift}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${badgeClass(a.daysAbsent)} mt-2 inline-block`}>
                            {a.daysAbsent} days
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-text-secondary">
                          {a.lastSeen}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col justify-center h-full space-y-1">
                            <span className="font-mono text-xs text-text-primary flex items-center">
                              <Phone size={10} className="mr-1 text-text-secondary"/> {a.parentPhone}
                            </span>
                            <span className="text-xs text-text-secondary flex items-center">
                              <Mail size={10} className="mr-1"/> {a.parentEmail}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="h-full flex items-center">
                            {a.notified ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-success-bg text-success"><CheckCircle size={12} /> Notified</span>
                            ) : (
                              <button onClick={() => notify(a.id)} className="flex items-center gap-1.5 px-3 py-1 bg-transparent border border-border text-text-primary text-xs font-bold rounded-md hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 cursor-pointer">
                                <Send size={12} className="mr-1"/> Alert
                              </button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-text-secondary">
                        No absentees match your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination Footer */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <span className="text-sm font-semibold text-text-secondary">
                Showing {paginatedAbsentees.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedAbsentees.length)} of {searchedAbsentees.length} records
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm font-semibold text-text-primary">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
