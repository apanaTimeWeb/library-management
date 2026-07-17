'use client';
// RESPONSIBILITY: Renders the Lockers Data Table using Tailwind CSS. Replaces Ag-Grid to comply with design system.

import { SuperadminCard, CardContent } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';
import { SuperadminInput } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminInput';
import { SuperadminSelect, SuperadminSelectTrigger, SuperadminSelectValue, SuperadminSelectContent, SuperadminSelectItem } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminSelect';
import { Plus, ChevronRight, Inbox, Search, UserPlus, Unlock, Wrench } from 'lucide-react';
import { useSuperadminSeatsLockers } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_lockers_hooks/useSuperadminSeatsLockers';

export function SuperadminSeatsLockersClient() {
  const {
    filteredLockers,
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
    handleAssign,
    handleFreeLocker,
    handleMarkMaintenance,
    handleAddLocker,
    openAddModal
  } = useSuperadminSeatsLockers();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Free': return 'success';
      case 'Occupied': return 'danger';
      case 'Maintenance': return 'warning';
      default: return 'outline';
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium tracking-wide mb-1">
            <span>Seats</span><ChevronRight size={12} /><span>Lockers</span>
          </div>
          <h1 className="text-3xl font-bold text-on-surface">Lockers</h1>
          <p className="text-on-surface-variant mt-1 text-sm">Manage locker assignments and availability</p>
        </div>
        <SuperadminButton id="add-locker-btn" onClick={openAddModal} variant="primary">
          <Plus size={16} className="mr-2" /> Add Locker
        </SuperadminButton>
      </div>

      <SuperadminCard className="mb-6 bg-surface-container-high border-none">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-48">
            <SuperadminSelect value={statusFilter} onValueChange={setStatusFilter}>
              <SuperadminSelectTrigger id="filter-status"><SuperadminSelectValue placeholder="All Statuses" /></SuperadminSelectTrigger>
              <SuperadminSelectContent>
                <SuperadminSelectItem value="All Statuses">All Statuses</SuperadminSelectItem>
                <SuperadminSelectItem value="Free">Free</SuperadminSelectItem>
                <SuperadminSelectItem value="Occupied">Occupied</SuperadminSelectItem>
                <SuperadminSelectItem value="Maintenance">Maintenance</SuperadminSelectItem>
              </SuperadminSelectContent>
            </SuperadminSelect>
          </div>
        </CardContent>
      </SuperadminCard>

      <SuperadminCard>
        <CardContent className="p-0">
          {filteredLockers.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 bg-surface-container-highest rounded-full flex items-center justify-center text-on-surface-variant mb-3">
                <Inbox size={32} />
              </div>
              <p className="text-on-surface font-semibold text-lg">No lockers found</p>
              <p className="text-on-surface-variant text-sm mt-1 mb-4">Adjust your filters or add a new locker.</p>
              <SuperadminButton id="empty-add-locker" onClick={openAddModal} variant="primary">
                <Plus size={16} className="mr-2" /> Add Locker
              </SuperadminButton>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface text-on-surface-variant text-xs uppercase tracking-wider font-semibold">
                    <th className="py-4 pl-4 pr-3">Locker #</th>
                    <th className="py-4 px-3">Status</th>
                    <th className="py-4 px-3">Assigned To</th>
                    <th className="py-4 px-3">Since</th>
                    <th className="py-4 px-3 text-right pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 bg-surface">
                  {filteredLockers.map((locker) => (
                    <tr
                      key={locker.id}
                      className="hover:bg-surface-container-highest transition-colors group"
                    >
                      <td className="py-3 pl-4 pr-3 font-mono font-medium text-on-surface">{locker.lockerId}</td>
                      <td className="py-3 px-3">
                        <SuperadminBadge variant={getStatusVariant(locker.status)}>
                          {locker.status}
                        </SuperadminBadge>
                      </td>
                      <td className="py-3 px-3">
                        {locker.assignedTo === '—' ? (
                          <span className="text-on-surface-variant">Unassigned</span>
                        ) : (
                          <div>
                            <p className="font-semibold text-on-surface">{locker.assignedTo}</p>
                            <p className="text-xs text-on-surface-variant">{locker.studentId}</p>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant">{locker.assignedSince}</td>
                      <td className="py-3 px-3 text-right pr-4">
                        <div className="flex items-center justify-end gap-2">
                          {locker.status === 'Free' && (
                            <button title="Assign Student" onClick={() => setShowAssign(locker)} className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                              <UserPlus size={16} />
                            </button>
                          )}
                          {locker.status === 'Occupied' && (
                            <button title="Free Locker" onClick={() => setFreeTarget(locker)} className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors">
                              <Unlock size={16} />
                            </button>
                          )}
                          {locker.status !== 'Maintenance' && (
                            <button title="Mark Maintenance" onClick={() => handleMarkMaintenance(locker)} className="p-1.5 text-on-surface-variant hover:text-warning hover:bg-warning/10 rounded-lg transition-colors">
                              <Wrench size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </SuperadminCard>

      {/* Add Locker Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-surface rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-on-surface mb-4">Add Locker</h2>
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-on-surface">Locker ID <span className="text-error">*</span></label>
              <SuperadminInput 
                id="new-locker-id"
                placeholder="e.g. D01" 
                value={newLockerId} 
                onChange={e => { setNewLockerId(e.target.value); setAddError(''); }}
                className={addError ? 'border-error focus:border-error focus:ring-error/20' : ''}
              />
              {addError && <p className="text-xs text-error mt-1">{addError}</p>}
            </div>
            <div className="flex items-center justify-end gap-3">
              <SuperadminButton id="add-locker-cancel" onClick={() => setShowAddModal(false)} variant="ghost">Cancel</SuperadminButton>
              <SuperadminButton id="add-locker-confirm" onClick={handleAddLocker} variant="primary">
                <Plus size={16} className="mr-2" /> Add
              </SuperadminButton>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAssign(null)}>
          <div className="bg-surface rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-on-surface mb-4">Assign Locker {showAssign.lockerId}</h2>
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-on-surface">Student <span className="text-error">*</span></label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <SuperadminInput 
                  id="assign-locker-search"
                  placeholder="Search by name or Smart ID..." 
                  value={assignSearch} 
                  onChange={e => setAssignSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <SuperadminButton id="assign-locker-cancel" onClick={() => setShowAssign(null)} variant="ghost">Cancel</SuperadminButton>
              <SuperadminButton id="assign-locker-confirm" onClick={handleAssign} variant="primary" disabled={!assignSearch.trim()}>
                <UserPlus size={16} className="mr-2" /> Assign
              </SuperadminButton>
            </div>
          </div>
        </div>
      )}

      {/* Free Locker Confirm */}
      {freeTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setFreeTarget(null)}>
          <div className="bg-surface rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-on-surface mb-4">Free Locker {freeTarget.lockerId}</h2>
            <p className="text-sm text-on-surface-variant mb-6">
              Free Locker <strong className="text-on-surface">{freeTarget.lockerId}</strong> from <strong className="text-on-surface">{freeTarget.assignedTo}</strong>? Locker becomes available immediately.
            </p>
            <div className="flex items-center justify-end gap-3">
              <SuperadminButton id="free-locker-cancel" onClick={() => setFreeTarget(null)} variant="ghost">Cancel</SuperadminButton>
              <SuperadminButton id="free-locker-confirm" onClick={handleFreeLocker} variant="danger">Free Locker</SuperadminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
