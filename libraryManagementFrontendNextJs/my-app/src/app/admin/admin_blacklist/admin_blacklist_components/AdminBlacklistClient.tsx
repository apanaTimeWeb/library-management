'use client';

// RESPONSIBILITY: Client view component rendering blacklist table, search filter, and detail drawer (`Rule 1`, `Rule 8`, `Rule 19`, `Rule 45`, `Rule 49`).
// DATA FLOW: useAdminBlacklist -> AdminBlacklistClient -> AG Grid / Add Dialog / Detail Drawer (`Rule 39`).

import { useState, useMemo, useCallback } from 'react';
import { Search, ShieldAlert, AlertOctagon, X, Copy, Check, UserCheck, AlertTriangle } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { useAdminBlacklist, maskSensitiveData } from '@/app/admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklist';
import { AdminBlacklistSkeleton } from '@/app/admin/admin_blacklist/admin_blacklist_components/AdminBlacklistSkeleton';
import { AdminBlacklistEmptyState } from '@/app/admin/admin_blacklist/admin_blacklist_components/AdminBlacklistEmptyState';
import { AdminBlacklistAddDialog } from '@/app/admin/admin_blacklist/admin_blacklist_components/AdminBlacklistAddDialog';
import { BlacklistedStudentRecord } from '@/app/admin/admin_blacklist/admin_blacklist_types/admin_blacklist_types';
import toast from 'react-hot-toast';

ModuleRegistry.registerModules([AllCommunityModule]);

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
    <span className="admin-badge admin-badge-danger">
      <AlertOctagon size={11} /> BANNED
    </span>
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

  const [isAddOpen, setIsAddOpen] = useState(false);

  const colDefs = useMemo(() => [
    { field: 'id',            headerName: 'ID',             width: 100, cellRenderer: IdCell },
    { field: 'name',          headerName: 'STUDENT',        flex: 2,    minWidth: 180, cellRenderer: NameCell },
    { field: 'reason',        headerName: 'REASON',         flex: 2.5,  minWidth: 200, cellClass: 'text-xs text-muted-foreground truncate font-medium' },
    { field: 'blacklistedBy', headerName: 'BLACKLISTED BY', flex: 1.5,  minWidth: 150, cellClass: 'text-xs text-muted-foreground' },
    { field: 'blacklistedOn', headerName: 'DATE',           flex: 1,    minWidth: 110, cellClass: 'text-xs text-muted-foreground' },
    { field: 'previousSeat',  headerName: 'PREV SEAT',      flex: 0.8,  minWidth: 100, cellClass: 'text-xs font-mono text-muted-foreground' },
    { headerName: 'STATUS',   flex: 1,    minWidth: 120, sortable: false, cellRenderer: StatusCell },
    {
      headerName: 'ACTIONS', flex: 0.8, minWidth: 90, sortable: false,
      cellRenderer: ({ data }: { data: BlacklistedStudentRecord }) => {
        if (!data) return null;
        return (
          <div className="flex items-center h-full">
            <button
              type="button"
              className="p-1.5 rounded-md text-success hover:bg-success/10 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to revoke the ban for "${data.name}" and remove them from the blacklist?`)) {
                  handleRemoveStudent(data.id);
                }
              }}
              title="Remove from blacklist (Revoke Ban)"
            >
              <UserCheck size={16} />
            </button>
          </div>
        );
      },
    },
  ], [handleRemoveStudent]);

  const handleRowClick = useCallback((event: { data?: BlacklistedStudentRecord }) => {
    if (event.data) {
      setSelectedStudent(event.data); (`Rule 19`)
    }
  }, [setSelectedStudent]);

  if (fetchState === 'loading' && list.length === 0) {
    return <AdminBlacklistSkeleton />;
  }

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* Page Header */}
      <div className="admin-page-header border-b border-border pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="admin-breadcrumb">Smart Library 360 › Admin › Blacklist</p>
          <h1 className="admin-page-title">Blacklist</h1>
          <p className="admin-page-subtitle">Students permanently banned from re-joining the library.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="admin-btn-danger flex items-center gap-2"
        >
          <AlertOctagon size={16} /> Blacklist Student
        </button>
      </div>

      {/* Warning Banner (`Rule 4 / Rule 36: Tailwind Tokens`) */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-danger/10 border border-danger/30 text-danger">
        <ShieldAlert size={18} className="shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed text-muted-foreground m-0">
          <strong className="text-danger font-semibold">{totalCount} student{totalCount !== 1 ? 's' : ''}</strong> currently blacklisted. Blacklisted students cannot be re-admitted across any branch unless their ban is formally revoked here. Click any row to view diagnostic logs (`Rule 19`).
        </p>
      </div>

      {/* Search Input (`Rule 15: Debounced search`) */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="admin-input pl-9"
            placeholder="Search name, phone, or seat…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* AG Grid Table or Empty State (`Rule 50`) */}
      {list.length === 0 ? (
        <AdminBlacklistEmptyState onResetSearch={handleResetSearch} isSearching={Boolean(searchInput.trim())} />
      ) : (
        <div className="admin-table-wrapper flex-1 min-h-[450px]">
          <AgGridReact
            theme={gridTheme}
            rowData={list}
            columnDefs={colDefs as never}
            rowHeight={56}
            headerHeight={40}
            suppressMovableColumns
            suppressCellFocus
            defaultColDef={{ resizable: false, sortable: true }}
            onRowClicked={handleRowClick}
            rowClass="cursor-pointer hover:bg-muted/30 transition-colors"
          />
        </div>
      )}

      {/* Add Dialog Modal (`Rule 16, 48`) */}
      <AdminBlacklistAddDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddStudent}
      />

      {/* Detail Drawer Modal (`Rule 19`) */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-50">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">#{selectedStudent.id}</span>
                <h3 className="font-semibold text-lg text-foreground">{selectedStudent.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                aria-label="Close details"
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone (Masked) (`Rule 45`)</span>
                <p className="font-mono text-sm text-foreground mt-0.5">{maskSensitiveData(selectedStudent.phone)}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Previous Seat</span>
                <p className="font-mono font-medium text-foreground mt-0.5">{selectedStudent.previousSeat}</p>
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
                <div className="bg-danger/10 border border-danger/30 p-3 rounded-md mt-1.5 flex items-start gap-2.5">
                  <AlertTriangle size={16} className="text-danger shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground font-medium break-words m-0">
                    {selectedStudent.reason}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to revoke the ban for "${selectedStudent.name}"?`)) {
                    handleRemoveStudent(selectedStudent.id);
                    setSelectedStudent(null);
                  }
                }}
                className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-success/10 text-success hover:bg-success/20 transition-colors flex items-center gap-1.5"
              >
                <UserCheck size={14} /> Revoke Ban & Restore
              </button>
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-sm font-medium rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
