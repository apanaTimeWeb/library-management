'use client';

// RESPONSIBILITY: Renders the Student Reports UI and renders data visualization using ApexCharts.
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Users, CalendarCheck, UserPlus, Phone } from 'lucide-react';
import { useStudentReports } from '@/app/manager/manager_student-reports/manager_student_reports_hooks/useStudentReports';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) as any;

const iconMap: Record<string, React.ElementType> = { Users, CalendarCheck, UserPlus, Phone };

export function ManagerStudentReportsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dateRange = searchParams.get('range') || 'This Month';

  const { reports: data, status, error } = useStudentReports(dateRange);

  const setDateRange = (range: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', range);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (status === 'loading') return <div className="mgr-page"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-300 rounded w-1/4"></div><div className="h-64 bg-gray-300 rounded w-full"></div></div></div>;
  if (!data || status === 'error')   return <div className="mgr-page"><div className="p-4 text-red-500">Failed to load reports: {error}</div></div>;

  return (
    <div className="mgr-page">
      <div className="mgr-page-header">
        <div>
          <p className="mgr-breadcrumb">Manager › Student Reports</p>
          <h1 className="mgr-page-title">Student Reports</h1>
          <p className="mgr-page-subtitle">Operational overview (finance reports blocked)</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <select className="mgr-select" value={dateRange} onChange={e => setDateRange(e.target.value)}>
          <option>This Week</option>
          <option>This Month</option>
          <option>Last 30 Days</option>
        </select>
        <select className="mgr-select" disabled>
          <option>Main Branch (read-only)</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.kpiCards?.map((kpi) => {
          const Icon = iconMap[kpi.icon];
          return (
            <div key={kpi.title} className="mgr-kpi-card">
              <div className="mgr-kpi-card-header">
                <div className="mgr-kpi-card-icon" style={{ backgroundColor: `${kpi.color}20` }}>
                  {Icon && <Icon size={20} style={{ color: kpi.color }} />}
                </div>
                <span className="mgr-kpi-card-label">{kpi.title}</span>
              </div>
              <div className="mgr-kpi-card-value">{kpi.value}</div>
              {kpi.trend && <div className="mgr-kpi-card-trend">{kpi.trend}</div>}
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="mgr-charts-grid">

        <div className="mgr-card">
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

        <div className="mgr-card">
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

        <div className="mgr-card">
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

        <div className="mgr-card">
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

        <div className="mgr-card col-span-2">
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
        <div className="mgr-card">
          <h3 className="font-semibold mb-4">Absentee Report</h3>
          <table className="mgr-table">
            <thead><tr className="mgr-table-header">
              <th className="mgr-table-th">Name</th>
              <th className="mgr-table-th">Absent Days</th>
              <th className="mgr-table-th">Last Present</th>
            </tr></thead>
            <tbody>
              {data.absenteeReportData?.map((r) => (
                <tr key={r.id} className="mgr-table-row">
                  <td className="mgr-table-td">{r.name}</td>
                  <td className="mgr-table-td">{r.absentDays}</td>
                  <td className="mgr-table-td">{r.lastPresent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mgr-card">
          <h3 className="font-semibold mb-4">Enquiry Conversion Rate</h3>
          <table className="mgr-table">
            <thead><tr className="mgr-table-header">
              <th className="mgr-table-th">Month</th>
              <th className="mgr-table-th">New</th>
              <th className="mgr-table-th">Converted</th>
              <th className="mgr-table-th">Rate</th>
            </tr></thead>
            <tbody>
              {data.enquiryConversionData?.map((r) => (
                <tr key={r.id} className="mgr-table-row">
                  <td className="mgr-table-td">{r.month}</td>
                  <td className="mgr-table-td">{r.new}</td>
                  <td className="mgr-table-td">{r.converted}</td>
                  <td className="mgr-table-td">{Math.round((r.converted / r.new) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mgr-card">
          <h3 className="font-semibold mb-4">Seat Utilization Report (per shift)</h3>
          <table className="mgr-table">
            <thead><tr className="mgr-table-header">
              <th className="mgr-table-th">Shift</th>
              <th className="mgr-table-th">Utilization %</th>
              <th className="mgr-table-th">Occupancy</th>
            </tr></thead>
            <tbody>
              {data.seatUtilizationData?.map((r) => (
                <tr key={r.id} className="mgr-table-row">
                  <td className="mgr-table-td">{r.shift}</td>
                  <td className="mgr-table-td">{r.utilization}%</td>
                  <td className="mgr-table-td">{r.occupancy}/{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mgr-card">
          <h3 className="font-semibold mb-4">Locker Utilization Report</h3>
          <table className="mgr-table">
            <thead><tr className="mgr-table-header">
              <th className="mgr-table-th">Type</th>
              <th className="mgr-table-th">Utilization %</th>
              <th className="mgr-table-th">Available</th>
            </tr></thead>
            <tbody>
              {data.lockerUtilizationData?.map((r) => (
                <tr key={r.id} className="mgr-table-row">
                  <td className="mgr-table-td">{r.type}</td>
                  <td className="mgr-table-td">{r.utilization}%</td>
                  <td className="mgr-table-td">{r.available}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mgr-card lg:col-span-2">
          <h3 className="font-semibold mb-4">Pending Maintenance (Assets & Seats)</h3>
          <table className="mgr-table">
            <thead><tr className="mgr-table-header">
              <th className="mgr-table-th">Item</th>
              <th className="mgr-table-th">Issue</th>
              <th className="mgr-table-th">Reported</th>
              <th className="mgr-table-th">Status</th>
            </tr></thead>
            <tbody>
              {data.maintenanceData?.map((r) => (
                <tr key={r.id} className="mgr-table-row">
                  <td className="mgr-table-td">{r.item}</td>
                  <td className="mgr-table-td">{r.issue}</td>
                  <td className="mgr-table-td">{r.reported}</td>
                  <td className="mgr-table-td">
                    <span className={`mgr-badge ${
                      r.status === 'Pending' ? 'mgr-badge--warning' :
                      r.status === 'Active' ? 'mgr-badge--success' : 'mgr-badge--danger'
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
