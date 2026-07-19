'use client';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

// RESPONSIBILITY: Renders the AdminReportsClient component.
import { Download, FileText, IndianRupee, Users, Wallet, TrendingUp, BarChart2, PieChart as PieIcon, Activity , Search} from 'lucide-react';
import { useClientTable } from "@/components/ui/use-client-table";
import { Input } from '@/components/ui/input';
import toast, { Toaster } from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from 'recharts';
import { useState } from 'react';
import { useAdminReports } from '@/app/admin/admin_reports/admin_reports_hooks/useAdminReports';
import { TablePagination } from '@/components/ui/table-pagination';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminReportsClientProps, KpiCardProps } from "./AdminReportsClient_types";
import { AdminReportsBranchTable } from './AdminReportsBranchTable';

const KPI_META = [
  { icon: IndianRupee, iconColor: 'var(--primary)', iconBg: 'var(--icon-bg-primary)' },
  { icon: Wallet,      iconColor: 'var(--danger)',  iconBg: 'var(--icon-bg-danger)'  },
  { icon: TrendingUp,  iconColor: 'var(--success)', iconBg: 'var(--icon-bg-success)' },
  { icon: Users,       iconColor: 'var(--purple)',  iconBg: 'var(--icon-bg-purple)'  },
] as const;

const AXIS_TICK = { fill: 'var(--text-secondary)', fontSize: 11 } as const;

const TOOLTIP_STYLE = {
  contentStyle: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    fontSize: 12,
    color: 'var(--text-primary)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  },
  labelStyle:  { color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 4 },
  itemStyle:   { color: 'var(--text-primary)'   },
  cursor:      { fill: 'rgba(99,102,241,0.06)'  },
} as const;

function AdminReportsKpiCard({ label, value, icon: Icon, iconColor, iconBg, trend, sub }: KpiCardProps) {
  return (
    <Card className="p-5 flex flex-col gap-4 shadow-none border-border bg-card hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-background" style={{ '--bg': iconBg } as React.CSSProperties}>
          <Icon size={20} className="text-foreground" style={{ '--c': iconColor } as React.CSSProperties} />
        </div>
        {trend && (
          <Badge variant="secondary" className={`${trend.up ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'} border-none font-bold text-xs`}>
            {trend.up ? '+' : '-'}{trend.value}
          </Badge>
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground">{label}</h3>
        <p className="text-text-primary text-xl font-bold text-primary mt-1">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1.5">{sub}</p>}
      </div>
    </Card>
  );
}

export function AdminReportsClient({ initialData }: AdminReportsClientProps) {

  const {
    range,
    setRange,
    branch,
    setBranch,
    incomeData,
    revenueData,
    growthData,
    shiftOccupancy,
    kpiCards,
    handleExport,
    rangeOptions
  } = useAdminReports(initialData);

  const table = useClientTable(kpiCards, 10);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            fontSize: 13,
          },
        }}
      />

      <div className="space-y-6 pb-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-border pb-5">
          <div>
            <p className="text-xs text-muted-foreground mb-1 tracking-widest uppercase font-medium">Smart Library 360 â€º Admin â€º Reports</p>
            <h1 className="text-text-primary text-xl font-bold tracking-tight text-primary">Analytics & Reports</h1>
            <p className="text-sm text-muted-foreground mt-1">Financial health and operational overview across branches</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Range filter */}
            <div className="flex bg-muted/50 p-1 rounded-lg">
              {rangeOptions.map(o => (
                <button
                  key={o.key}
                  onClick={() => setRange(o.key)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${range === o.key ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-card/50'}`}
                >
                  {o.label}
                </button>
              ))}
            </div>

            {/* Branch filter */}
            <AdminSearchableDropdown
              value={branch}
              onChange={e => setBranch(e.target.value)}
              className="flex h-9 w-44 items-center justify-between rounded-md border border-border bg-input px-3 py-1 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2"
            >
              <option>All Branches</option>
              <option>Main Branch</option>
              <option>Branch 2</option>
              <option>Kothrud Center</option>
              <option>Nashik Branch</option>
            </AdminSearchableDropdown>

            <Button onClick={() => handleExport('PDF')} variant="outline" size="sm" className="gap-2 h-9">
              <FileText size={14} /> Export PDF
            </Button>
            <Button onClick={() => handleExport('Excel')} variant="default" size="sm" className="gap-2 h-9">
              <Download size={14} /> Export Excel
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {table.paginatedData.map((card: Record<string, unknown>, i: number) => (
            <AdminReportsKpiCard
              key={i}
              label={card.label as string}
              value={card.value as string}
              icon={KPI_META[i].icon}
              iconColor={KPI_META[i].iconColor}
              iconBg={KPI_META[i].iconBg}
              trend={card.trend as { up: boolean; value: string } | undefined}
              sub={card.sub as string | undefined}
            />
          ))}
        </div>

        {/* Charts 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Chart 1: Income vs Expenses */}
          <Card className="p-5 shadow-none border-border bg-card">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
                  <BarChart2 size={16} className="text-primary" />
                </div>
                <h3 className="font-bold text-sm text-primary">Income vs Expenses</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-background" style={{ '--bg': 'var(--chart-indigo)' } as React.CSSProperties} />
                  <span className="text-xs text-muted-foreground font-medium">Income</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-background" style={{ '--bg': 'var(--chart-red)' } as React.CSSProperties} />
                  <span className="text-xs text-muted-foreground font-medium">Expense</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={incomeData} barCategoryGap="30%" barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid-line)" vertical={false} />
                <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis
                  tick={AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `â‚¹${(Number(v) / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  {...TOOLTIP_STYLE}
                  formatter={((v: unknown, name: string) => [`â‚¹${Number(v).toLocaleString('en-IN')}`, name]) as never}
                />
                <Bar dataKey="income"  fill="var(--chart-indigo)" radius={[5,5,0,0]} name="Income"  maxBarSize={32} />
                <Bar dataKey="expense" fill="var(--chart-red)"    radius={[5,5,0,0]} name="Expense" maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Chart 2: Shift-wise Occupancy Donut */}
          <Card className="p-5 shadow-none border-border bg-card">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-warning/10">
                <PieIcon size={16} className="text-warning" />
              </div>
              <h3 className="font-bold text-sm text-primary">Shift-wise Occupancy %</h3>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={shiftOccupancy}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                  strokeWidth={0}
                >
                  {shiftOccupancy.map((e: Record<string, unknown>, i: number) => <Cell key={i} fill={e.color as string} />)}
                </Pie>
                <Tooltip
                  {...TOOLTIP_STYLE}
                  formatter={((v: unknown, name: string) => [`${v}%`, name]) as never}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11, color: 'var(--text-secondary)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Chart 3: Monthly Revenue Trend â€” Area */}
          <Card className="p-5 shadow-none border-border bg-card">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-success/10">
                  <Activity size={16} className="text-success" />
                </div>
                <h3 className="font-bold text-sm text-primary">Monthly Revenue Trend</h3>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success border-none font-bold">
                {rangeOptions.find(o => o.key === range)?.label}
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGradAdmin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--chart-green)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-green)" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid-line)" vertical={false} />
                <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis
                  tick={AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `â‚¹${(Number(v) / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  {...TOOLTIP_STYLE}
                  formatter={((v: unknown) => [`â‚¹${Number(v as number).toLocaleString('en-IN')}`, 'Revenue']) as never}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--chart-green)"
                  strokeWidth={2.5}
                  fill="url(#revGradAdmin)"
                  dot={{ fill: 'var(--chart-green)', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: 'var(--chart-green)', strokeWidth: 2, stroke: 'var(--bg-card)' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Chart 4: Student Growth */}
          <Card className="p-5 shadow-none border-border bg-card">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-info/10">
                  <Users size={16} className="text-info" />
                </div>
                <h3 className="font-bold text-sm text-primary">Student Growth</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-background" style={{ '--bg': 'var(--chart-indigo)' } as React.CSSProperties} />
                  <span className="text-xs text-muted-foreground font-medium">Joined</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-background" style={{ '--bg': 'var(--chart-red)' } as React.CSSProperties} />
                  <span className="text-xs text-muted-foreground font-medium">Exited</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={growthData} barCategoryGap="30%" barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid-line)" vertical={false} />
                <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <Tooltip
                  {...TOOLTIP_STYLE}
                  formatter={((v: unknown, name: string) => [v, name]) as never}
                />
                <Bar dataKey="joined" fill="var(--chart-indigo)" radius={[5,5,0,0]} name="Joined" maxBarSize={32} />
                <Bar dataKey="exited" fill="var(--chart-red)"    radius={[5,5,0,0]} name="Exited" maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

        </div>

        {/* Branch Summary Table */}
        <AdminReportsBranchTable rangeOptions={rangeOptions} range={range} />
      </div>
    </>
  );
}

