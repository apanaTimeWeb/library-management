'use client';

import { CalendarDays, UserPlus, User, X } from 'lucide-react';
import { useSeatMatrix } from '@/app/admin/admin_seats_shifts_lockers/seat-matrix/admin_seats_shifts_lockers_hooks/useSeatMatrix';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SeatMatrixClient() {
  const {
    activeTab,
    setActiveTab,
    selectedSeat,
    setSelectedSeat,
    date,
    setDate,
    visible,
    freeSeatsCount,
    isLoading,
    ADMIN_SEATS_MOCK_SHIFT_TABS,
    ADMIN_SEATS_MOCK_LEGEND_ITEMS
  } = useSeatMatrix();

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'free': return 'bg-success/20 text-success hover:bg-success/30 border-success/30';
      case 'occupied': return 'bg-primary/20 text-primary hover:bg-primary/30 border-primary/30';
      case 'expiring': return 'bg-warning/20 text-warning hover:bg-warning/30 border-warning/30';
      case 'maintenance': return 'bg-danger/20 text-danger hover:bg-danger/30 border-danger/30';
      default: return 'bg-muted text-muted-foreground hover:bg-muted/80 border-border';
    }
  };

  const getLegendColor = (cls: string) => {
    if (cls.includes('success')) return 'bg-success';
    if (cls.includes('primary')) return 'bg-primary';
    if (cls.includes('warning')) return 'bg-warning';
    if (cls.includes('danger')) return 'bg-danger';
    return 'bg-muted-foreground';
  };

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Seats & Shifts</nav>
          <h1 className="text-2xl font-bold tracking-tight">Seat Matrix</h1>
          <p className="text-sm text-muted-foreground mt-1">Interactive floor plan and real-time availability.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex bg-muted p-1 rounded-lg w-fit overflow-x-auto max-w-full">
          {ADMIN_SEATS_MOCK_SHIFT_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-bold rounded-md whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-background text-primary shadow-sm' 
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="relative w-fit">
          <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="date"
            className="pl-9 h-10 w-44 font-medium"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Legend */}
      <Card className="flex flex-wrap items-center gap-4 sm:gap-6 p-4 shadow-sm border-border bg-card">
        {ADMIN_SEATS_MOCK_LEGEND_ITEMS.map(({ cls, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${getLegendColor(cls)}`} />
            <span className="text-sm font-medium text-primary">{label}</span>
          </div>
        ))}
      </Card>

      {/* Grid Container */}
      <Card className="flex-1 shadow-sm border-border bg-card flex flex-col min-h-96">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-bold tracking-tight text-primary">A-Wing Floor Plan</h2>
          <Badge variant="secondary" className="bg-success/10 text-success border-none uppercase tracking-wider font-bold">
            {freeSeatsCount} seats free
          </Badge>
        </div>
        
        <div className="p-5 overflow-auto flex-1 bg-muted/5 flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-72">
              <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-muted-foreground font-medium">Loading floor plan...</p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] gap-3 sm:gap-4 place-content-start w-full">
              {visible.map((seat, index) => (
                <button
                  key={seat.uuid || `${seat.id}-${index}`}
                  className={`
                    aspect-square rounded-md border-2 font-bold text-sm sm:text-base flex items-center justify-center transition-all cursor-pointer
                    ${getSeatColor(seat.status)}
                  `}
                  onClick={() => setSelectedSeat(seat)}
                  title={
                    seat.student
                      ? `${seat.student} · ${seat.shift} · Expires ${seat.expiry}`
                      : seat.status === 'maintenance' ? 'Under Maintenance' : 'Available'
                  }
                >
                  {seat.id}
                </button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Seat Details Modal */}
      {selectedSeat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedSeat(null)}>
          <Card className="w-full max-w-sm shadow-lg border-border bg-card p-0 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            {selectedSeat.status === 'free' ? (
              <div className="p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-success/10 text-success border-none uppercase tracking-wider font-bold">Free</Badge>
                    <span className="text-xl font-bold tracking-tight text-primary">Seat {selectedSeat.id}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setSelectedSeat(null)}>
                    <X size={16} />
                  </Button>
                </div>
                
                <p className="text-sm font-medium text-muted-foreground bg-success/5 p-4 rounded-md border border-success/10">
                  This seat is available for assignment.
                </p>
                
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button variant="ghost" onClick={() => setSelectedSeat(null)}>Close</Button>
                  <Button variant="default" className="gap-2">
                    <UserPlus size={16} /> Assign Student
                  </Button>
                </div>
              </div>
            ) : selectedSeat.status === 'maintenance' ? (
              <div className="p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-danger/10 text-danger border-none uppercase tracking-wider font-bold">Maintenance</Badge>
                    <span className="text-xl font-bold tracking-tight text-primary">Seat {selectedSeat.id}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setSelectedSeat(null)}>
                    <X size={16} />
                  </Button>
                </div>
                
                <p className="text-sm font-medium text-muted-foreground bg-danger/5 p-4 rounded-md border border-danger/10">
                  This seat is under maintenance and unavailable.
                </p>
                
                <div className="flex items-center justify-end pt-2">
                  <Button variant="ghost" onClick={() => setSelectedSeat(null)}>Close</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className={`p-6 pb-8 ${selectedSeat.status === 'expiring' ? 'bg-warning/10' : 'bg-primary/5'} border-b border-border relative`}>
                  <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/50 hover:bg-background/80" onClick={() => setSelectedSeat(null)}>
                    <X size={16} />
                  </Button>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <Badge variant="secondary" className={`${selectedSeat.status === 'expiring' ? 'bg-warning text-white' : 'bg-primary text-white'} border-none uppercase tracking-wider font-bold`}>
                      {selectedSeat.status === 'expiring' ? 'Expiring Soon' : 'Occupied'}
                    </Badge>
                    <span className="text-xl font-bold tracking-tight text-primary">Seat {selectedSeat.id}</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center text-center gap-2">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${selectedSeat.status === 'expiring' ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'}`}>
                      <User size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-primary">{selectedSeat.student}</h3>
                      <p className="text-sm font-mono text-muted-foreground">{selectedSeat.smartId}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-3 rounded-md border border-border flex flex-col gap-1">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Shift</span>
                      <span className="text-sm font-bold text-primary">{selectedSeat.shift || '—'}</span>
                    </div>
                    <div className={`p-3 rounded-md border flex flex-col gap-1 ${selectedSeat.status === 'expiring' ? 'bg-warning/10 border-warning/30' : 'bg-muted/30 border-border'}`}>
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Expires</span>
                      <span className={`text-sm font-bold ${selectedSeat.status === 'expiring' ? 'text-warning' : 'text-primary'}`}>
                        {selectedSeat.expiry || '—'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <Button variant="ghost" onClick={() => setSelectedSeat(null)}>Close</Button>
                    <Button variant="default">View Profile</Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
