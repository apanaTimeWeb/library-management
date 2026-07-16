'use client';

// RESPONSIBILITY: Client view component rendering expense categories grid, search, status toggles, and add dialog (`Rule 1`, `Rule 8`).
// DATA FLOW: useAdminExpenseCategories -> AdminExpenseCategoriesClient -> Cards / Add Dialog (`Rule 39`).

import { useState } from 'react';
import { Search, Plus, Trash2, Tag } from 'lucide-react';
import { useAdminExpenseCategories } from '@/app/admin/admin_expense-categories/admin_expense-categories_hooks/useAdminExpenseCategories';
import { AdminExpenseCategoriesSkeleton } from '@/app/admin/admin_expense-categories/admin_expense-categories_components/AdminExpenseCategoriesSkeleton';
import { AdminExpenseCategoriesEmptyState } from '@/app/admin/admin_expense-categories/admin_expense-categories_components/AdminExpenseCategoriesEmptyState';
import { AdminExpenseCategoriesAddDialog } from '@/app/admin/admin_expense-categories/admin_expense-categories_components/AdminExpenseCategoriesAddDialog';

export function AdminExpenseCategoriesClient() {
  const {
    categories,
    totalCount,
    fetchState,
    searchInput,
    setSearchInput,
    handleCreateCategory,
    handleToggleStatus,
    handleDeleteCategory,
    handleResetSearch,
  } = useAdminExpenseCategories();

  const [isAddOpen, setIsAddOpen] = useState(false);

  if (fetchState === 'loading' && categories.length === 0) {
    return <AdminExpenseCategoriesSkeleton />;
  }

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      {/* Page Header */}
      <div className="admin-page-header border-b border-border pb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="admin-breadcrumb">Smart Library 360 › Admin › Expense Categories</p>
          <h1 className="admin-page-title">Expense Categories</h1>
          <p className="admin-page-subtitle">Define the types of expenses managers can record in Daily Settlements.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="admin-btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Search Bar (`Rule 15: Debounced search`) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="admin-input pl-9"
            placeholder="Search category name or description…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="text-xs font-medium text-muted-foreground">
          Total Categories: <strong className="text-foreground">{totalCount}</strong>
        </div>
      </div>

      {/* Cards Grid or Empty State (`Rule 1 / Rule 50`) */}
      {categories.length === 0 ? (
        <AdminExpenseCategoriesEmptyState onResetSearch={handleResetSearch} isSearching={Boolean(searchInput.trim())} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-xl border border-border bg-card flex flex-col h-full hover:shadow-md transition-shadow group"
              style={{ opacity: cat.status === 'Inactive' ? 0.72 : 1 }}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-primary shrink-0" />
                  <h3 className="font-bold text-base text-foreground line-clamp-1 m-0">{cat.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleStatus(cat.id)}
                  className={`admin-badge transition-colors shrink-0 ${
                    cat.status === 'Active' ? 'admin-badge-success hover:bg-success/20' : 'admin-badge-danger hover:bg-danger/20'
                  }`}
                  title="Click to toggle active status"
                >
                  {cat.status}
                </button>
              </div>

              {/* Description */}
              <div className="flex-1">
                <p className="text-sm text-muted-foreground m-0 line-clamp-3">
                  {cat.description || 'No description provided.'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end pt-4 mt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete the expense category "${cat.name}"?`)) {
                      handleDeleteCategory(cat.id);
                    }
                  }}
                  className="p-1.5 rounded-md text-danger hover:bg-danger/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Delete Category"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Dialog Modal (`Rule 16, 48`) */}
      <AdminExpenseCategoriesAddDialog
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleCreateCategory}
      />
    </div>
  );
}
