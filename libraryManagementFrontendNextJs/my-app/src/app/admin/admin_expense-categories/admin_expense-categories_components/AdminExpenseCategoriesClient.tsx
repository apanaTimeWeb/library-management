'use client';

// RESPONSIBILITY: Client view component rendering expense categories grid, search, status toggles, and add dialog (`Rule 1`, `Rule 8`).
// DATA FLOW: useAdminExpenseCategories -> AdminExpenseCategoriesClient -> Cards / Add Dialog (`Rule 39`).

import { useState } from 'react';
import { Search, Plus, Trash2, Tag } from 'lucide-react';
import { useAdminExpenseCategories } from '@/app/admin/admin_expense-categories/admin_expense-categories_hooks/useAdminExpenseCategories';
import { AdminExpenseCategoriesSkeleton } from '@/app/admin/admin_expense-categories/admin_expense-categories_components/AdminExpenseCategoriesSkeleton';
import { AdminExpenseCategoriesEmptyState } from '@/app/admin/admin_expense-categories/admin_expense-categories_components/AdminExpenseCategoriesEmptyState';
import { AdminExpenseCategoriesAddDialog } from '@/app/admin/admin_expense-categories/admin_expense-categories_components/AdminExpenseCategoriesAddDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

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
      <div className="border-b border-border pb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Smart Library 360 <span className="opacity-50">›</span> Admin <span className="opacity-50">›</span> Expense Categories
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Expense Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">Define the types of expenses managers can record in Daily Settlements.</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2">
          <Plus size={16} /> Add Category
        </Button>
      </div>

      {/* Search Bar (`Rule 15: Debounced search`) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
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
            <Card
              key={cat.id}
              className={`p-5 flex flex-col h-full hover:shadow-md transition-all group ${cat.status === 'Inactive' ? 'opacity-70' : 'opacity-100'}`}
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
                  className="shrink-0 transition-transform hover:scale-105 active:scale-95"
                  title="Click to toggle active status"
                >
                  <Badge variant="secondary" className={`${cat.status === 'Active' ? 'bg-success/10 text-success hover:bg-success/20' : 'bg-danger/10 text-danger hover:bg-danger/20'} border-none`}>
                    {cat.status}
                  </Badge>
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
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete the expense category "${cat.name}"?`)) {
                      handleDeleteCategory(cat.id);
                    }
                  }}
                  className="h-8 w-8 text-danger hover:bg-danger/10 hover:text-danger opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                  title="Delete Category"
                >
                  <Trash2 size={15} />
                </Button>
              </div>
            </Card>
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
