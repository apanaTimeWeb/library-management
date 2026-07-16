'use client';

// RESPONSIBILITY: Client view rendering daily settlement grid (`Rule 1`, `Rule 8`).
// DATA FLOW: Static Mock -> AdminAccountingDailySettlementClient (`Rule 39`).

import { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

ModuleRegistry.registerModules([AllCommunityModule]);

type Entry = {
  id: number;
  shift: string;
  openingBalance: number;
  cashCollected: number;
  upiCollected: number;
  expenses: number;
  closingBalance: number;
  settledBy: string;
  status: 'pending' | 'settled';
};

const TODAY = new Date().toISOString().split('T')[0];

const MOCK: Entry[] = [
  { id: 1, shift: 'Morning (6AM–2PM)',   openingBalance: 2000, cashCollected: 4500, upiCollected: 3200, expenses: 800,  closingBalance: 5700, settledBy: 'Ravi Kumar',  status: 'settled' },
  { id: 2, shift: 'Afternoon (2PM–9PM)', openingBalance: 5700, cashCollected: 3100, upiCollected: 2800, expenses: 400,  closingBalance: 8400, settledBy: 'Priya Singh', status: 'pending' },
  { id: 3, shift: 'Night (9PM–6AM)',     openingBalance: 8400, cashCollected: 1200, upiCollected: 900,  expenses: 200,  closingBalance: 9400, settledBy: '—',           status: 'pending' },
];

function CurrencyCell({ value }: { value: number }) {
  return <span className="text-sm">₹{Number(value || 0).toLocaleString()}</span>;
}

export function AdminAccountingDailySettlementClient() {
  const [date, setDate] = useState(TODAY);
  const [entries, setEntries] = useState(MOCK);

  const handleSettle = (id: number) => {
    setEntries(p => p.map(e => e.id === id ? { ...e, status: 'settled', settledBy: 'Current User' } : e));
    toast.success('Shift settled successfully.');
  };

  const totalCash = entries.reduce((s, e) => s + e.cashCollected, 0);
  const totalUpi  = entries.reduce((s, e) => s + e.upiCollected, 0);
  const totalExp  = entries.reduce((s, e) => s + e.expenses, 0);

  const ActionCell = (p: any) => {
    if (p.data.status === 'settled') {
      return (
        <div className="flex items-center gap-1.5 text-success font-medium h-full px-2">
          <CheckCircle size={14} /> Settled
        </div>
      );
    }
    return (
      <div className="flex items-center h-full px-2">
        <button
          onClick={() => handleSettle(p.data.id)}
          className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded hover:bg-primary/90 transition-colors"
        >
          Mark Settled
        </button>
      </div>
    );
  };

  const colDefs = useMemo(() => [
    { field: 'shift', headerName: 'Shift', flex: 1.5, minWidth: 180, cellClass: 'font-medium text-foreground' },
    { field: 'openingBalance', headerName: 'Opening', flex: 1, minWidth: 120, cellRenderer: CurrencyCell },
    { field: 'cashCollected', headerName: 'Cash', flex: 1, minWidth: 120, cellRenderer: CurrencyCell },
    { field: 'upiCollected', headerName: 'UPI', flex: 1, minWidth: 120, cellRenderer: CurrencyCell },
    { field: 'expenses', headerName: 'Expenses', flex: 1, minWidth: 120, cellRenderer: CurrencyCell },
    { field: 'closingBalance', headerName: 'Closing', flex: 1, minWidth: 120, cellRenderer: CurrencyCell },
    { field: 'settledBy', headerName: 'Settled By', flex: 1, minWidth: 130, cellClass: 'text-sm text-muted-foreground' },
    { headerName: 'Action', flex: 1, minWidth: 130, cellRenderer: ActionCell, sortable: false, filter: false },
  ], []);

  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      <div className="admin-page-header border-b border-border pb-4 flex items-center justify-between">
        <div>
          <p className="admin-breadcrumb">Smart Library 360 › Admin › Accounting › Daily Settlement</p>
          <h1 className="admin-page-title text-2xl font-extrabold tracking-tight">Daily Settlement</h1>
          <p className="admin-page-subtitle text-muted-foreground mt-1">Review shift collections and expenses.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-foreground">Date:</label>
          <input
            type="date"
            className="admin-input"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Cash</p>
          <p className="text-2xl font-extrabold text-foreground">₹{totalCash.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Total UPI</p>
          <p className="text-2xl font-extrabold text-info">₹{totalUpi.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-2xl font-extrabold text-danger">₹{totalExp.toLocaleString()}</p>
        </div>
      </div>

      <div className="admin-table-wrapper flex-1 min-h-[400px]">
        <AgGridReact
          theme={gridTheme}
          rowData={entries}
          columnDefs={colDefs}
          rowHeight={52}
          headerHeight={40}
          suppressMovableColumns
          suppressCellFocus
          defaultColDef={{ resizable: false, sortable: true }}
          rowClass="hover:bg-muted/30 transition-colors"
        />
      </div>
    </div>
  );
}
