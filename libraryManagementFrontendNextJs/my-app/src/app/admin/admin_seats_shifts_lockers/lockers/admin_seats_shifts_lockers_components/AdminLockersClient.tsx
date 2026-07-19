'use client';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

// RESPONSIBILITY: Renders the AdminLockersClient component.
import { useState } from 'react';
import { Plus, UserPlus, Unlock, Wrench, Search, X } from 'lucide-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAdminLockers, Locker } from '@/app/admin/admin_seats_shifts_lockers/lockers/admin_seats_shifts_lockers_hooks/useAdminLockers';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

export function AdminLockersClient() {

  const {
    statusFilter,
    setStatusFilter,
    showAssign,
    setShowAssign,
    assignSearch,
    setAssignSearch,
    freeTarget,
    setFreeTarget,
    showAddModal,
    setShowAddModal,
    newLockerId,
    setNewLockerId,
    addError,
    setAddError,
    filtered,
    handleAssign,
    handleFreeLocker,
    handleMarkMaintenance,
    handleAddLocker
  } = useAdminLockers();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Free': return 'bg-success/10 text-success border-none';
      case 'Occupied': return 'bg-danger/10 text-danger border-none';
      case 'Maintenance': return 'bg-warning/10 text-warning border-none';
      default: return 'bg-muted text-muted-foreground border-none';
    }
  };
    const table = useClientTable(filtered, 10);
  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 â€º Admin â€º Seats & Shifts</nav>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">Lockers</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage locker assignments and availability.</p>
        </div>
        <Button 
          onClick={() => { setNewLockerId(''); setAddError(''); setShowAddModal(true); }} 
          variant="default" 
          className="gap-2"
        >
          <Plus size={16} /> Add Locker
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <AdminSearchableDropdown 
          className="h-10 px-3 rounded-md border border-border bg-input text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-w-36"
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All Statuses">All Statuses</option>
          <option value="Free">Free</option>
          <option value="Occupied">Occupied</option>
          <option value="Maintenance">Maintenance</option>
        </AdminSearchableDropdown>
      </div>

      {/* Table */}
      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col min-h-96">
        <div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap min-w-max">
            <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3  w-2/12 ">Locker #</th>
                <th className="px-5 py-3  w-2/12 ">Status</th>
                <th className="px-5 py-3  w-4/12 ">Assigned To</th>
                <th className="px-5 py-3  w-1/5 ">Since</th>
                <th className="px-5 py-3  w-2/12  text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {table.paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">ðŸ”’</div>
                      <p className="text-lg font-bold">No lockers added yet.</p>
                      <Button 
                        onClick={() => { setNewLockerId(''); setAddError(''); setShowAddModal(true); }} 
                        variant="default" 
                        className="mt-2 gap-2"
                      >
                        <Plus size={15} /> Add Locker
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                table.paginatedData.map((l, i) => (
                  <tr key={i} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4 text-base font-black text-primary tracking-tight">{l.lockerId}</td>
                    <td className="px-5 py-4">
                      <Badge variant="secondary" className={`${getStatusBadge(l.status)} uppercase tracking-wider font-bold text-xs`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70" />
                        {l.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      {l.assignedTo === '—' ? (
                        <span className="text-muted-foreground text-sm font-medium italic">Unassigned</span>
                      ) : (
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-primary">{l.assignedTo}</span>
                          <span className="text-xs text-muted-foreground font-mono">{l.studentId}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{l.assignedSince}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {l.status === 'Free' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10" title="Assign Student" onClick={() => setShowAssign(l)}>
                            <UserPlus size={14} />
                          </Button>
                        )}
                        {l.status === 'Occupied' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-warning hover:text-warning hover:bg-warning/10" title="Free Locker" onClick={() => setFreeTarget(l)}>
                            <Unlock size={14} />
                          </Button>
                        )}
                        {l.status !== 'Maintenance' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-muted" title="Mark Maintenance" onClick={() => handleMarkMaintenance(l)}>
                            <Wrench size={14} />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
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
            totalItems={filtered.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </Card>

      {/* Add Locker Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
          <Card className="w-full max-w-sm shadow-lg border-border bg-card p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 text-primary">
                <Plus size={20} /> Add Locker
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setShowAddModal(false)}>
                <X size={16} />
              </Button>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Locker ID <span className="text-danger">*</span></label>
              <Input
                className={addError ? 'border-danger' : ''}
                placeholder="e.g. D01"
                value={newLockerId}
                onChange={e => { setNewLockerId(e.target.value); setAddError(''); }}
                autoFocus
              />
              {addError && <p className="text-xs text-danger font-medium mt-1">{addError}</p>}
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button variant="default" onClick={handleAddLocker} className="gap-2"><Plus size={14} /> Add</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Assign Modal */}
      {showAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowAssign(null)}>
          <Card className="w-full max-w-md shadow-lg border-border bg-card p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 text-primary">
                <UserPlus size={20} className="text-success" /> Assign Locker {showAssign.lockerId}
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setShowAssign(null)}>
                <X size={16} />
              </Button>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Student <span className="text-danger">*</span></label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  className="pl-9" 
                  placeholder="Search by name or Smart ID..." 
                  value={assignSearch} 
                  onChange={e => setAssignSearch(e.target.value)} 
                  autoFocus
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button variant="ghost" onClick={() => setShowAssign(null)}>Cancel</Button>
              <Button variant="default" onClick={handleAssign} disabled={!assignSearch.trim()} className="gap-2 bg-success hover:bg-success/90">
                <UserPlus size={14} /> Assign
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Free Locker Confirm Modal */}
      {freeTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setFreeTarget(null)}>
          <Card className="w-full max-w-sm shadow-lg border-warning/20 bg-card p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold flex items-center gap-2 text-warning">
              <Unlock size={20} /> Free Locker {freeTarget.lockerId}
            </h2>
            <p className="text-sm text-primary leading-relaxed bg-warning/5 p-4 rounded-md border border-warning/20">
              Free Locker <strong>{freeTarget.lockerId}</strong> from <strong>{freeTarget.assignedTo}</strong>? Locker becomes available immediately.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setFreeTarget(null)}>Cancel</Button>
              <Button variant="destructive" className="bg-warning hover:bg-warning/90 text-white" onClick={handleFreeLocker}>Free Locker</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

