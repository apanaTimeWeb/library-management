'use client';
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ICellRendererParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/superadmin/superadmin_shared_components/superadmin_gridTheme';
import { Trash2, FileWarning } from 'lucide-react';
import type { SuperadminExpense } from '@/app/superadmin/superadmin_accounting/expenses/superadmin_expenses_types/SuperadminExpensesTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
  expenses: SuperadminExpense[];
  onDelete: (id: number) => void;
}

const MODE_BADGE: Record<string, string> = {
  cash: 'bg-[var(--success-bg,rgba(52,211,153,0.1))] text-success',
  upi:  'bg-[var(--info-bg,rgba(59,130,246,0.1))] text-info,#3B82F6',
  card: 'bg-[var(--warning-bg,rgba(251,191,36,0.1))] text-warning',
  bank: 'bg-primary text-white',
};

export function SuperadminExpensesGrid({ expenses, onDelete }: Props) {
  const colDefs = useMemo<any[]>(() => [
    { 
      field: 'date', 
      headerName: 'Date', 
      width: 130, 
      cellRenderer: (p: ICellRendererParams<SuperadminExpense>) => (
        <span className="font-mono text-xs text-text-disabled tracking-tight">{p.data?.date}</span>
      )
    },
    { 
      field: 'category', 
      headerName: 'Category', 
      width: 150,
      cellRenderer: (p: ICellRendererParams<SuperadminExpense>) => (
        <span className="inline-flex items-center px-2 py-1 rounded-[var(--radius-sm)] text-[10px] font-bold uppercase tracking-wider bg-bg-input text-text-secondary border border-border mt-2">
          {p.data?.category}
        </span>
      )
    },
    { 
      field: 'description', 
      headerName: 'Description', 
      flex: 1, 
      minWidth: 200, 
      cellRenderer: (p: ICellRendererParams<SuperadminExpense>) => (
        <span className="text-sm font-medium text-text-primary">{p.data?.description}</span>
      )
    },
    { 
      field: 'amount', 
      headerName: 'Amount ₹', 
      width: 140,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminExpense>) => (
        <span className="text-[15px] font-extrabold text-danger tracking-tight">
          ₹{p.data?.amount.toLocaleString()}
        </span>
      )
    },
    { 
      field: 'mode', 
      headerName: 'Mode', 
      width: 120,
      cellRenderer: (p: ICellRendererParams<SuperadminExpense>) => (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mt-2 ${MODE_BADGE[p.data?.mode ?? 'cash']}`}>
          {p.data?.mode}
        </span>
      )
    },
    { 
      field: 'paidBy', 
      headerName: 'Paid By', 
      width: 140, 
      cellRenderer: (p: ICellRendererParams<SuperadminExpense>) => (
        <span className="text-[13px] font-bold text-text-secondary">{p.data?.paidBy}</span>
      )
    },
    {
      headerName: 'Actions',
      width: 100,
      sortable: false,
      filter: false,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (p: ICellRendererParams<SuperadminExpense>) => (
        <div className="h-full flex justify-end items-center pr-2">
          <button 
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--danger-bg,rgba(248,113,113,0.1))] text-danger hover:bg-danger hover:text-white transition-colors duration-200" 
            onClick={() => p.data && onDelete(p.data.id)}
            title="Delete Expense"
          >
            <Trash2 size={15} />
          </button>
        </div>
      )
    }
  ], [onDelete]);

  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden shadow-sm">
      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileWarning size={48} className="text-text-disabled mb-4 opacity-50" />
          <p className="text-lg font-bold text-text-primary mb-1">No expenses found.</p>
          <p className="text-sm font-medium text-text-disabled">Try adjusting your category filter or add a new expense.</p>
        </div>
      ) : (
        <div style={{ height: 450 }}>
          <AgGridReact
            theme={gridTheme}
            rowData={expenses}
            columnDefs={colDefs}
            rowHeight={56}
            headerHeight={48}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true
            }}
          />
        </div>
      )}
    </div>
  );
}
