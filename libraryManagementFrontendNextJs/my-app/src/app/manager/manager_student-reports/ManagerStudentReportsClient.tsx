'use client';

'use client';

// RESPONSIBILITY: Renders the Student Reports UI and renders data visualization using ApexCharts.
import { useState } from 'react';
import { TablePagination } from '@/components/ui/table-pagination';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Users, CalendarCheck, UserPlus, Phone } from 'lucide-react';
import { useManagerStudentReports } from '@/app/manager/manager_student-reports/manager_student_reports_hooks/useManagerStudentReports';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) as React.ComponentType<Record<string, unknown>>;

const iconMap: Record<string, React.ElementType> = { Users, CalendarCheck, UserPlus, Phone };

export function ManagerStudentReportsClient() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dateRange = searchParams.get('range') || 'This Month';

  const { reports: data, status, error } = useManagerStudentReports(dateRange);

  const setDateRange = (range: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', range);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (status === 'loading') return <div className="p-6 min-h-screen"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-300 rounded w-1/4"></div><div className="h-64 bg-gray-300 rounded w-full"></div></div></div>;
  if (!data || status === 'error')   return <div className="p-6 min-h-screen"><div className="p-4 text-red-500">Failed to load reports: {error}</div></div>;

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8">
        <div>
          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Manager › Student Reports</p>
          <h1 className="text-[22px] font-bold text-text-primary">Student Reports</h1>
          <p className="text-[13px] text-text-secondary mt-1.5">Operational overview (finance reports blocked)</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div style={{ width: 200 }}>
          <ManagerSearchableDropdown
            value={dateRange}
            onChange={(v) => setDateRange(v)}
            options={[
              { label: 'This Week', value: 'This Week' },
              { label: 'This Month', value: 'This Month' },
              { label: 'Last 30 Days', value: 'Last 30 Days' },
            ]}
          />
        </div>
        <div style={{ width: 200 }}>
          <ManagerSearchableDropdown
            value="Main Branch (read-only)"
            onChange={() => {}}
            options={[{ label: 'Main Branch (read-only)', value: 'Main Branch (read-only)' }]}
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.kpiCards?.map((kpi) => {
          const Icon = iconMap[kpi.icon];
          return (
            <div key={kpi.title} className="bg-bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}20` }}>
                  {Icon && <Icon size={20} style={{ color: kpi.color }} />}
                </div>
                <span className="text-[13px] font-medium text-text-secondary uppercase tracking-wider">{kpi.title}</span>
              </div>
              <div className="text-3xl font-bold text-text-primary">{kpi.value}</div>
              {kpi.trend && <div className="text-xs font-medium mt-2 bg-bg-elevated px-2 py-1 rounded w-fit text-text-secondary">{kpi.trend}</div>}
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Shift-wise Occupancy</h3>
          <Chart 
            type="pie" 
            height={280}
            options={{
              labels: data.shiftOccupancyData?.map(d => d.name) || [],
              theme: { mode: 'light' },
              legend: { position: 'bottom' }
            }}
            series={data.shiftOccupancyData?.map(d => d.occupancy) || []}
          />
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Student Growth Trend (Last 30 days)</h3>
          <Chart 
            type="line" 
            height={280}
            options={{
              chart: { id: 'student-growth' },
              xaxis: { categories: data.studentGrowthData?.map(d => d.date) || [] },
              stroke: { curve: 'smooth', width: 2 },
              colors: ['#10b981', '#ef4444']
            }}
            series={[
              { name: 'Joined', data: data.studentGrowthData?.map(d => d.joined) || [] },
              { name: 'Exited', data: data.studentGrowthData?.map(d => d.exited) || [] }
            ]}
          />
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Daily Attendance Trend</h3>
          <Chart 
            type="bar" 
            height={280}
            options={{
              chart: { id: 'attendance-trend' },
              xaxis: { categories: data.attendanceTrendData?.map(d => d.date) || [] },
              colors: ['#3b82f6'],
              plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } }
            }}
            series={[{ name: 'Attendance %', data: data.attendanceTrendData?.map(d => d.attendance) || [] }]}
          />
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Top Absentees (Top 5 students)</h3>
          <Chart 
            type="bar" 
            height={280}
            options={{
              chart: { id: 'top-absentees' },
              plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
              xaxis: { categories: data.topAbsenteesData?.map(d => d.name) || [] },
              colors: ['#ef4444']
            }}
            series={[{ name: 'Absent Days', data: data.topAbsenteesData?.map(d => d.absent) || [] }]}
          />
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-6 col-span-2">
          <h3 className="font-semibold mb-4">Complaints Status</h3>
          <Chart 
            type="donut" 
            height={300}
            options={{
              labels: data.complaintStatusData?.map(d => d.name) || [],
              colors: ['#ef4444', '#10b981'],
              legend: { position: 'bottom' }
            }}
            series={data.complaintStatusData?.map(d => d.value) || []}
          />
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Absentee Report</h3>
          
        <div className="flex justify-end mb-4">
            <input 
              type="text" 
              placeholder="Search in table..." 
              className="px-3 py-2 border rounded-md text-sm w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <table className="w-full text-sm text-left">
            <thead><tr className="bg-primary-subtle text-xs uppercase font-semibold text-text-secondary text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Absent Days</th>
              <th className="p-3">Last Present</th>
            </tr></thead>
            <tbody>
              {data.absenteeReportData?.map((r) => (
                <tr key={r.id} className="border-b border-border hover:bg-primary-subtle/30 transition-colors">
                  <td className="p-3 text-text-primary">{r.name}</td>
                  <td className="p-3 text-text-primary">{r.absentDays}</td>
                  <td className="p-3 text-text-primary">{r.lastPresent}</td>
                </tr>
              ))}
            </tbody>
          </table>
      <TablePagination page={page} limit={limit} totalItems={100} onPageChange={setPage} onLimitChange={setLimit} />

        </div>

        <div className="bg-bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Enquiry Conversion Rate</h3>
          <table className="w-full text-sm text-left">
            <thead><tr className="bg-primary-subtle text-xs uppercase font-semibold text-text-secondary text-left">
              <th className="p-3">Month</th>
              <th className="p-3">New</th>
              <th className="p-3">Converted</th>
              <th className="p-3">Rate</th>
            </tr></thead>
            <tbody>
              {data.enquiryConversionData?.map((r) => (
                <tr key={r.id} className="border-b border-border hover:bg-primary-subtle/30 transition-colors">
                  <td className="p-3 text-text-primary">{r.month}</td>
                  <td className="p-3 text-text-primary">{r.new}</td>
                  <td className="p-3 text-text-primary">{r.converted}</td>
                  <td className="p-3 text-text-primary">{Math.round((r.converted / r.new) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Seat Utilization Report (per shift)</h3>
          <table className="w-full text-sm text-left">
            <thead><tr className="bg-primary-subtle text-xs uppercase font-semibold text-text-secondary text-left">
              <th className="p-3">Shift</th>
              <th className="p-3">Utilization %</th>
              <th className="p-3">Occupancy</th>
            </tr></thead>
            <tbody>
              {data.seatUtilizationData?.map((r) => (
                <tr key={r.id} className="border-b border-border hover:bg-primary-subtle/30 transition-colors">
                  <td className="p-3 text-text-primary">{r.shift}</td>
                  <td className="p-3 text-text-primary">{r.utilization}%</td>
                  <td className="p-3 text-text-primary">{r.occupancy}/{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Locker Utilization Report</h3>
          <table className="w-full text-sm text-left">
            <thead><tr className="bg-primary-subtle text-xs uppercase font-semibold text-text-secondary text-left">
              <th className="p-3">Type</th>
              <th className="p-3">Utilization %</th>
              <th className="p-3">Available</th>
            </tr></thead>
            <tbody>
              {data.lockerUtilizationData?.map((r) => (
                <tr key={r.id} className="border-b border-border hover:bg-primary-subtle/30 transition-colors">
                  <td className="p-3 text-text-primary">{r.type}</td>
                  <td className="p-3 text-text-primary">{r.utilization}%</td>
                  <td className="p-3 text-text-primary">{r.available}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Pending Maintenance (Assets & Seats)</h3>
          <table className="w-full text-sm text-left">
            <thead><tr className="bg-primary-subtle text-xs uppercase font-semibold text-text-secondary text-left">
              <th className="p-3">Item</th>
              <th className="p-3">Issue</th>
              <th className="p-3">Reported</th>
              <th className="p-3">Status</th>
            </tr></thead>
            <tbody>
              {data.maintenanceData?.map((r) => (
                <tr key={r.id} className="border-b border-border hover:bg-primary-subtle/30 transition-colors">
                  <td className="p-3 text-text-primary">{r.item}</td>
                  <td className="p-3 text-text-primary">{r.issue}</td>
                  <td className="p-3 text-text-primary">{r.reported}</td>
                  <td className="p-3 text-text-primary">
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      r.status === 'Pending' ? 'bg-warning-bg text-warning' :
                      r.status === 'Active' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'
                    }`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

