// RESPONSIBILITY: Renders the Trust Gauge visual bar for a student's trust score.
import React from 'react';

export interface AdminFinanceTrustScoreTrustGaugeProps {
  score: number;
}

export function AdminFinanceTrustScoreTrustGauge({ score }: AdminFinanceTrustScoreTrustGaugeProps) {
  // Use Tailwind standard variables directly inline for the gauge coloring
  const colorVariable = score >= 70 ? 'var(--success)' : score >= 40 ? 'var(--warning)' : 'var(--danger)';
  
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-full max-w-[100px] bg-bg-input rounded-full overflow-hidden border border-border">
        <div 
          className="h-full rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${score}%`, backgroundColor: colorVariable }} 
        />
      </div>
      <span className="text-sm font-semibold" style={{ color: colorVariable }}>{score}</span>
    </div>
  );
}
