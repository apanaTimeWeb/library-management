'use client';
// RESPONSIBILITY: Client view rendering daily settlement grid (`Rule 1`, `Rule 8`).
// DATA FLOW: Static Mock -> AdminAccountingDailySettlementClient (`Rule 39`).

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TablePagination } from '@/components/ui/table-pagination';
import { Entry } from "./AdminAccountingDailySettlementClient_types";
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

const TODAY = new Date().toISOString().split('T')[0];

const MOCK: Entry[] = [
  { id: 1, shift: 'Morning (6AM–2PM)',   openingBalance: 2000, cashCollected: 4500, upiCollected: 3200, expenses: 800,  closingBalance: 5700, settledBy: 'Ravi Kumar',  status: 'settled' },
  { id: 2, shift: 'Afternoon (2PM–9PM)', openingBalance: 5700, cashCollected: 3100, upiCollected: 2800, expenses: 400,  closingBalance: 8400, settledBy: 'Priya Singh', status: 'pending' },
  { id: 3, shift: 'Night (9PM–6AM)',     openingBalance: 8400, cashCollected: 1200, upiCollected: 900,  expenses: 200,  closingBalance: 9400, settledBy: '—',           status: 'pending' },
];

export function AdminAccountingDailySettlementClient() {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [date, setDate] = useState(TODAY);
  const [entries, setEntries] = useState(MOCK);

  const handleSettle = (id: number) => {
    setEntries(p => p.map(e => e.id === id ? { ...e, status: 'settled', settledBy: 'Current User' } : e));
    toast.success('Shift settled successfully.');
  };

  const totalCash = entries.reduce((s, e) => s + e.cashCollected, 0);
  const totalUpi  = entries.reduce((s, e) => s + e.upiCollected, 0);
  const totalExp  = entries.reduce((s, e) => s + e.expenses, 0);
    const table = useClientTable(entries, 10);
  return (
    <div className="h-full flex flex-col pb-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Daily Settlement</h1>
          <p className="text-sm text-muted-foreground mt-1">Review shift collections and expenses.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-foreground">Date:</label>
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 shadow-none border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Cash</p>
          <p className="text-2xl font-extrabold text-foreground">₹{totalCash.toLocaleString()}</p>
        </Card>
        <Card className="p-5 shadow-none border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Total UPI</p>
          <p className="text-2xl font-extrabold text-info">₹{totalUpi.toLocaleString()}</p>
        </Card>
        <Card className="p-5 shadow-none border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-2xl font-extrabold text-danger">₹{totalExp.toLocaleString()}</p>
        </Card>
      </div>

      <Card className="flex-1 shadow-none border-border overflow-hidden flex flex-col min-h-96">
        <div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-y text-muted-foreground text-xs font-medium uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3">Shift</th>
                <th className="px-4 py-3 text-right">Opening</th>
                <th className="px-4 py-3 text-right">Cash</th>
                <th className="px-4 py-3 text-right">UPI</th>
                <th className="px-4 py-3 text-right">Expenses</th>
                <th className="px-4 py-3 text-right">Closing</th>
                <th className="px-4 py-3">Settled By</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {entries.slice((page - 1) * limit, page * limit).map((entry) => (
                <tr key={entry.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-4 py-4 font-semibold text-foreground">{entry.shift}</td>
                  <td className="px-4 py-4 text-right">₹{entry.openingBalance.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right">₹{entry.cashCollected.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-info font-medium">₹{entry.upiCollected.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-danger font-medium">₹{entry.expenses.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right font-bold text-foreground">₹{entry.closingBalance.toLocaleString()}</td>
                  <td className="px-4 py-4 text-muted-foreground text-sm">{entry.settledBy}</td>
                  <td className="px-4 py-4">
                    {entry.status === 'settled' ? (
                      <Badge variant="secondary" className="bg-success/10 text-success border-none font-bold gap-1 px-2 py-1">
                        <CheckCircle size={12} /> Settled
                      </Badge>
                    ) : (
                      <Button size="sm" onClick={() => handleSettle(entry.id)}>
                        Mark Settled
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                    No shifts found for this date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div> 
      <TablePagination 
        totalItems={table.totalItems} 
        page={table.page} 
        limit={table.limit} 
        onPageChange={table.setPage} 
      />
          <TablePagination
            page={page}
            limit={limit}
            totalItems={entries.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </Card>
    </div>
  );
}
