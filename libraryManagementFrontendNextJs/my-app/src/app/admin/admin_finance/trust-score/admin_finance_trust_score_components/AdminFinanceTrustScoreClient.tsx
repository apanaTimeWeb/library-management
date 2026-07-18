'use client';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

// RESPONSIBILITY: Renders the AdminFinanceTrustScoreClient component.
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ShieldCheck, ShieldAlert, ShieldX, Users , Search} from 'lucide-react';
import { useAdminFinanceTrustScore } from '@/app/admin/admin_finance/trust-score/admin_finance_trust_score_hooks/useAdminFinanceTrustScore';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

const BADGE_CLASS: Record<string, string> = {
  reliable: 'fin-badge fin-badge--success',
  moderate: 'fin-badge fin-badge--warning',
  low:      'fin-badge fin-badge--danger',
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
      <div className="fin-trust-track">
        <div className="fin-trust-fill w-[length:var(--w)] bg-[color:var(--bg)]" style={{ '--w': `${score}%`, '--bg': color } as React.CSSProperties} />
      </div>
      <span className="text-sm font-semibold text-[color:var(--c)]" style={{ '--c': color } as React.CSSProperties}>{score}</span>
    </div>
  );
}

export function AdminFinanceTrustScoreClient() {

  const {
    levelFilter, setLevelFilter,
    shiftFilter, setShiftFilter,
    isLoading, filtered, lowTrust, avg,
    totalCount
  } = useAdminFinanceTrustScore();

    const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
    const table = useClientTable(filtered || [], 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fin-page-title">Trust Scores</h1>
        <p className="fin-page-subtitle">Student reliability rankings based on payment promise history.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="fin-kpi-card">
          <div className="fin-kpi-card__header">
            <span className="fin-kpi-label">Scored Students</span>
            <Users size={16} className="fin-icon-muted" />
          </div>
          <p className="fin-kpi-value">{totalCount}</p>
        </div>
        <div className="fin-kpi-card fin-kpi-card--danger">
          <div className="fin-kpi-card__header">
            <span className="fin-kpi-label fin-kpi-label--danger">🔴 Low Trust (&lt;40)</span>
            <ShieldX size={16} className="fin-text-danger" />
          </div>
          <p className="fin-kpi-value fin-kpi-value--danger">{lowTrust}</p>
        </div>
        <div className="fin-kpi-card">
          <div className="fin-kpi-card__header">
            <span className="fin-kpi-label">Average Trust Score</span>
            <ShieldCheck size={16} className="fin-icon-muted" />
          </div>
          <p className="fin-kpi-value">{avg}</p>
        </div>
      </div>

      <div className="fin-filter-bar">
        <AdminSearchableDropdown className="fin-select w-40" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="all">All Levels</option>
          <option value="reliable">Reliable</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low Trust</option>
        </AdminSearchableDropdown>
        <AdminSearchableDropdown className="fin-select w-40" value={shiftFilter} onChange={(e) => setShiftFilter(e.target.value)}>
          <option value="all">All Shifts</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Full Day">Full Day</option>
        </AdminSearchableDropdown>
      </div>

      <div className="fin-card overflow-x-auto">
        
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

<div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <table className="w-full">
          <thead>
            <tr className="fin-table-header-row">
              <th className="text-left py-3 px-4">Rank</th>
              <th className="text-left py-3 px-4">Student</th>
              <th className="text-left py-3 px-4">Shift</th>
              <th className="text-left py-3 px-4">Trust Score</th>
              <th className="text-center py-3 px-4">Total Promises</th>
              <th className="text-center py-3 px-4">Times Changed</th>
              <th className="text-center py-3 px-4">Fulfilled</th>
              <th className="text-left py-3 px-4">Badge</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="fin-table-row">
                  {Array.from({ length: 8 }).map((_, j) => (
                    <td key={j} className="py-3 px-4">
                      <div className="fin-skeleton h-4 w-16" />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.paginatedData.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="fin-empty-state">
                    <div className="fin-empty-state__icon">🛡️</div>
                    <p className="fin-empty-state__title">Start recording payment promises to build trust scores.</p>
                  </div>
                </td>
              </tr>
            ) : (
              table.paginatedData.map((s) => {
                const Icon = BADGE_ICON[s.badge] || ShieldCheck;
                return (
                  <tr key={s.smartId} className="fin-table-hover-row fin-table-row">
                    <td className="py-3 px-4 fin-mono">#{s.rank}</td>
                    <td className="py-3 px-4">
                      <div className="fin-cell-name">{s.studentName}</div>
                      <div className="fin-cell-subtext">{s.smartId}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="fin-badge fin-badge--neutral">{s.shift}</span>
                    </td>
                    <td className="py-3 px-4">
                      <TrustGauge score={s.trustScore} />
                    </td>
                    <td className="py-3 px-4 text-center fin-text-body">{s.totalPromises}</td>
                    <td className="py-3 px-4 text-center">
                      {s.timesChanged > 0 ? (
                        <span className="fin-text-warning">{s.timesChanged}x</span>
                      ) : (
                        <span className="fin-text-muted">0</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center fin-text-body">{s.fulfilledCount}</td>
                    <td className="py-3 px-4">
                      <span className={`${BADGE_CLASS[s.badge] || 'fin-badge'} flex items-center gap-1 w-fit`}>
                        <Icon size={11} />
                        {s.badge === 'reliable' ? '🟢 Reliable' : s.badge === 'moderate' ? '🟡 Moderate' : '🔴 Low Trust'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
          </div> 
      <TablePagination 
        totalItems={table.totalItems} 
        page={table.page} 
        limit={table.limit} 
        onPageChange={table.setPage} 
      />
          <TablePagination
            page={page}
            limit={limit}
            totalItems={filtered.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
    </div>
  );
}
