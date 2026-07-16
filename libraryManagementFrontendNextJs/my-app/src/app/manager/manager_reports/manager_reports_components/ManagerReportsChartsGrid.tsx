import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line,
} from 'recharts';
import { ManagerReportsData } from '../manager_reports_types/ManagerReportsTypes';

// RESPONSIBILITY: Renders the 2x2 grid of Recharts components for the manager reports.

const PIE_OCCUPANCY = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];
const PIE_COMPLAINTS = ['#EF4444', '#10B981'];

const TOOLTIP_STYLE = {
  contentStyle: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '12px',
    color: 'var(--text-primary)',
  },
  labelStyle: { color: 'var(--text-secondary)' },
};
const AXIS_TICK = { fill: 'var(--text-secondary)', fontSize: 11 } as const;

interface ManagerReportsChartsGridProps {
  data: ManagerReportsData;
}

export function ManagerReportsChartsGrid({ data }: ManagerReportsChartsGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Chart 1: Occupancy */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-200 ease-in-out">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Shift-wise Occupancy</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data.occupancyData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.occupancyData.map((_, i) => (
                <Cell key={i} fill={PIE_OCCUPANCY[i % PIE_OCCUPANCY.length]} />
              ))}
            </Pie>
            <Tooltip {...TOOLTIP_STYLE} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2: Growth */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-200 ease-in-out">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Student Growth Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data.growthData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="var(--border)" opacity={0.5} />
            <XAxis dataKey="date" tick={AXIS_TICK} />
            <YAxis tick={AXIS_TICK} />
            <Tooltip {...TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="joined" stroke="#6366F1" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="exited" stroke="#EF4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3: Attendance */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-200 ease-in-out">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Daily Attendance Trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.attendanceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="var(--border)" opacity={0.5} />
            <XAxis dataKey="day" tick={AXIS_TICK} />
            <YAxis tick={AXIS_TICK} />
            <Tooltip {...TOOLTIP_STYLE} />
            <Bar dataKey="avg" fill="#10B981" name="Attendance %" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 4: Absentees */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-200 ease-in-out">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Top Absentees (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.absenteesChartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid stroke="var(--border)" horizontal={false} opacity={0.5} />
            <XAxis type="number" tick={AXIS_TICK} />
            <YAxis dataKey="name" type="category" tick={AXIS_TICK} width={80} />
            <Tooltip {...TOOLTIP_STYLE} />
            <Bar dataKey="absences" fill="#EF4444" name="Days Absent" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 5: Complaints (Full Width) */}
      <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-200 ease-in-out">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Complaints Status</h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data.complaintsData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.complaintsData.map((_, i) => (
                <Cell key={i} fill={PIE_COMPLAINTS[i % PIE_COMPLAINTS.length]} />
              ))}
            </Pie>
            <Tooltip {...TOOLTIP_STYLE} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
