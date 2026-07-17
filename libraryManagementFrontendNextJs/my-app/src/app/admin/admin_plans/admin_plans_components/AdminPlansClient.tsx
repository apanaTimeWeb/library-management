'use client';

// RESPONSIBILITY: Client view component rendering membership plans grid, search, status toggles, and detail drawer (`Rule 1`, `Rule 8`, `Rule 19`, `Rule 49`, `Rule 57`).
// DATA FLOW: useAdminPlans -> AdminPlansClient -> Cards / Add Dialog / Detail Drawer (`Rule 39`).

import { useState } from 'react';
import { Search, Plus, Pencil, Trash2, CheckCircle, IndianRupee, Copy, Check, X, Users, Calendar } from 'lucide-react';
import { useAdminPlans } from '@/app/admin/admin_plans/admin_plans_hooks/useAdminPlans';
import { AdminPlansSkeleton } from '@/app/admin/admin_plans/admin_plans_components/AdminPlansSkeleton';
import { AdminPlansEmptyState } from '@/app/admin/admin_plans/admin_plans_components/AdminPlansEmptyState';
import { AdminPlansAddDialog } from '@/app/admin/admin_plans/admin_plans_components/AdminPlansAddDialog';
import { PlanRecord } from '@/app/admin/admin_plans/admin_plans_types/admin_plans_types';
import toast from 'react-hot-toast';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export function AdminPlansClient() {
  const {
    plans,
    totalCount,
    fetchState,
    searchInput,
    editingPlan,
    selectedPlanDetails,
    setSearchInput,
    setEditingPlan,
    setSelectedPlanDetails,
    handleSavePlan,
    handleToggleStatus,
    handleDeletePlan,
    handleResetSearch,
  } = useAdminPlans();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyId = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success('Plan ID copied to clipboard (`Rule 49`)');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openCreateDialog = () => {
    setEditingPlan(null);
    setIsFormOpen(true);
  };

  const openEditDialog = (e: React.MouseEvent, plan: PlanRecord) => {
    e.stopPropagation();
    setEditingPlan(plan);
    setIsFormOpen(true);
  };

  if (fetchState === 'loading' && plans.length === 0) {
    return <AdminPlansSkeleton />;
  }

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* Page Header */}
      <div className="border-b border-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Smart Library 360 <span className="opacity-50">›</span> Admin <span className="opacity-50">›</span> Plans
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Membership Plans</h1>
          <p className="text-sm text-muted-foreground mt-1">Create and manage subscription pricing plans across library branches.</p>
        </div>
        <Button
          type="button"
          onClick={openCreateDialog}
          className="gap-2"
        >
          <Plus size={16} /> Create Plan
        </Button>
      </div>

      {/* Search & Stats Bar (`Rule 15: Debounced search`) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search plan name or feature…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span>Total Plans: <strong className="text-foreground">{totalCount}</strong></span>
          <span>•</span>
          <span>Active: <strong className="text-success">{plans.filter((p) => p.status === 'Active').length}</strong></span>
        </div>
      </div>

      {/* Plans Cards Grid or Empty State (`Rule 1 / Rule 50 / Rule 57`) */}
      {plans.length === 0 ? (
        <AdminPlansEmptyState onResetSearch={handleResetSearch} isSearching={Boolean(searchInput.trim())} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              onClick={() => setSelectedPlanDetails(plan)}
              className="hover:shadow-md transition-all flex flex-col justify-between cursor-pointer relative group border-border"
              style={{ opacity: plan.status === 'Inactive' ? 0.72 : 1 }}
            >
              <CardContent className="p-6">
                {/* Card Top */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-foreground m-0">{plan.name}</h3>
                      <button
                        type="button"
                        onClick={(e) => handleCopyId(e, plan.id)}
                        className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-muted-foreground hover:text-foreground transition-opacity"
                        title="Copy Plan ID (`Rule 49`)"
                      >
                        {copiedId === plan.id ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {plan.duration} ({plan.durationDays} Days)
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <Badge
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(plan.id);
                      }}
                      className={`cursor-pointer transition-colors border-none ${
                        plan.status === 'Active' ? 'bg-success/10 text-success hover:bg-success/20' : 'bg-danger/10 text-danger hover:bg-danger/20'
                      }`}
                      title="Click to toggle active status"
                    >
                      {plan.status}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">{plan.duration}</Badge>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mt-4">
                  <IndianRupee size={20} className="text-primary self-center" />
                  <span className="text-3xl font-extrabold text-foreground tracking-tight leading-none">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">/ {plan.duration.toLowerCase()}</span>
                </div>

                {/* Subscribers badge */}
                <div className="mt-4">
                  <Badge variant="secondary" className="bg-info/10 text-info border-none flex items-center gap-1.5 w-fit text-xs font-semibold">
                    <Users size={12} /> {plan.subscribers} active subscribers
                  </Badge>
                </div>

                {/* Features (`Rule 57: No key={index}`) */}
                <div className="border-t border-border pt-4 mt-5">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Included Features
                  </p>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {plan.features.map((feat) => (
                      <li
                        key={`${plan.id}-${feat}`}
                        className="flex items-start gap-2 text-xs text-foreground leading-snug font-medium"
                      >
                        <CheckCircle size={14} className="text-success shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              {/* Footer Actions */}
              <CardFooter className="flex items-center justify-between p-4 bg-muted/20 border-t border-border">
                <span className="font-mono text-[10px] text-muted-foreground">ID: #{plan.id}</span>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => openEditDialog(e, plan)}
                    className="h-8 w-8 text-info hover:text-info hover:bg-info/10"
                    title="Edit Plan"
                  >
                    <Pencil size={15} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Are you sure you want to delete membership plan "${plan.name}"?`)) {
                        handleDeletePlan(plan.id);
                      }
                    }}
                    className="h-8 w-8 text-danger hover:text-danger hover:bg-danger/10"
                    title="Delete Plan"
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Create / Edit Modal (`Rule 16, 48`) */}
      <AdminPlansAddDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSavePlan}
        editingPlan={editingPlan}
      />

      {/* Detail Drawer / Modal (`Rule 19`) */}
      {selectedPlanDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-50">
          <Card className="max-w-lg w-full shadow-2xl border-border">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4 bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground block mb-0.5">#{selectedPlanDetails.id}</span>
                  <CardTitle className="text-lg">{selectedPlanDetails.name} Plan</CardTitle>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedPlanDetails(null)}
                aria-label="Close details"
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </Button>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Plan Price</span>
                  <p className="font-extrabold text-2xl text-primary flex items-center">
                    <IndianRupee size={20} /> {selectedPlanDetails.price}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Validity Period</span>
                  <p className="font-bold text-foreground flex items-center gap-1.5 text-base mt-1">
                    {selectedPlanDetails.duration} <span className="font-normal text-muted-foreground text-sm">({selectedPlanDetails.durationDays} Days)</span>
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Status</span>
                  <Badge variant="secondary" className={`border-none ${selectedPlanDetails.status === 'Active' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    {selectedPlanDetails.status}
                  </Badge>
                </div>
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Subscribers</span>
                  <p className="font-mono font-bold text-foreground text-base">
                    {selectedPlanDetails.subscribers} <span className="font-medium text-muted-foreground text-sm">enrolled</span>
                  </p>
                </div>
                <div className="col-span-2 border-t border-border pt-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">All Included Features</span>
                  <ul className="list-none p-4 space-y-2.5 bg-muted/30 rounded-lg border border-border">
                    {selectedPlanDetails.features.map((feat) => (
                      <li key={`${selectedPlanDetails.id}-modal-${feat}`} className="flex items-start gap-2.5 text-sm text-foreground font-medium">
                        <CheckCircle size={16} className="text-success shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between p-4 border-t border-border bg-muted/20">
              <Button
                variant="outline"
                onClick={(e) => {
                  openEditDialog(e, selectedPlanDetails);
                  setSelectedPlanDetails(null);
                }}
                className="gap-2 text-info border-info/20 hover:bg-info/10 hover:text-info"
              >
                <Pencil size={14} /> Edit Plan Details
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSelectedPlanDetails(null)}
              >
                Close
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
