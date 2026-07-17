// RESPONSIBILITY: Renders the SuperadminDashboardLayout component.
// src/app/superadmin/dashboard/Layout.tsx
// Note: This wrapper is imported by pages inside superadmin/dashboard/
import Sidebar from '@/app/superadmin/superadmin_dashboard/SuperadminDashboardSidebar';
import { SuperadminDashboardHeader as Header } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_components/SuperadminDashboardHeader';

export default function SuperAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface text-on-surface overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-60 min-h-screen">
        <Header />

        <main className="pt-20 p-8 min-h-screen space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
