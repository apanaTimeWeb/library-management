// RESPONSIBILITY: Component or Page.
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface TablePaginationProps { page?: number; limit?: number; totalItems?: number; onPageChange?: (page: number) => void; onLimitChange?: (limit: number) => void; currentPage?: number; totalPages?: number; }

export function TablePagination({
  page,
  limit,
  totalItems,
  onPageChange,
  onLimitChange
}: TablePaginationProps) {
  const totalPages = Math.ceil((totalItems || 0) / (limit || 1)) || 1;
  const startIndex = ((page || 1) - 1) * (limit || 10) + 1;
  const endIndex = Math.min((page || 1) * (limit || 10), (totalItems || 0));

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card">
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange && onPageChange((page || 1) - 1)}
          disabled={(page || 1) <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange && onPageChange((page || 1) + 1)}
          disabled={(page || 1) >= totalPages}
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-text-secondary">
            Showing <span className="font-medium text-text-primary">{(totalItems || 0) === 0 ? 0 : startIndex}</span> to{' '}
            <span className="font-medium text-text-primary">{endIndex}</span> of{' '}
            <span className="font-medium text-text-primary">{totalItems}</span> results
          </p>
        </div>
        <div className="flex items-center gap-4">
          {onLimitChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-secondary">Rows per page:</span>
              <select
                className="h-8 rounded-md border border-border bg-input px-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                value={limit}
                onChange={(e) => onLimitChange && onLimitChange(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          )}
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Button
              variant="outline"
              size="icon"
              className="rounded-l-md rounded-r-none h-8 w-8 focus:z-10"
              onClick={() => onPageChange && onPageChange((page || 1) - 1)}
              disabled={(page || 1) <= 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft size={16} />
            </Button>
            <div className="flex items-center justify-center px-3 border-y border-border bg-input text-sm font-semibold text-text-primary h-8 focus:z-10">
              {page} / {totalPages}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-l-none rounded-r-md h-8 w-8 focus:z-10"
              onClick={() => onPageChange && onPageChange((page || 1) + 1)}
              disabled={(page || 1) >= totalPages}
            >
              <span className="sr-only">Next</span>
              <ChevronRight size={16} />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

