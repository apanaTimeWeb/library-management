'use client';
// RESPONSIBILITY: Renders the AdminSystemSmartIdClient component.
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/admin/admin_system/admin_system_components/AdminSystemCard/AdminSystemCard';
import { Button } from '@/app/admin/admin_system/admin_system_components/AdminSystemButton/AdminSystemButton';
import { Badge } from '@/app/admin/admin_system/admin_system_components/AdminSystemBadge/AdminSystemBadge';
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogClose
} from '@/app/admin/admin_system/admin_system_components/AdminSystemDialog/AdminSystemDialog';
import { Hash, ChevronRight, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAdminSystemSmartId } from '@/app/admin/admin_system/admin_system_smart_id_hooks/useAdminSystemSmartId';

export function AdminSystemSmartIdClient() {
  const { regenerated, handleRegenerate, activeIds, flowSteps, allIds, gapIds } = useAdminSystemSmartId();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-medium tracking-wide mb-1">
          <span>System</span>
          <ChevronRight size={12} />
          <span>Smart ID</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
          <Hash size={28} className="text-primary" />
          Smart ID Auto-Fill
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          <span className="text-text-secondary text-sm mt-1">{activeIds.length} of 20 used</span> keeps student records compact and serial.
        </p>
      </div>

      {/* Algorithm Explanation */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>How Smart ID Gap-Fill Works</CardTitle>
          <CardDescription>When a student exits, their ID is reclaimed for the next admission — keeping IDs compact.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {flowSteps.map((step, i) => (
              <div key={step.step} className="flex items-center gap-4 flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-text-primaryxl">
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">Step {step.step}</p>
                    <p className="text-sm font-medium text-text-primary mt-0.5">{step.title}</p>
                    <p className="text-xs text-text-secondary mt-1 max-w-40">{step.desc}</p>
                  </div>
                </div>
                {i < flowSteps.length - 1 && (
                  <ArrowRight size={20} className="text-primary/40 shrink-0 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ID Sequence Viewer */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔢 Current ID Sequence
            {regenerated && <Badge variant="success">✅ Regenerated</Badge>}
          </CardTitle>
          <CardDescription>
            Active IDs shown in <span className="text-primary font-medium">indigo</span>. 
            Gap IDs available for reassignment shown in <span className="text-tertiary font-medium">amber</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {allIds.map(id => {
              const isActive = activeIds.includes(id);
              const isGap = !isActive;
              return (
                <span
                  key={id}
                  className={`inline-flex items-center justify-center h-9 w-9 rounded-lg text-sm font-bold border transition-all ${
                    isGap
                      ? 'bg-tertiary/15 text-tertiary border-tertiary/30'
                      : 'bg-primary/15 text-primary border-primary/20'
                  }`}
                  title={isGap ? `Gap ID #${id}` : `Active ID #${id}`}
                >
                  {id}
                </span>
              );
            })}
          </div>
          <div className="flex items-center gap-6 text-xs text-text-secondary">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-primary/40 border border-primary/30" />
              Active ({activeIds.length})
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-tertiary/40 border border-tertiary/30" />
              Gap — Available for reassignment ({gapIds.length})
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Override */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-tertiary" />
            Manual Override
          </CardTitle>
          <CardDescription>Admin-only action. Force regenerate the entire ID sequence. Use with caution.</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button id="force-regenerate-btn" variant="destructive">🔢 Force Regenerate Sequence</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Force Regenerate</DialogTitle>
                <DialogDescription>
                  This will compact all IDs and reassign gap numbers. This action cannot be undone easily.
                  Are you sure?
                </DialogDescription>
              </DialogHeader>
              <div className="p-4 rounded-xl bg-danger-bg/20 border border-danger/20 text-sm text-danger mt-2">
                ⚠️ Warning: All student ID references will be updated. Ensure backups are taken first.
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <DialogClose asChild>
                  <Button variant="ghost" size="sm">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button id="confirm-regenerate-btn" variant="destructive" size="sm" onClick={handleRegenerate}>
                    Yes, Regenerate
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
