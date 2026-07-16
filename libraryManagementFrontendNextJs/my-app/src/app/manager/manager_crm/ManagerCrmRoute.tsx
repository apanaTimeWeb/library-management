'use client';
import { usePathname } from 'next/navigation';
const CRM_ROUTES = ['/crm'];

// ManagerRoute already provides the shell (sidebar + header) for all /crm/* paths.
// This component only injects the CSS tokens — no duplicate shell.
// RESPONSIBILITY: Route wrapper for CRM module.

export function ManagerCrmRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isCrmRoute = CRM_ROUTES.some(r => pathname.startsWith(r));
  if (!isCrmRoute) return <>{children}</>;

  return <>{children}</>;
}
