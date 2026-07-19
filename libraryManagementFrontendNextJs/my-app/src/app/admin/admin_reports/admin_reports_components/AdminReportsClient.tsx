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
import { AdminReportsClientProps } from "./AdminReportsClient_types";
import { AdminReportsBranchTable } from './AdminReportsBranchTable';
import { AdminReportsKpiCard, ADMIN_REPORTS_KPI_META } from './AdminReportsKpiCard';
import { ADMIN_REPORTS_AXIS_TICK, ADMIN_REPORTS_TOOLTIP_STYLE, ADMIN_REPORTS_BRANCH_OPTIONS } from '../admin_reports_constants/AdminReportsConstants';

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
            <p className="text-xs text-muted-foreground mb-1 tracking-widest uppercase font-medium">Smart Library 360 › Admin › Reports</p>
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
              className="flex h-9 w-44 items-center justify-between rounded-md border border-border bg-bg-input px-3 py-1 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2 text-text-primary"
            >
              {ADMIN_REPORTS_BRANCH_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
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
              icon={ADMIN_REPORTS_KPI_META[i].icon}
              iconColor={ADMIN_REPORTS_KPI_META[i].iconColor}
              iconBg={ADMIN_REPORTS_KPI_META[i].iconBg}
              trend={card.trend as { up: boolean; value: string } | undefined}
              sub={card.sub as string | undefined}
            />
          ))}
        </div>

        {/* Charts 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Chart 1: Income vs Expenses */}
          <Card className="p-5 shadow-none border-border bg-bg-card rounded-[var(--radius-lg)]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10">
                  <BarChart2 size={16} className="text-primary" />
                </div>
                <h3 className="font-bold text-sm text-primary">Income vs Expenses</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-xs text-text-secondary font-medium">Income</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-danger" />
                  <span className="text-xs text-text-secondary font-medium">Expense</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={incomeData} barCategoryGap="30%" barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={ADMIN_REPORTS_AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis
                  tick={ADMIN_REPORTS_AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `₹${(Number(v) / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  {...ADMIN_REPORTS_TOOLTIP_STYLE}
                  formatter={((v: unknown, name: string) => [`₹${Number(v).toLocaleString('en-IN')}`, name]) as never}
                />
                <Bar dataKey="income"  fill="var(--primary)" radius={[5,5,0,0]} name="Income"  maxBarSize={32} />
                <Bar dataKey="expense" fill="var(--danger)"    radius={[5,5,0,0]} name="Expense" maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Chart 2: Shift-wise Occupancy Donut */}
          <Card className="p-5 shadow-none border-border bg-bg-card rounded-[var(--radius-lg)]">
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
                  {...ADMIN_REPORTS_TOOLTIP_STYLE}
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

          {/* Chart 3: Monthly Revenue Trend — Area */}
          <Card className="p-5 shadow-none border-border bg-bg-card rounded-[var(--radius-lg)]">
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
                    <stop offset="5%"  stopColor="var(--success)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={ADMIN_REPORTS_AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis
                  tick={ADMIN_REPORTS_AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => `₹${(Number(v) / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  {...ADMIN_REPORTS_TOOLTIP_STYLE}
                  formatter={((v: unknown) => [`₹${Number(v as number).toLocaleString('en-IN')}`, 'Revenue']) as never}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--success)"
                  strokeWidth={2.5}
                  fill="url(#revGradAdmin)"
                  dot={{ fill: 'var(--success)', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: 'var(--success)', strokeWidth: 2, stroke: 'var(--bg-card)' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Chart 4: Student Growth */}
          <Card className="p-5 shadow-none border-border bg-bg-card rounded-[var(--radius-lg)]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-info/10">
                  <Users size={16} className="text-info" />
                </div>
                <h3 className="font-bold text-sm text-primary">Student Growth</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-xs text-text-secondary font-medium">Joined</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-danger" />
                  <span className="text-xs text-text-secondary font-medium">Exited</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={growthData} barCategoryGap="30%" barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={ADMIN_REPORTS_AXIS_TICK} axisLine={false} tickLine={false} />
                <YAxis tick={ADMIN_REPORTS_AXIS_TICK} axisLine={false} tickLine={false} />
                <Tooltip
                  {...ADMIN_REPORTS_TOOLTIP_STYLE}
                  formatter={((v: unknown, name: string) => [v, name]) as never}
                />
                <Bar dataKey="joined" fill="var(--primary)" radius={[5,5,0,0]} name="Joined" maxBarSize={32} />
                <Bar dataKey="exited" fill="var(--danger)"    radius={[5,5,0,0]} name="Exited" maxBarSize={32} />
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

