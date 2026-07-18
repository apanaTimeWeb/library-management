'use client';
// RESPONSIBILITY: Renders the ManagerCommunicationRoute.tsx component.
import { usePathname } from 'next/navigation';


const COMMUNICATION_ROUTES = ['/communication'];

// ManagerRoute already provides the shell for all /communication/* paths.
export function ManagerCommunicationRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isCommunicationRoute = COMMUNICATION_ROUTES.some(r => pathname.startsWith(r));
  if (!isCommunicationRoute) return <>{children}</>;

  return <>{children}</>;
}

