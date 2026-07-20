import { Suspense } from 'react';
// RESPONSIBILITY: Renders the page.tsx component/hook.
import { AdminFinanceTrustScoreClient } from '@/app/admin/admin_finance/trust-score/admin_finance_trust_score_components/AdminFinanceTrustScoreClient';
export default function TrustScorePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <AdminFinanceTrustScoreClient />
    </Suspense>
  );
}
