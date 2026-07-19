'use client';
// RESPONSIBILITY: Renders the AdminLockerMatrixClient component.
import { LockKeyhole, Settings, Zap, X } from 'lucide-react';
import { useAdminLockerMatrix } from '@/app/admin/admin_seats_shifts_lockers/locker-matrix/admin_seats_shifts_lockers_hooks/useAdminLockerMatrix';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function AdminLockerMatrixClient() {
  const {
    assignTarget,
    setAssignTarget,
    lockerData,
    isLoading,
    handleCellClick,
    handleAssign,
    ADMIN_SEATS_MOCK_LOCKER_STATS,
    ADMIN_SEATS_MOCK_LOCKER_LEGEND,
    ADMIN_SEATS_MOCK_LOCKER_ACTIVITY
  } = useAdminLockerMatrix();

  const getLockerColor = (status: string) => {
    switch (status) {
      case 'free': return 'bg-success/20 text-success hover:bg-success/30 border-success/30';
      case 'occupied': return 'bg-danger/10 text-danger hover:bg-danger/20 border-danger/30';
      case 'maintenance': return 'bg-warning/20 text-warning hover:bg-warning/30 border-warning/30';
      default: return 'bg-muted text-muted-foreground hover:bg-muted/80 border-border';
    }
  };

  const getLegendColor = (cls: string) => {
    if (cls.includes('success')) return 'bg-success';
    if (cls.includes('danger')) return 'bg-danger';
    if (cls.includes('warning')) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 â€º Admin â€º Seats & Shifts</nav>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">Locker Matrix</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time status of lockers. Click any cell to manage access or view rental history.</p>
        </div>
        
        {/* Compact Legend */}
        <Card className="flex items-center gap-4 px-4 py-2 shadow-sm border-border bg-card h-fit">
          {ADMIN_SEATS_MOCK_LOCKER_LEGEND.map(({ cls, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${getLegendColor(cls)}`} />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ADMIN_SEATS_MOCK_LOCKER_STATS.map(({ label, value, border, valueClass }) => (
          <Card key={label} className={`p-4 shadow-sm border-border bg-card flex flex-col gap-1 border-l-4 ${border.replace('border-l-', 'border-l-')}`}>
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
            <span className={`text-text-primary text-xl font-black ${valueClass.includes('success') ? 'text-success' : valueClass.includes('danger') ? 'text-danger' : valueClass.includes('warning') ? 'text-warning' : 'text-primary'}`}>
              {value}
            </span>
          </Card>
        ))}
      </div>

      {/* Grid Container */}
      <Card className="flex-1 shadow-sm border-border bg-card flex flex-col min-h-96">
        <div className="p-5 overflow-auto flex-1 bg-muted/5 flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-72">
              <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-muted-foreground font-medium">Loading locker grid...</p>
            </div>
          ) : (
            <div className="grid  gap-2 sm:gap-3 place-content-start w-full grid-cols-[var(--cols)]" style={{ '--cols': "repeat(auto-fill, minmax(50px, 1fr))" } as React.CSSProperties}>
              {lockerData.map(({ uuid, id, status }, index) => (
                <button
                  key={uuid || `${id}-${index}`}
                  className={`
                    aspect-square rounded-md border-2 font-bold text-sm flex items-center justify-center transition-all cursor-pointer
                    ${getLockerColor(status)}
                  `}
                  onClick={() => handleCellClick(id, status)}
                  title={status === 'free' ? 'Available â€” click to assign' : status === 'occupied' ? 'Occupied â€” click to view student' : 'Under Maintenance'}
                >
                  {id}
                </button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Bottom Layout: Activity & Toolkit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Assignments */}
        <Card className="lg:col-span-2 shadow-sm border-border bg-card flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-base font-bold text-primary">Recent Assignments</h3>
            <Button variant="ghost" size="sm" className="h-8 text-xs font-bold text-primary">View All</Button>
          </div>
          <div className="flex flex-col p-2">
            {ADMIN_SEATS_MOCK_LOCKER_ACTIVITY.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 hover:bg-muted/30 rounded-md transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    {a.icon}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-primary">{a.text}</p>
                    <p className="text-xs text-muted-foreground font-medium">{a.sub}</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2 py-1 rounded">
                  {a.id}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Management Toolkit */}
        <Card className="shadow-sm border-primary/30 bg-primary/5 flex flex-col p-6 gap-6 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -right-6 -top-6 text-primary/10 rotate-12 pointer-events-none">
            <LockKeyhole size={120} />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-lg font-black text-primary tracking-tight mb-2">Management Toolkit</h3>
            <p className="text-sm font-medium text-primary/70 leading-relaxed">
              Bulk manage lockers, schedule maintenance windows, or update digital lock firmware.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 mt-auto relative z-10">
            <Button variant="default" className="w-full gap-2 justify-start font-bold">
              <LockKeyhole size={16} /> Bulk Reset
            </Button>
            <Button variant="outline" className="w-full gap-2 justify-start bg-card/50 border-primary/20 text-primary hover:bg-primary/10 font-bold">
              <Settings size={16} /> Grid Config
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-border mt-auto">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          Nocturnal Archive Management System â€” {new Date().getFullYear()}
        </p>
      </footer>

      {/* Assign Modal */}
      {assignTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setAssignTarget(null)}>
          <Card className="w-full max-w-sm shadow-lg border-border bg-card p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2 text-primary">
                <Zap size={20} className="text-primary" /> Assign Locker {assignTarget}
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setAssignTarget(null)}>
                <X size={16} />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground font-medium bg-muted/30 p-4 rounded-md border border-border">
              Locker <strong className="text-primary">{assignTarget}</strong> is available. Assign it to a student.
            </p>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-2">
              <Button variant="ghost" onClick={() => setAssignTarget(null)}>Cancel</Button>
              <Button variant="default" className="gap-2" onClick={handleAssign}>
                <Zap size={14} /> Assign Student
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

