import { ManagerDashboardClient } from '@/app/manager/manager_dashboard/manager_dashboard_components/ManagerDashboardClient';
import { ManagerDashboardErrorBoundary } from '@/app/manager/manager_dashboard/manager_dashboard_components/ManagerDashboardErrorBoundary';

// RESPONSIBILITY: Strict Server Component acting as the entry point for the manager dashboard.

export default function ManagerDashboardPage() {
  return (
    <ManagerDashboardErrorBoundary>
      <ManagerDashboardClient />
    </ManagerDashboardErrorBoundary>
  );
}
