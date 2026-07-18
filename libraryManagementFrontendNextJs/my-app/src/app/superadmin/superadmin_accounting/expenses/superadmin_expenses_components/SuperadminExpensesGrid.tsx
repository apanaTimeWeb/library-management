'use client';
// RESPONSIBILITY: Renders the SuperadminExpensesGrid component.
import React, { useState, useMemo } from 'react';
import { Trash2, FileWarning, ChevronLeft, ChevronRight } from 'lucide-react';
import type { SuperadminExpense } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_types/SuperadminExpensesTypes';
import type { SuperadminExpensesGridProps as Props } from '@/app/superadmin/superadmin_accounting/superadmin_accounting_types/SuperadminAccountingTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const MODE_BADGE: Record<string, string> = {
  cash: 'bg-success-bg text-success',
  upi:  'bg-info-bg text-info',
  card: 'bg-warning-bg text-warning',
  bank: 'bg-primary text-white',
};

export function SuperadminExpensesGrid({ expenses, onDelete }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const searchedExpenses = useMemo(() => {
    if (!searchTerm) return expenses;
    const lowerSearch = searchTerm.toLowerCase();
    return expenses.filter(exp => 
      exp.category?.toLowerCase().includes(lowerSearch) ||
      exp.description?.toLowerCase().includes(lowerSearch) ||
      exp.paidBy?.toLowerCase().includes(lowerSearch)
    );
  }, [expenses, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(searchedExpenses.length / pageSize);
  const paginatedExpenses = searchedExpenses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col">
      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileWarning size={48} className="text-text-disabled mb-4 opacity-50" />
          <p className="text-lg font-bold text-text-primary mb-1">No expenses found.</p>
          <p className="text-sm font-medium text-text-disabled">Try adjusting your category filter or add a new expense.</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 w-full p-4">
            <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
            
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-bg-page/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Date</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Category</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Description</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase text-right">Amount ₹</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Mode</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Paid By</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase text-right w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedExpenses.length > 0 ? (
                    paginatedExpenses.map((exp, index) => (
                      <TableRow 
                        key={index}
                        className="hover:bg-bg-page/50 transition-colors"
                      >
                        <TableCell>
                          <span className="font-mono text-xs text-text-disabled tracking-tight">{exp.date}</span>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-bg-input text-text-secondary border border-border">
                            {exp.category}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-text-primary">
                          {exp.description}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-base font-extrabold text-danger tracking-tight">
                            ₹{exp.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${MODE_BADGE[exp.mode ?? 'cash']}`}>
                            {exp.mode}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm font-bold text-text-secondary">
                          {exp.paidBy}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end items-center">
                            <button 
                              className="w-8 h-8 flex items-center justify-center rounded-md bg-danger-bg text-danger hover:bg-danger hover:text-white transition-colors duration-200 cursor-pointer" 
                              onClick={() => onDelete(exp.id)}
                              title="Delete Expense"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center text-text-secondary">
                        No expenses match your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Pagination Footer */}
          <div className="p-4 border-t border-border flex items-center justify-between bg-bg-page/30">
            <span className="text-sm font-semibold text-text-secondary">
              Showing {paginatedExpenses.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedExpenses.length)} of {searchedExpenses.length} expenses
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-semibold text-text-primary">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
