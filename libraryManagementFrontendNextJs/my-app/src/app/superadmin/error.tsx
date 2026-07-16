'use client';

import { SuperadminErrorBoundary } from '@/app/superadmin/superadmin_shared_components/SuperadminErrorBoundary';

export default function SuperadminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <SuperadminErrorBoundary>
      <div className="hidden">{error.message}</div>
    </SuperadminErrorBoundary>
  );
}
