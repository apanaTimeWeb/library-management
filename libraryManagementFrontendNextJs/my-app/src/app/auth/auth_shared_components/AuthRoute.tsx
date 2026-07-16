'use client';
import { usePathname } from 'next/navigation';

const AUTH_ROUTES = [
  '/auth'
];

export function AuthRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));

  if (!isAuthRoute) return <>{children}</>;

  return (
    <div className="min-h-screen bg-page text-text-primary">
      {children}
    </div>
  );
}
