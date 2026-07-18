'use client';
import { useManagerStudentReports } from '@/app/manager/manager_student-reports/manager_student_reports_hooks/useManagerStudentReports';
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";

export function ManagerStudentReportsClient() {
  const { reports: data, status, error } = useManagerStudentReports('This Month');
  const table = useClientTable(data?.absenteeReportData || [], 10);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Reports</h1>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {data && (
        <div className="space-y-6">
          <div className="bg-card p-4 rounded-xl border">
            <h2 className="text-lg font-bold mb-4">Absentees</h2>
            <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
            <table className="w-full text-left">
              <thead><tr><th>Student</th><th>Days Absent</th></tr></thead>
              <tbody>
                {table.paginatedData.map((a, i) => (
                  <tr key={i}>
                    <td>{a.name}</td>
                    <td>{a.absentDays}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TablePagination page={table.page} limit={table.limit} totalItems={table.totalItems} onPageChange={table.setPage} onLimitChange={table.setLimit} />
          </div>
        </div>
      )}
    </div>
  );
}