'use client';
// RESPONSIBILITY: Renders the AdminFinanceTrustScoreClient component.
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ShieldCheck, ShieldX, Users, Search } from 'lucide-react';
import { useAdminFinanceTrustScore } from '@/app/admin/admin_finance/trust-score/admin_finance_trust_score_hooks/useAdminFinanceTrustScore';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';
import { AdminFinanceTrustScoreTrustGauge } from './AdminFinanceTrustScoreTrustGauge';
import {
  ADMIN_FINANCE_TRUST_SCORE_BADGE_CLASSES,
  ADMIN_FINANCE_TRUST_SCORE_BADGE_ICONS,
  ADMIN_FINANCE_TRUST_SCORE_LEVEL_OPTIONS,
  ADMIN_FINANCE_TRUST_SCORE_SHIFT_OPTIONS
} from '../admin_finance_trust_score_constants/AdminFinanceTrustScoreConstants';
import { useRouter } from 'next/navigation';

export function AdminFinanceTrustScoreClient() {
  const router = useRouter();

  const {
    levelFilter, setLevelFilter,
    shiftFilter, setShiftFilter,
    isLoading, filtered, lowTrust, avg,
    totalCount
  } = useAdminFinanceTrustScore();

  const [searchTerm, setSearchTerm] = useState('');
  const table = useClientTable(filtered || [], 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[22px] font-bold text-text-primary">Trust Scores</h1>
        <p className="text-sm text-text-secondary">Student reliability rankings based on payment promise history.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-[14px] shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium uppercase text-text-secondary">Scored Students</span>
            <div className="w-8 h-8 rounded-lg bg-bg-input flex items-center justify-center">
              <Users size={16} className="text-text-secondary" />
            </div>
          </div>
          <p className="text-[28px] font-bold text-text-primary">{totalCount}</p>
        </div>
        <div className="bg-bg-card border border-danger/20 rounded-[var(--radius-lg)] p-[14px] shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium uppercase text-danger">🔴 Low Trust (&lt;40)</span>
            <div className="w-8 h-8 rounded-lg bg-danger-bg flex items-center justify-center">
              <ShieldX size={16} className="text-danger" />
            </div>
          </div>
          <p className="text-[28px] font-bold text-danger">{lowTrust}</p>
        </div>
        <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-[14px] shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-in-out">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium uppercase text-text-secondary">Average Trust Score</span>
            <div className="w-8 h-8 rounded-lg bg-bg-input flex items-center justify-center">
              <ShieldCheck size={16} className="text-text-secondary" />
            </div>
          </div>
          <p className="text-[28px] font-bold text-text-primary">{avg}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-bg-card p-3 rounded-lg border border-border">
        <div className="w-40">
          <AdminSearchableDropdown 
            options={ADMIN_FINANCE_TRUST_SCORE_LEVEL_OPTIONS}
            value={levelFilter} 
            onValueChange={setLevelFilter}
          />
        </div>
        <div className="w-40">
          <AdminSearchableDropdown 
            options={ADMIN_FINANCE_TRUST_SCORE_SHIFT_OPTIONS}
            value={shiftFilter} 
            onValueChange={setShiftFilter}
          />
        </div>
      </div>

      <div className="bg-bg-card rounded-lg border border-border overflow-hidden flex flex-col">
        <div className="flex flex-col gap-4 w-full p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-secondary" />
              <Input 
                placeholder="Search..." 
                className="pl-8 bg-bg-input border-border focus-visible:ring-primary text-text-primary h-9 text-sm" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>

          <div className="mb-4">
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
          </div>

          <div className="rounded-md border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-primary/5">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Rank</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Student</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Shift</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Trust Score</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Total Promises</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Times Changed</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Fulfilled</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-text-secondary uppercase">Badge</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-border/50">
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j} className="py-3 px-4">
                          <div className="h-4 w-16 bg-skeleton-base rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : table.paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={8}>
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="text-4xl mb-4">🛡️</div>
                        <p className="text-base text-text-secondary">Start recording payment promises to build trust scores.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  table.paginatedData.map((s) => {
                    const Icon = ADMIN_FINANCE_TRUST_SCORE_BADGE_ICONS[s.badge] || ShieldCheck;
                    return (
                      <tr 
                        key={s.smartId} 
                        className="border-b border-border/50 hover:bg-primary/5 transition-colors duration-200 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/admin/students/${s.smartId}`);
                        }}
                      >
                        <td className="py-3 px-4 font-mono text-text-secondary">#{s.rank}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-text-primary truncate max-w-[150px]">{s.studentName}</div>
                          <div className="text-xs text-text-secondary">{s.smartId}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-bg-input text-text-primary border border-border px-2 py-0.5 rounded-full text-xs font-semibold">{s.shift}</span>
                        </td>
                        <td className="py-3 px-4">
                          <AdminFinanceTrustScoreTrustGauge score={s.trustScore} />
                        </td>
                        <td className="py-3 px-4 text-center text-text-primary font-medium">{s.totalPromises}</td>
                        <td className="py-3 px-4 text-center">
                          {s.timesChanged > 0 ? (
                            <span className="text-warning font-medium">{s.timesChanged}x</span>
                          ) : (
                            <span className="text-text-secondary">0</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-text-primary font-medium">{s.fulfilledCount}</td>
                        <td className="py-3 px-4">
                          <span className={`flex items-center gap-1 w-fit ${ADMIN_FINANCE_TRUST_SCORE_BADGE_CLASSES[s.badge] || ADMIN_FINANCE_TRUST_SCORE_BADGE_CLASSES.reliable}`}>
                            <Icon size={11} />
                            {s.badge === 'reliable' ? 'Reliable' : s.badge === 'moderate' ? 'Moderate' : 'Low Trust'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="p-4 border-t border-border flex items-center justify-between bg-page/30">
          <TablePagination 
            totalItems={table.totalItems} 
            page={table.page} 
            limit={table.limit} 
            onPageChange={table.setPage} 
          />
        </div>
      </div>
    </div>
  );
}
