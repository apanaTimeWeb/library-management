'use client';
import { useState } from 'react';
// RESPONSIBILITY: Renders the AdminStudentsClient component.

import { Download, Search } from 'lucide-react';
import { useAdminStudents } from '@/app/admin/admin_students/admin_students_hooks/useAdminStudents';
import type { AdminStudentsClientProps } from '@/app/admin/admin_students/admin_students_types/admin_students_types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

export function AdminStudentsClient({ initialStudents }: AdminStudentsClientProps) {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { search, setSearch, selectedBranch, filteredStudents } = useAdminStudents(initialStudents);
    const table = useClientTable(filteredStudents, 10);
  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="text-sm text-text-secondary mb-1">Smart Library 360 › Admin › Students</p>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">{selectedBranch} - Students</h1>
          <p className="text-sm text-text-secondary mt-1">Overview of students enrolled in the currently selected branch.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-border text-text-primary">
            <Download size={16} className="mr-2" /> Export List
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 max-w-sm">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <Input
            className="pl-9 h-10 border-border bg-bg-input text-text-primary placeholder:text-text-secondary"
            placeholder="Search by student name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 border border-border bg-bg-card rounded-[var(--radius-lg)] overflow-hidden flex flex-col shadow-sm">
        <div className="mb-4">
        <TableToolbar 
          searchTerm={table.searchTerm} 
          onSearchChange={table.setSearchChange || table.setSearchTerm} 
        />
      </div>
      <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-bg-page border-b border-border text-text-secondary text-xs font-medium uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Shift</th>
                <th className="px-4 py-3">Seat</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStudents.slice((page - 1) * limit, page * limit).map((student) => (
                <tr 
                  key={student.id} 
                  className="hover:bg-bg-page transition-colors group cursor-pointer"
                >
                  <td className="px-4 py-4 font-bold text-xs text-primary">
                    {student.id}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-sm text-text-primary group-hover:text-primary transition-colors">{student.name}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-text-secondary font-medium">
                    {student.shift}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-bold text-sm text-text-primary">{student.seat}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-text-secondary font-medium">
                    {student.plan}
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant="secondary" className={`${student.status === 'Active' ? 'bg-success-bg text-success hover:bg-success/20' : 'bg-danger-bg text-danger hover:bg-danger/20'} border-none uppercase tracking-wide font-bold`}>
                      {student.status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-text-secondary">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div> 
      <TablePagination 
        totalItems={table.totalItems} 
        page={table.page} 
        limit={table.limit} 
        onPageChange={table.setPage} 
      />
          <TablePagination
            page={page}
            limit={limit}
            totalItems={filteredStudents.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </div>
    </div>
  );
}
