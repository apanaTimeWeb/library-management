'use client';
// RESPONSIBILITY: Renders the Student Reports UI and renders data visualization using ApexCharts.
'use client';
// RESPONSIBILITY: Renders the Student Reports UI and renders data visualization using ApexCharts.
import { useState } from 'react';
import { TablePagination } from '@/components/ui/table-pagination';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Users, CalendarCheck, UserPlus, Phone } from 'lucide-react';
import { useManagerStudentReports } from '@/app/manager/manager_student-reports/manager_student_reports_hooks/useManagerStudentReports';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { MAINTENANCE_STATUS_BADGE } from '@/app/manager/manager_student-reports/manager_student-reports_constants';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) as React.ComponentType<Record<string, unknown>>;

const iconMap: Record<string, React.ElementType> = { Users, CalendarCheck, UserPlus, Phone };

export function ManagerStudentReportsClient() {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dateRange = searchParams.get('range') || 'This Month';

  const { reports: data, status, error } = useManagerStudentReports(dateRange);
  const table = useClientTable(data?.absenteeReportData || [], 10);
      </div>
    </div>
  );
}

