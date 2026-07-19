'use client';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

// RESPONSIBILITY: Renders the AdminShiftManagementClient component.
import { Plus, Edit, PowerOff, Zap, AlertTriangle, X } from 'lucide-react';
import { useAdminShiftManagement } from '@/app/admin/admin_seats_shifts_lockers/shift-management/admin_seats_shifts_lockers_hooks/useAdminShiftManagement';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AdminShiftManagementClient() {
  const {
    shifts,
    showModal,
    setShowModal,
    editShift,
    form,
    setForm,
    errors,
    deactivateTarget,
    setDeactivateTarget,
    openAdd,
    openEdit,
    handleSave,
    handleDeactivate,
    handleActivate
  } = useAdminShiftManagement();

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 â€º Admin â€º Seats & Shifts</nav>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">Shifts</h1>
          <p className="text-sm text-muted-foreground mt-1">Define active hours and availability windows.</p>
        </div>
        <Button onClick={openAdd} variant="default" className="gap-2">
          <Plus size={16} /> Add Shift
        </Button>
      </div>

      {shifts.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 gap-3 border-dashed bg-muted/5 shadow-none">
          <div className="text-4xl mb-2 opacity-50">ðŸ•</div>
          <p className="text-lg font-bold">No shifts defined.</p>
          <p className="text-sm text-muted-foreground">Use Setup Wizard or add manually.</p>
          <Button onClick={openAdd} variant="default" className="mt-4 gap-2">
            <Plus size={15} /> Add Shift
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shifts.map((shift) => (
            <Card key={shift.id} className={`flex flex-col p-5 shadow-sm border-border bg-card transition-all ${!shift.active ? 'opacity-70 bg-muted/30' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-primary tracking-tight">{shift.name}</h3>
                <Badge variant="secondary" className={`${shift.active ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'} border-none uppercase tracking-wider font-bold text-xs`}>
                  {shift.active ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <div className="bg-muted/30 rounded-md p-3 flex justify-center items-center mb-6 border border-border">
                <p className={`font-mono font-bold tracking-tight ${!shift.active ? 'text-muted-foreground' : 'text-primary'}`}>
                  {shift.startTime} <span className="text-muted-foreground mx-1">â†’</span> {shift.endTime}
                </p>
              </div>

              <div className="mb-6 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-muted-foreground">Occupancy</span>
                  <span className="font-bold text-primary">
                    {shift.occupancy} <span className="text-muted-foreground font-medium">/ {shift.capacity}</span>
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${!shift.active ? 'bg-muted-foreground/30' : 'bg-primary'} w-[length:var(--w)]`} style={{ '--w': `${Math.round((shift.occupancy / shift.capacity) * 100)}%` } as React.CSSProperties} 
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-primary h-8 px-2"
                  onClick={() => openEdit(shift)}
                >
                  <Edit size={14} className="mr-1.5" /> Edit
                </Button>
                {shift.active ? (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-danger hover:text-danger hover:bg-danger/10 h-8 px-2"
                    onClick={() => setDeactivateTarget(shift)}
                  >
                    <PowerOff size={14} className="mr-1.5" /> Deactivate
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-success hover:text-success hover:bg-success/10 h-8 px-2"
                    onClick={() => handleActivate(shift)}
                  >
                    <Zap size={14} className="mr-1.5" /> Activate
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-pagelack/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <Card className="w-full max-w-sm shadow-lg border-border bg-card p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                {editShift ? <><Edit size={18}/> Edit Shift</> : <><Plus size={18}/> Add Shift</>}
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setShowModal(false)}>
                <X size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Shift Name <span className="text-danger">*</span></label>
                <Input 
                  className={errors.name ? 'border-danger' : ''} 
                  placeholder="Morning / Evening" 
                  value={form.name} 
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))} 
                />
                {errors.name && <p className="text-xs text-danger font-medium">{errors.name}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Start Time <span className="text-danger">*</span></label>
                  <Input 
                    type="time" 
                    className={errors.startTime ? 'border-danger' : ''} 
                    value={form.startTime} 
                    onChange={e => setForm(p => ({ ...p, startTime: e.target.value }))} 
                  />
                  {errors.startTime && <p className="text-xs text-danger font-medium">{errors.startTime}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">End Time <span className="text-danger">*</span></label>
                  <Input 
                    type="time" 
                    className={errors.endTime ? 'border-danger' : ''} 
                    value={form.endTime} 
                    onChange={e => setForm(p => ({ ...p, endTime: e.target.value }))} 
                  />
                  {errors.endTime && <p className="text-xs text-danger font-medium">{errors.endTime}</p>}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Active</label>
                <AdminSearchableDropdown 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2"
                  value={form.active ? 'yes' : 'no'} 
                  onChange={e => setForm(p => ({ ...p, active: e.target.value === 'yes' }))}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </AdminSearchableDropdown>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="default" onClick={handleSave}>Save</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Deactivate Confirm Modal */}
      {deactivateTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-pagelack/60 backdrop-blur-sm" onClick={() => setDeactivateTarget(null)}>
          <Card className="w-full max-w-sm shadow-lg border-warning/20 bg-card p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold flex items-center gap-2 text-warning">
              <AlertTriangle size={20} /> Deactivate Shift
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Deactivate <strong className="text-primary">{deactivateTarget.name}</strong>? Existing students are unaffected but new admissions cannot be assigned to this shift.
            </p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t mt-2">
              <Button variant="ghost" onClick={() => setDeactivateTarget(null)}>Cancel</Button>
              <Button variant="destructive" className="bg-warning hover:bg-warning/90 text-white" onClick={handleDeactivate}>Deactivate</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
