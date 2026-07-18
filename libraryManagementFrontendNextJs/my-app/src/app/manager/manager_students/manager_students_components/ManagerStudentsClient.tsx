// @ts-nocheck
'use client';
import { useState } from 'react';
import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Users2, Download } from 'lucide-react';
import { useManagerStudentsList } from '@/app/manager/manager_students/manager_students_hooks/useManagerStudentsList';
import { STUDENT_STATUS_OPTIONS, STUDENT_SHIFT_OPTIONS } from '@/app/manager/manager_students/manager_students_constants';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';
import { NameCell, ShiftCell, StatusCell, DueCell, ActionsCell } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsTableCells';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';
import { ManagerStudentsEmptyState } from '@/app/manager/manager_students/manager_students_components/ManagerStudentsEmptyState';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

// RESPONSIBILITY: Main Client view for the Manager Students directory.

export function ManagerStudentsClient() {
const [searchTerm, setSearchTerm] = useState('');

  const {
    students,
    filtered,
    status,
    error,
    search, setSearch,
    statusFilter, setStatusFilter,
    shiftFilter, setShiftFilter
  } = useManagerStudentsList();

  const router = useRouter();
  const table = useClientTable(filtered, 10);
  if (status === 'error') return <div className="p-8 text-danger">Failed to load: {error}</div>;

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Students</p>
          <h1 className="text-[22px] font-bold text-text-primary">Student Directory</h1>
          <p className="text-[13px] text-text-secondary mt-1.5">Manage admissions, seating, and billing for all active learners.</p>
        </div>
        <div className="flex gap-[8px] flex-wrap">
          <button className="bg-transparent border border-border text-text-primary rounded-lg h-10 px-4 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2"><Download size={14} /> Export</button>
          <Link href={MANAGER_ROUTES.STUDENTS_GROUP} className="bg-transparent border border-border text-text-primary rounded-lg h-10 px-4 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2">
            <Users2 size={14} /> Group Admission
          </Link>
          <Link href={MANAGER_ROUTES.STUDENTS_NEW} className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
            <UserPlus size={14} /> New Admission
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total',     value: students.length },
          { label: 'Active',    value: students.filter(s => s.status === 'Active').length },
          { label: 'Suspended', value: students.filter(s => s.status === 'Suspended').length },
          { label: 'Fee Due',   value: students.filter(s => s.due > 0).length },
        ].map(k => (
          <div key={k.label} className="bg-bg-pageg-card border border-border rounded-xl p-5 flex flex-col justify-center">
            <p className="text-[13px] font-medium text-text-secondary mb-1.5">{k.label}</p>
            <p className="text-text-primaryxl font-bold text-text-primary">{status === 'loading' ? '...' : k.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-[10px] mb-[16px]">
        <input
          className="w-full max-w-sm bg-bg-pageg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Search name, phone, Smart ID…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="w-[200px]">
          <ManagerSearchableDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={STUDENT_STATUS_OPTIONS}
          />
        </div>
        <div className="w-[200px]">
          <ManagerSearchableDropdown
            value={shiftFilter}
            onChange={setShiftFilter}
            options={STUDENT_SHIFT_OPTIONS}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="border border-border rounded-xl overflow-hidden bg-bg-pageg-card">
        {status === 'loading' ? (
          <div className="flex items-center justify-center h-64 text-text-secondary">Loading table...</div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <ManagerStudentsEmptyState />
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-bg-pageg-elevated border-b border-border">
                  <tr className="text-text-secondary text-xs uppercase tracking-wider">
                    <th className="px-4 py-3 font-semibold">Smart ID</th>
                    <th className="px-4 py-3 font-semibold">Student</th>
                    <th className="px-4 py-3 font-semibold">Shift / Seat</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Plan</th>
                    <th className="px-4 py-3 font-semibold">Due</th>
                    <th className="px-4 py-3 font-semibold">Joined</th>
                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {table.paginatedData.map((row) => (
                    <tr 
                      key={row.id} 
                      className="hover:bg-bg-pageg-page transition-colors cursor-pointer group"
                      onClick={() => router.push(`${MANAGER_ROUTES.STUDENTS}/${row.id}`)}
                    >
                      <td className="px-4 py-4"><span className="text-primary font-mono text-xs font-semibold">{row.smartId}</span></td>
    // @ts-ignore
                      <td className="px-4 py-4"><NameCell value={row.name} data={row} /></td>
    // @ts-ignore
                      <td className="px-4 py-4"><ShiftCell value={row.shift} data={row} /></td>
    // @ts-ignore
                      <td className="px-4 py-4"><StatusCell value={row.status} data={row} /></td>
                      <td className="px-4 py-4 text-[13px] text-text-secondary">{row.plan}</td>
    // @ts-ignore
                      <td className="px-4 py-4"><DueCell value={row.due} data={row} /></td>
                      <td className="px-4 py-4 text-[12px] text-text-secondary">{row.joined}</td>
    // @ts-ignore
                      <td className="px-4 py-4 text-right"><ActionsCell value={''} data={row} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
            </div>
            
          </>
        )}
      </div>
    </div>
  );
}
