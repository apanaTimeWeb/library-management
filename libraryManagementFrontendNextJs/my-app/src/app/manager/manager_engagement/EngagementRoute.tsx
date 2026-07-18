'use client';
// RESPONSIBILITY: Renders the EngagementRoute.tsx component.
import { usePathname } from 'next/navigation';


const ENGAGEMENT_ROUTES = ['/engagement'];

// ManagerRoute already provides the shell for all /engagement/* paths.
export function EngagementRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isEngagementRoute = ENGAGEMENT_ROUTES.some(r => pathname.startsWith(r));
  if (!isEngagementRoute) return <>{children}</>;

  return <>{children}</>;
}

