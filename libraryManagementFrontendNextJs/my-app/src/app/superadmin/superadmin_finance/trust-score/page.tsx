'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState, useEffect } from 'react';

import { ShieldCheck, ShieldAlert, ShieldX, Users } from 'lucide-react';

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

type Student = {
  rank: number;
  studentName: string;
  smartId: string;
  shift: 'Morning' | 'Evening' | 'Full Day';
  trustScore: number;
  totalPromises: number;
  timesChanged: number;
  fulfilledCount: number;
  badge: 'reliable' | 'moderate' | 'low';
};

import { SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST } from '@/app/superadmin/superadmin_finance/superadmin_finance_constants/SuperadminFinanceConstants';

function TrustGauge({ score }: { score: number }) {
  const color = score >= 70 ? 'var(--success)' : score >= 40 ? 'var(--warning)' : 'var(--danger)';
  return (
    <div className="flex items-center gap-2">
      <div className="fin-trust-track">
        <div className="fin-trust-fill" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-sm font-semibold" style={{ color }}>{score}</span>
    </div>
  );
}

export default function TrustScores() {
  const [levelFilter, setLevelFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST.filter((s) => {
    const lm = levelFilter === 'all' || s.badge === levelFilter;
    const sm = shiftFilter === 'all' || s.shift === shiftFilter;
    return lm && sm;
  });

  const lowTrust = SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST.filter((s) => s.trustScore < 40).length;
  const avg = Math.round(SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST.reduce((a, s) => a + s.trustScore, 0) / SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fin-page-title">Trust Scores</h1>
        <p className="fin-page-subtitle">Student reliability rankings based on payment promise history.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="fin-kpi-card">
          <div className="fin-kpi-card__header">
            <span className="fin-kpi-label">Scored Students</span>
            <Users size={16} className="fin-icon-muted" />
          </div>
          <p className="fin-kpi-value">{SUPERADMIN_FINANCE_MOCK_STUDENTS_TRUST.length}</p>
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
        <select className="fin-select w-40" value={levelFilter} onChange={( e: any ) => setLevelFilter(e.target.value)}>
          <option value="all">All Levels</option>
          <option value="reliable">Reliable</option>
          <option value="moderate">Moderate</option>
          <option value="low">Low Trust</option>
        </select>
        <select className="fin-select w-40" value={shiftFilter} onChange={( e: any ) => setShiftFilter(e.target.value)}>
          <option value="all">All Shifts</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Full Day">Full Day</option>
        </select>
      </div>

      <div className="fin-card overflow-x-auto">
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
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="fin-empty-state">
                    <div className="fin-empty-state__icon">🛡️</div>
                    <p className="fin-empty-state__title">Start recording payment promises to build trust scores.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map(( s: FlexRecord ) => {
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
    </div>
  );
}


