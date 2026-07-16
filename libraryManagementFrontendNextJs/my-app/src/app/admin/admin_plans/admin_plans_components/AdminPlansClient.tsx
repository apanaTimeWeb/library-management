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
      <div className="admin-page-header border-b border-border pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="admin-breadcrumb">Smart Library 360 › Admin › Plans</p>
          <h1 className="admin-page-title">Membership Plans</h1>
          <p className="admin-page-subtitle">Create and manage subscription pricing plans across library branches.</p>
        </div>
        <button
          type="button"
          onClick={openCreateDialog}
          className="admin-btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Create Plan
        </button>
      </div>

      {/* Search & Stats Bar (`Rule 15: Debounced search`) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="admin-input pl-9"
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
            <div
              key={plan.id}
              onClick={() => setSelectedPlanDetails(plan)}
              className="admin-plan-card p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer relative group"
              style={{ opacity: plan.status === 'Inactive' ? 0.72 : 1 }}
            >
              {/* Card Top */}
              <div>
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(plan.id);
                      }}
                      className={`admin-badge transition-colors ${
                        plan.status === 'Active' ? 'admin-badge-success hover:bg-success/20' : 'admin-badge-danger hover:bg-danger/20'
                      }`}
                      title="Click to toggle active status"
                    >
                      {plan.status}
                    </button>
                    <span className="admin-badge admin-badge-primary text-[10px]">{plan.duration}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mt-3">
                  <IndianRupee size={20} className="text-primary self-center" />
                  <span className="text-3xl font-extrabold text-foreground tracking-tight leading-none">
                    {plan.price}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">/ {plan.duration.toLowerCase()}</span>
                </div>

                {/* Subscribers badge */}
                <div className="mt-3">
                  <span className="admin-badge admin-badge-info flex items-center gap-1.5 w-fit text-xs">
                    <Users size={12} /> {plan.subscribers} active subscribers
                  </span>
                </div>

                {/* Features (`Rule 57: No key={index}`) */}
                <div className="border-t border-border pt-3 mt-4">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Included Features
                  </p>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {plan.features.map((feat) => (
                      <li
                        key={`${plan.id}-${feat}`}
                        className="flex items-start gap-2 text-xs text-foreground leading-snug"
                      >
                        <CheckCircle size={14} className="text-success shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 mt-5 border-t border-border">
                <span className="font-mono text-[10px] text-muted-foreground">ID: #{plan.id}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => openEditDialog(e, plan)}
                    className="p-1.5 rounded-md text-info hover:bg-info/10 transition-colors"
                    title="Edit Plan"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Are you sure you want to delete membership plan "${plan.name}"?`)) {
                        handleDeletePlan(plan.id);
                      }
                    }}
                    className="p-1.5 rounded-md text-danger hover:bg-danger/10 transition-colors"
                    title="Delete Plan"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
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
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">#{selectedPlanDetails.id}</span>
                <h3 className="font-bold text-lg text-foreground">{selectedPlanDetails.name} Plan</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlanDetails(null)}
                aria-label="Close details"
                className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plan Price</span>
                <p className="font-extrabold text-lg text-primary mt-0.5 flex items-center">
                  <IndianRupee size={16} /> {selectedPlanDetails.price}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Validity Period</span>
                <p className="font-medium text-foreground mt-0.5 flex items-center gap-1.5">
                  <Calendar size={14} className="text-muted-foreground" /> {selectedPlanDetails.duration} ({selectedPlanDetails.durationDays} Days)
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</span>
                <div className="mt-1">
                  <span className={`admin-badge ${selectedPlanDetails.status === 'Active' ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                    {selectedPlanDetails.status}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subscribers</span>
                <p className="font-mono font-medium text-foreground mt-0.5">
                  {selectedPlanDetails.subscribers} enrolled
                </p>
              </div>
              <div className="col-span-2 border-t border-border pt-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">All Included Features</span>
                <ul className="list-none p-0 m-0 space-y-2 mt-2 bg-muted/30 p-3 rounded-lg border border-border">
                  {selectedPlanDetails.features.map((feat) => (
                    <li key={`${selectedPlanDetails.id}-modal-${feat}`} className="flex items-start gap-2 text-xs text-foreground">
                      <CheckCircle size={14} className="text-success shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <button
                type="button"
                onClick={(e) => {
                  openEditDialog(e, selectedPlanDetails);
                  setSelectedPlanDetails(null);
                }}
                className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-info/10 text-info hover:bg-info/20 transition-colors flex items-center gap-1.5"
              >
                <Pencil size={14} /> Edit Plan Details
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlanDetails(null)}
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
