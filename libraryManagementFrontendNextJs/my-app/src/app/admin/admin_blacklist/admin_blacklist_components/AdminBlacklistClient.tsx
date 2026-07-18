'use client';
// RESPONSIBILITY: Client view component rendering blacklist table, search filter, and detail drawer (`Rule 1`, `Rule 8`, `Rule 19`, `Rule 45`, `Rule 49`).
// DATA FLOW: useAdminBlacklist -> AdminBlacklistClient -> Table / Add Dialog / Detail Drawer (`Rule 39`).

import { useState, useCallback } from 'react';
import { Search, ShieldAlert, AlertOctagon, X, Copy, Check, UserCheck, AlertTriangle } from 'lucide-react';
import { useAdminBlacklist, maskSensitiveData } from '@/app/admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklist';
import { AdminBlacklistSkeleton } from '@/app/admin/admin_blacklist/admin_blacklist_components/AdminBlacklistSkeleton';
import { AdminBlacklistEmptyState } from '@/app/admin/admin_blacklist/admin_blacklist_components/AdminBlacklistEmptyState';
import { AdminBlacklistAddDialog } from '@/app/admin/admin_blacklist/admin_blacklist_components/AdminBlacklistAddDialog';
import { BlacklistedStudentRecord } from '@/app/admin/admin_blacklist/admin_blacklist_types/admin_blacklist_types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import toast from 'react-hot-toast';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

function IdCell({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value || '');
    setCopied(true);
    toast.success('Blacklist ID copied (`Rule 49`)');
    setTimeout(() => setCopied(false), 2000);
  }, [value]);
  return (
    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
      <span>#{value}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy student ID"
        className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        title="Copy ID"
      >
        {copied ? <Check size={12} className="text-success" /> : <Copy size={12} />}
      </button>
    </div>
  );
}

function NameCell({ data }: { data: BlacklistedStudentRecord }) {
  if (!data) return null;
  const maskedPhone = maskSensitiveData(data.phone); (`Rule 45`)
  return (
    <div className="flex flex-col justify-center h-full leading-tight">
      <span className="font-semibold text-sm text-foreground">{data.name}</span>
      <span className="font-mono text-xs text-muted-foreground">{maskedPhone}</span>
    </div>
  );
}

function StatusCell() {
  return (
    <Badge variant="destructive" className="border-none gap-1.5 h-6 px-2.5">
      <AlertOctagon size={11} /> BANNED
    </Badge>
  );
}

export function AdminBlacklistClient() {

  const {
    list,
    totalCount,
    fetchState,
    searchInput,
    selectedStudent,
    setSearchInput,
    setSelectedStudent,
    handleAddStudent,
    handleRemoveStudent,
    handleResetSearch,
  } = useAdminBlacklist();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleRowClick = useCallback((student: BlacklistedStudentRecord) => {
    setSelectedStudent(student);
  }, [setSelectedStudent]);

  if (fetchState === 'loading' && list.length === 0) {
    return <AdminBlacklistSkeleton />;
  }
    const table = useClientTable(list, 10);

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* page Header */}
      <div className="border-b border-border pb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Smart Library 360 <span className="opacity-50">›</span> Admin <span className="opacity-50">›</span> Blacklist
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Blacklist</h1>
          <p className="text-sm text-muted-foreground mt-1">Students permanently banned from re-joining the library.</p>
        </div>
        <Button variant="destructive" onClick={() => setIsAddOpen(true)} className="gap-2">
          <AlertOctagon size={16} /> Blacklist Student
        </Button>
      </div>

      {/* Warning Banner (`Rule 4 / Rule 36: Tailwind Tokens`) */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-danger/10 border border-danger/30 text-danger shadow-sm">
        <ShieldAlert size={18} className="shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed text-muted-foreground m-0">
          <strong className="text-danger font-semibold">{totalCount} student{totalCount !== 1 ? 's' : ''}</strong> currently blacklisted. Blacklisted students cannot be re-admitted across any branch unless their ban is formally revoked here. Click any row to view diagnostic logs (`Rule 19`).
        </p>
      </div>

      {/* Search Input (`Rule 15: Debounced search`) */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search name, phone, or seat…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* Table or Empty State (`Rule 50`) */}
      {list.length === 0 ? (
        <AdminBlacklistEmptyState onResetSearch={handleResetSearch} isSearching={Boolean(searchInput.trim())} />
      ) : (
        <Card className="flex-1 min-h-96 shadow-sm border-border bg-card overflow-hidden flex flex-col">
          <div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 font-semibold">ID</th>
                  <th className="px-6 py-3 font-semibold">Student</th>
                  <th className="px-6 py-3 font-semibold">Reason</th>
                  <th className="px-6 py-3 font-semibold">Blacklisted By</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                  <th className="px-6 py-3 font-semibold">Prev Seat</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {list.slice((page - 1) * limit, page * limit).map((student) => (
                  <tr 
                    key={student.id} 
                    className="hover:bg-muted/30 transition-colors cursor-pointer group"
                    onClick={() => handleRowClick(student)}
                  >
                    <td className="px-6 py-3">
                      <IdCell value={student.id} />
                    </td>
                    <td className="px-6 py-3">
                      <NameCell data={student} />
                    </td>
                    <td className="px-6 py-3 text-xs text-muted-foreground font-medium truncate max-w-48">
                      {student.reason}
                    </td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">
                      {student.blacklistedBy}
                    </td>
                    <td className="px-6 py-3 text-xs text-muted-foreground">
                      {student.blacklistedOn}
                    </td>
                    <td className="px-6 py-3 text-xs font-mono text-muted-foreground">
                      {student.previousSeat || '-'}
                    </td>
                    <td className="px-6 py-3">
                      <StatusCell />
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-success hover:bg-success/10 hover:text-success opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Are you sure you want to revoke the ban for "${student.name}" and remove them from the blacklist?`)) {
                            handleRemoveStudent(student.id);
                          }
                        }}
                        title="Remove from blacklist (Revoke Ban)"
                      >
                        <UserCheck size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
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
            totalItems={list.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      )}

      {/* Add Dialog Modal (`Rule 16, 48`) */}
      <AdminBlacklistAddDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddStudent}
      />

      {/* Detail Drawer Modal (`Rule 19`) */}
      <Dialog open={!!selectedStudent} onOpenChange={(open) => !open && setSelectedStudent(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedStudent && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">#{selectedStudent.id}</span>
                    <DialogTitle>{selectedStudent.name}</DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 text-sm py-4">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone (Masked) (`Rule 45`)</span>
                  <p className="font-mono text-sm text-foreground mt-0.5">{maskSensitiveData(selectedStudent.phone)}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Previous Seat</span>
                  <p className="font-mono font-medium text-foreground mt-0.5">{selectedStudent.previousSeat || '-'}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Blacklisted By</span>
                  <p className="font-medium text-foreground mt-0.5">{selectedStudent.blacklistedBy}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date Banned</span>
                  <p className="font-medium text-foreground mt-0.5">{selectedStudent.blacklistedOn}</p>
                </div>
                <div className="col-span-2 border-t border-border pt-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ban Reason & Notes</span>
                  <div className="bg-danger/10 border border-danger/30 p-3 rounded-md mt-1.5 flex items-start gap-2.5 shadow-sm">
                    <AlertTriangle size={16} className="text-danger shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-medium break-words m-0">
                      {selectedStudent.reason}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex-row items-center justify-between sm:justify-between border-t border-border pt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to revoke the ban for "${selectedStudent.name}"?`)) {
                      handleRemoveStudent(selectedStudent.id);
                      setSelectedStudent(null);
                    }
                  }}
                  className="text-success hover:bg-success/10 hover:text-success gap-1.5"
                >
                  <UserCheck size={14} /> Revoke Ban & Restore
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedStudent(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
