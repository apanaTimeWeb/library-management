// RESPONSIBILITY: Renders the AdminStudentsClient component.
'use client';

import { Download, Search } from 'lucide-react';
import { useAdminStudents, type AdminStudentData } from '@/app/admin/admin_students/admin_students_hooks/useAdminStudents';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface AdminStudentsClientProps {
  initialStudents: AdminStudentData[];
}

export function AdminStudentsClient({ initialStudents }: AdminStudentsClientProps) {
  const { search, setSearch, selectedBranch, filteredStudents } = useAdminStudents(initialStudents);

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Smart Library 360 › Admin › Students</p>
          <h1 className="text-2xl font-bold tracking-tight">{selectedBranch} - Students</h1>
          <p className="text-sm text-muted-foreground mt-1">Overview of students enrolled in the currently selected branch.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" /> Export List
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 max-w-sm">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9 h-10"
            placeholder="Search by student name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col">
        <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-y text-muted-foreground text-xs font-medium uppercase tracking-wider sticky top-0 z-10">
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
              {filteredStudents.map((student) => (
                <tr 
                  key={student.id} 
                  className="hover:bg-muted/10 transition-colors group cursor-pointer"
                >
                  <td className="px-4 py-4 font-bold text-xs text-primary">
                    {student.id}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-sm text-primary group-hover:text-primary transition-colors">{student.name}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground font-medium">
                    {student.shift}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-bold text-sm text-primary">{student.seat}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground font-medium">
                    {student.plan}
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant="secondary" className={`${student.status === 'Active' ? 'bg-success/10 text-success hover:bg-success/20' : 'bg-danger/10 text-danger hover:bg-danger/20'} border-none uppercase tracking-wide font-bold`}>
                      {student.status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
