// RESPONSIBILITY: Renders the layout.tsx component.
import { ManagerRoute } from '@/app/manager/manager_shared_components/ManagerRoute';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return <ManagerRoute>{children}</ManagerRoute>;
}

