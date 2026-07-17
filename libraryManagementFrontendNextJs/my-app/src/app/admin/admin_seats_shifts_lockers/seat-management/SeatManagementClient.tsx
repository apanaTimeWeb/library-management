'use client';

import { Plus, Search, Wrench, Edit, AlertTriangle, CheckCircle, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useSeatManagement, type Seat, type SeatStatus } from './useSeatManagement';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SeatManagementClientProps {
  initialSeats: Seat[];
}

export function SeatManagementClient({ initialSeats }: SeatManagementClientProps) {
  const {
    filtered,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    showModal,
    setShowModal,
    editSeat,
    form,
    setForm,
    errors,
    confirmBroken,
    setConfirmBroken,
    openAdd,
    openEdit,
    handleSave,
    handleMarkFixed,
    confirmMarkBroken
  } = useSeatManagement(initialSeats);

  const getStatusBadge = (status: SeatStatus) => {
    switch (status) {
      case 'Working': return 'bg-success/10 text-success';
      case 'Maintenance': return 'bg-warning/10 text-warning';
      case 'Broken': return 'bg-danger/10 text-danger';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      <Toaster position="bottom-right" />
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Seats</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all library seats</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={openAdd} variant="default" className="gap-2">
            <Plus size={16} /> Add Seat
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            className="pl-9 h-10"
            placeholder="Search by seat #, branch or student..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <select 
          className="flex h-10 w-full max-w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          value={statusFilter} 
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option>All Statuses</option>
          <option>Working</option>
          <option>Maintenance</option>
          <option>Broken</option>
        </select>
      </div>

      {/* Main Content */}
      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 gap-3 border-dashed bg-muted/5 shadow-none">
          <div className="text-4xl mb-2 opacity-50">🪑</div>
          <p className="text-lg font-bold">No seats found.</p>
          <p className="text-sm text-muted-foreground">Add your first seat to get started.</p>
          <Button onClick={openAdd} variant="default" className="mt-4 gap-2">
            <Plus size={15} /> Add Seat
          </Button>
        </Card>
      ) : (
        <Card className="flex-1 shadow-none border-border bg-bg-card overflow-hidden flex flex-col">
          <div className="w-full overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 border-y text-muted-foreground text-xs font-medium uppercase tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3">Seat #</th>
                  <th className="px-4 py-3">Branch</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Assigned To</th>
                  <th className="px-4 py-3">Last Maintenance</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((seat) => (
                  <tr key={seat.id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-4 py-3 font-bold text-sm text-text-primary">
                      {seat.seatNo}
                    </td>
                    <td className="px-4 py-3 font-medium text-primary text-sm">
                      {seat.branch}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary" className={`${getStatusBadge(seat.status)} border-none uppercase tracking-wide font-bold flex items-center gap-1.5 w-fit`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${seat.status === 'Working' ? 'bg-success' : seat.status === 'Maintenance' ? 'bg-warning' : 'bg-danger'}`} />
                        {seat.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-medium">
                      {seat.assignedTo}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-medium">
                      {seat.lastMaintenance}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10" 
                          title="View Maintenance Log" 
                          onClick={() => toast.success(`Opening log for ${seat.seatNo}`)}
                        >
                          <Wrench size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10" 
                          title="Edit" 
                          onClick={() => openEdit(seat)}
                        >
                          <Edit size={14} />
                        </Button>
                        {seat.status !== 'Broken' ? (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-warning hover:bg-warning/10" 
                            title="Mark Broken" 
                            onClick={() => setConfirmBroken(seat)}
                          >
                            <AlertTriangle size={14} />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-success hover:bg-success/10" 
                            title="Mark Fixed" 
                            onClick={() => handleMarkFixed(seat)}
                          >
                            <CheckCircle size={14} />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <Card className="w-full max-w-sm shadow-lg border-border bg-bg-card p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                {editSeat ? <><Edit size={18}/> Edit Seat</> : <><Plus size={18}/> Add Seat</>}
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setShowModal(false)}>
                <X size={16} />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Seat Number <span className="text-danger">*</span></label>
                <Input 
                  className={errors.seatNo ? 'border-danger' : ''} 
                  placeholder="e.g. A-01" 
                  value={form.seatNo} 
                  onChange={e => setForm(p => ({ ...p, seatNo: e.target.value }))} 
                />
                {errors.seatNo && <p className="text-xs text-danger font-medium">{errors.seatNo}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Branch <span className="text-danger">*</span></label>
                <Input 
                  className={errors.branch ? 'border-danger' : ''} 
                  placeholder="e.g. North Wing" 
                  value={form.branch} 
                  onChange={e => setForm(p => ({ ...p, branch: e.target.value }))} 
                />
                {errors.branch && <p className="text-xs text-danger font-medium">{errors.branch}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={form.status} 
                  onChange={e => setForm(p => ({ ...p, status: e.target.value as SeatStatus }))}
                >
                  <option>Working</option>
                  <option>Maintenance</option>
                  <option>Broken</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="default" onClick={handleSave}>Save</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Mark Broken Confirm */}
      {confirmBroken && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setConfirmBroken(null)}>
          <Card className="w-full max-w-sm shadow-lg border-warning/20 bg-bg-card p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold flex items-center gap-2 text-warning">
              <AlertTriangle size={20} /> Mark Seat as Broken
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mark Seat <strong className="text-text-primary">{confirmBroken.seatNo}</strong> as broken? It will be unavailable for assignment.
            </p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t mt-2">
              <Button variant="ghost" onClick={() => setConfirmBroken(null)}>Cancel</Button>
              <Button variant="destructive" className="bg-warning hover:bg-warning/90 text-white" onClick={confirmMarkBroken}>Confirm</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
