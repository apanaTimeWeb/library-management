'use client';
// RESPONSIBILITY: Renders the SuperadminTrustScoreClient component.
import { ShieldCheck, ShieldAlert, ShieldX, Users } from 'lucide-react';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { useSuperadminTrustScoreClient } from '@/app/superadmin/superadmin_finance/trust-score/_components/useSuperadminTrustScoreClient';
import type { SuperadminFinanceTrustScoreStudent } from '@/app/superadmin/superadmin_finance/superadmin_finance_types/SuperadminFinanceTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

const BADGE_CLASS: Record<string, string> = {
  reliable: 'bg-success/10 text-success border-success/20',
  moderate: 'bg-warning/10 text-warning border-warning/20',
  low:      'bg-danger/10 text-danger border-danger/20',
};

const BADGE_ICON: Record<string, typeof ShieldCheck> = {
  reliable: ShieldCheck,
  moderate: ShieldAlert,
  low:      ShieldX,
};

function TrustGauge({ score }: { score: number }) {
  const color = score >= 70 ? 'var(--success)' : score >= 40 ? 'var(--warning)' : 'var(--danger)';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-input rounded-full overflow-hidden border border-border/50 max-w-xs">
        <div className="h-full transition-all duration-300 rounded-full" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-xs font-bold" style={{ color }}>{score}</span>
    </div>
  );
}

export function SuperadminTrustScoreClient() {
    const table = useClientTable(Array.from({ length: 5 }));
  const {
    levelFilter, setLevelFilter,
    shiftFilter, setShiftFilter,
    isLoading, filtered, lowTrust, avg, total,
  } = useSuperadminTrustScoreClient();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-primary">Trust Scores</h1>
        <p className="text-xs text-text-secondary">Student reliability rankings based on payment promise history.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card rounded-lg border border-border p-4 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Scored Students</span>
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <Users size={16} />
            </div>
          </div>
          <p className="text-3xl font-black text-text-primary tracking-tight relative z-10">{total}</p>
        </div>
        
        <div className="bg-card rounded-lg border border-danger/30 p-4 relative overflow-hidden group bg-gradient-to-br from-danger/5 to-transparent">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-xs font-bold text-danger uppercase tracking-wider">Low Trust (&lt;40)</span>
            <div className="w-8 h-8 rounded-md bg-danger/10 flex items-center justify-center text-danger group-hover:scale-110 transition-transform duration-300">
              <ShieldX size={16} />
            </div>
          </div>
          <p className="text-3xl font-black text-danger tracking-tight relative z-10">{lowTrust}</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-4 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Average Trust Score</span>
            <div className="w-8 h-8 rounded-md bg-success/10 flex items-center justify-center text-success group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck size={16} />
            </div>
          </div>
          <p className="text-3xl font-black text-text-primary tracking-tight relative z-10">{avg}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-card p-3 rounded-lg border border-border w-fit">
        <div className="w-48">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Levels', value: 'all' },
              { label: 'Reliable', value: 'reliable' },
              { label: 'Moderate', value: 'moderate' },
              { label: 'Low Trust', value: 'low' }
            ]}
            value={levelFilter}
            onChange={setLevelFilter}
          />
        </div>
        <div className="w-48">
          <SuperadminSearchableDropdown
            options={[
              { label: 'All Shifts', value: 'all' },
              { label: 'Morning', value: 'Morning' },
              { label: 'Evening', value: 'Evening' },
              { label: 'Full Day', value: 'Full Day' }
            ]}
            value={shiftFilter}
            onChange={setShiftFilter}
          />
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 uppercase text-xs font-semibold text-text-secondary border-b border-border">
              <th className="py-3 px-4 w-20">Rank</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Shift</th>
              <th className="py-3 px-4">Trust Score</th>
              <th className="text-center py-3 px-4">Total Promises</th>
              <th className="text-center py-3 px-4">Times Changed</th>
              <th className="text-center py-3 px-4">Fulfilled</th>
              <th className="text-left py-3 px-4">Badge</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              table.paginatedData.map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="h-4 w-16 bg-skeleton-base rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-3">
                    <div className="text-4xl">🛡️</div>
                    <p className="text-base text-text-secondary">Start recording payment promises to build trust scores.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map(( s: SuperadminFinanceTrustScoreStudent ) => {
                const Icon = BADGE_ICON[s.badge] || ShieldCheck;
                return (
                  <tr key={s.smartId} className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors">
                    <td className="py-3 px-4 text-sm font-bold font-mono text-text-primary">#{s.rank}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-text-primary text-sm">{s.studentName}</div>
                      <div className="text-xs text-text-secondary">{s.smartId}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-input text-text-primary border border-border px-2 py-0.5 rounded-full text-xs font-bold">{s.shift}</span>
                    </td>
                    <td className="py-3 px-4">
                      <TrustGauge score={s.trustScore} />
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-sm text-text-primary">{s.totalPromises}</td>
                    <td className="py-3 px-4 text-center">
                      {s.timesChanged > 0 ? (
                        <span className="text-warning font-bold text-sm">{s.timesChanged}x</span>
                      ) : (
                        <span className="text-text-secondary text-sm">0</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-sm text-text-primary">{s.fulfilledCount}</td>
                    <td className="py-3 px-4">
                      <span className={`${BADGE_CLASS[s.badge] || 'bg-input text-text-primary'} border px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 w-fit`}>
                        <Icon size={12} />
                        {s.badge === 'reliable' ? 'Reliable' : s.badge === 'moderate' ? 'Moderate' : 'Low Trust'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
      </div>
    </div>
  );
}
