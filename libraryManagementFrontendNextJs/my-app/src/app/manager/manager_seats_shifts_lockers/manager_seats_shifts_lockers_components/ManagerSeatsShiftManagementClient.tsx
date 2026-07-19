'use client';
// RESPONSIBILITY: Renders the ManagerSeatsShiftManagementClient.tsx component UI.
import { useState } from 'react';
import { Allocation, ActivityItem, Locker, SeatHistoryEntry, LogEntry, Seat, ManagerSeatsSeatMatrixModalProps, ShiftData, Shift, Student } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_types/ManagerSeatsTypes';
import { ACTIVITY_DATA, INITIAL_LOCKERS, INITIAL_SEATS, SHIFTS_DATA, INITIAL_SHIFTS, STUDENTS_DATA } from '@/app/manager/manager_seats_shifts_lockers/manager_seats_shifts_lockers_constants/ManagerSeatsConstants';
import toast from 'react-hot-toast';
import { Plus, Edit, PowerOff, Zap, ChevronDown } from 'lucide-react';
import { ManagerSearchableDropdown } from '@/app/manager/manager_shared_components/ManagerSearchableDropdown';

const EMPTY_FORM = { name: '', startTime: '', endTime: '', active: true };

export function ManagerSeatsShiftManagementClient() {
  const [shifts, setShifts]             = useState<Shift[]>(INITIAL_SHIFTS);
  const [showModal, setShowModal]       = useState(false);
  const [editShift, setEditShift]       = useState<Shift | null>(null);
  const [form, setForm]                 = useState(EMPTY_FORM);
  const [errors, setErrors]             = useState<Record<string, string>>({});
  const [deactivateTarget, setDeactivateTarget] = useState<Shift | null>(null);

  function openAdd() {
    setEditShift(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setShowModal(true);
  }

  function openEdit(shift: Shift) {
    setEditShift(shift);
    setForm({ name: shift.name, startTime: shift.startTime || '', endTime: shift.endTime || '', active: shift.active ?? true });
    setErrors({});
    setShowModal(true);
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim())      e.name      = 'Shift name is required';
    if (!form.startTime)        e.startTime = 'Start time is required';
    if (!form.endTime)          e.endTime   = 'End time is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    if (editShift) {
      setShifts(prev => prev.map((s: Shift) => s.id === editShift.id ? { ...s, ...form } : s));
      toast.success('Shift updated.');
    } else {
      setShifts(prev => [...prev, { id: Date.now().toString(), ...form, occupancy: 0, capacity: 40 }]);
      toast.success('Shift added.');
    }
    setShowModal(false);
  }

  function handleDeactivate() {
    if (!deactivateTarget) return;
    setShifts(prev => prev.map((s: Shift) => s.id === deactivateTarget.id ? { ...s, active: false } : s));
    toast.success(`${deactivateTarget.name} shift deactivated.`);
    setDeactivateTarget(null);
  }

  function handleActivate(shift: Shift) {
    setShifts(prev => prev.map((s: Shift) => s.id === shift.id ? { ...s, active: true } : s));
    toast.success(`${shift.name} shift activated.`);
  }

  return (
    <>
      <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Shifts</h1>
            <p className="text-text-secondary mt-1 text-sm">Define active hours and availability windows</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={openAdd}>
            <Plus size={16} />Add Shift
          </button>
        </div>

        {shifts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 bg-card rounded-xl border border-dashed border-border text-center space-y-4 max-w-2xl mx-auto mt-12">
            <p className="text-5xl mb-2">🕐</p>
            <p className="text-lg font-semibold text-text-primary">No shifts defined.</p>
            <p className="text-text-secondary text-sm">Use Setup Wizard or add manually.</p>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={openAdd}><Plus size={15} />Add Shift</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shifts.map(shift => (
              <div key={shift.id} className={`bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-primary/50 transition-colors${!shift.active ? ' opacity-75 grayscale-[30%]' : ''}`}>
                <div className="p-5 flex flex-col h-full space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-text-primary">{shift.name}</h3>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1.5 whitespace-nowrap w-fit ${shift.active ? 'bg-success/15 text-success border border-success/20' : 'bg-border/50 text-text-secondary border border-border'}`}>
                      {shift.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <div className="py-2">
                    <p className={`text-2xl font-bold text-text-primary font-mono tracking-tight${!shift.active ? ' opacity-75 text-text-secondary' : ''}`}>
                      {shift.startTime} → {shift.endTime}
                    </p>
                  </div>

                  <div className="bg-bg-elevated p-4 rounded-lg space-y-3 mt-auto">
                    <div>
                      <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">Occupancy</p>
                      <p className="text-sm font-semibold text-text-primary mt-1">
                        {shift.occupancy} students
                        <span className="text-text-secondary font-normal"> / {shift.capacity}</span>
                      </p>
                    </div>
                    <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out w-full" style={{ width: `${Math.round(((shift.occupancy || 0) / (shift.capacity || 1)) * 100)}%` }} />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border mt-auto">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm" onClick={() => openEdit(shift)}>
                      <Edit size={14} />Edit
                    </button>
                    {shift.active ? (
                      <button className="flex items-center justify-center gap-2 px-4 py-2 text-danger hover:bg-danger/10 rounded-lg transition-colors font-medium text-sm" onClick={() => setDeactivateTarget(shift)}>
                        <PowerOff size={14} />Deactivate
                      </button>
                    ) : (
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={() => handleActivate(shift)}>
                        <Zap size={14} />Activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-card w-full max-w-md md:max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-text-primary p-6 pb-0">{editShift ? '✏️ Edit Shift' : '➕ Add Shift'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 overflow-y-auto">
              <div className="flex flex-col gap-1.5 col-span-full">
                <label className="text-sm font-medium text-text-secondary flex justify-between">Shift Name <span className="text-danger">*</span></label>
                <input className={`w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3${errors.name ? ' border-danger focus:ring-danger/50 bg-danger/5' : ''}`} placeholder="Morning / Evening / Custom-1" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                {errors.name && <p className="text-xs text-danger mt-1 font-medium">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary flex justify-between">Start Time <span className="text-danger">*</span></label>
                <input type="time" className={`w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3${errors.startTime ? ' border-danger focus:ring-danger/50 bg-danger/5' : ''}`} value={form.startTime} onChange={e => setForm(p => ({ ...p, startTime: e.target.value }))} />
                {errors.startTime && <p className="text-xs text-danger mt-1 font-medium">{errors.startTime}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-text-secondary flex justify-between">End Time <span className="text-danger">*</span></label>
                <input type="time" className={`w-full px-3 py-2 bg-input border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed pl-3${errors.endTime ? ' border-danger focus:ring-danger/50 bg-danger/5' : ''}`} value={form.endTime} onChange={e => setForm(p => ({ ...p, endTime: e.target.value }))} />
                {errors.endTime && <p className="text-xs text-danger mt-1 font-medium">{errors.endTime}</p>}
              </div>
              <div className="flex flex-col gap-1.5 col-span-full">
                <label className="text-sm font-medium text-text-secondary flex justify-between">Active</label>
                <div className="relative w-full">
                  <ManagerSearchableDropdown
                    value={form.active ? 'yes' : 'no'}
                    onChange={v => setForm(p => ({ ...p, active: v === 'yes' }))}
                    options={[
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' }
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30">
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {deactivateTarget && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeactivateTarget(null)}>
          <div className="bg-card w-full max-w-md md:max-w-lg rounded-xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-text-primary p-6 pb-0">⚠️ Deactivate Shift</h2>
            <p className="text-text-secondary p-6 pt-2 pb-0 text-sm leading-relaxed">
              Deactivate <strong>{deactivateTarget.name}</strong>? Existing students are unaffected but new admissions cannot be assigned to this shift.
            </p>
            <div className="flex justify-end gap-3 p-6 border-t border-border bg-bg-elevated/30">
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors font-medium text-sm" onClick={() => setDeactivateTarget(null)}>Cancel</button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-danger hover:bg-danger/10 rounded-lg transition-colors font-medium text-sm" onClick={handleDeactivate}>Deactivate</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
