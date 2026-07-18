'use client';
// RESPONSIBILITY: Renders the error component.
import { AuthErrorBoundary } from '@/app/auth/auth_shared_components/AuthErrorBoundary';

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <AuthErrorBoundary>
      <div className="hidden">{error.message}</div>
    </AuthErrorBoundary>
  );
}
