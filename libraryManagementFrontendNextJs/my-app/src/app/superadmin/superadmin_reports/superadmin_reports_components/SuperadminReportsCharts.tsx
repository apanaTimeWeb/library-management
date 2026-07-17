'use client';
import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { 
  SuperadminReportsDataResponse
} from '@/app/superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes';

interface Props {
  data: SuperadminReportsDataResponse;
}

const PIE_COLORS = ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--border)'];
const AXIS_TICK = { fill: 'var(--text-secondary)', fontSize: 11, fontFamily: 'Inter, sans-serif' };
const GRID_COLOR = 'var(--border)';
const TOOLTIP_CONTENT_STYLE = {
  background: 'var(--bg-sidebar)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  fontSize: 12,
  color: 'var(--text-primary)',
};

const rupeeFormatter = (value: unknown) => [`₹${Number(value ?? 0).toLocaleString()}`, ''] as [string, string];
const pctFormatter   = (value: unknown) => [`${value ?? 0}%`, ''] as [string, string];

function ChartCard({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) {
  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] flex flex-col overflow-hidden shadow-sm">
      <div className="p-5 border-b border-border bg-bg-page/30">
        <p className="text-sm font-bold text-text-primary">{title}</p>
        <p className="text-[11px] font-medium text-text-disabled mt-0.5">{subtitle}</p>
      </div>
      <div className="p-5 h-72">
        {children}
      </div>
    </div>
  );
}

export function SuperadminReportsCharts({ data }: Props) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      
      {/* Revenue vs Expenses */}
      <ChartCard title="Revenue vs Expenses" subtitle="Grouped comparison — last 6 months">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.revenueExpense} barCategoryGap="30%">
            <CartesianGrid vertical={false} stroke={GRID_COLOR} strokeOpacity={0.4} />
            <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={v => `₹${(Number(v) / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} formatter={rupeeFormatter} />
            <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
            <Bar dataKey="Revenue"  fill="var(--primary)" radius={[4,4,0,0]} />
            <Bar dataKey="Expenses" fill="var(--danger)"  radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Shift Occupancy Donut */}
      <ChartCard title="Shift-wise Seat Occupancy" subtitle="Percentage of occupied seats per shift">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data.occupancy} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3}>
              {data.occupancy.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} formatter={pctFormatter} />
            <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Revenue Trend Line */}
      <ChartCard title="Monthly Revenue Trend" subtitle="Rolling 12-month platform revenue">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.revenueTrend}>
            <CartesianGrid vertical={false} stroke={GRID_COLOR} strokeOpacity={0.4} />
            <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} tickFormatter={v => `₹${(Number(v) / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} formatter={rupeeFormatter} />
            <Line type="monotone" dataKey="Revenue" stroke="var(--success)" strokeWidth={2} dot={{ fill: 'var(--success)', r: 4 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Student Growth */}
      <ChartCard title="Student Growth" subtitle="Joined vs Exited per month">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.studentGrowth} barCategoryGap="30%">
            <CartesianGrid vertical={false} stroke={GRID_COLOR} strokeOpacity={0.4} />
            <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_CONTENT_STYLE} />
            <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }} />
            <Bar dataKey="Joined" fill="var(--info,#3B82F6)"   radius={[4,4,0,0]} />
            <Bar dataKey="Exited" fill="var(--danger)" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

    </div>
  );
}
