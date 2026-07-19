'use client';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

// RESPONSIBILITY: Renders the AdminFinanceReceiptClient component.
import { useState } from 'react';
import Link from 'next/link';
import { Search, Receipt, Eye, Printer, Send } from 'lucide-react';
import { formatCurrency, formatDate } from '@/app/admin/admin_finance/admin_finance_utils/AdminFinanceFormat';
import { useAdminFinanceReceipt, type FilterMode } from '@/app/admin/admin_finance/receipt/admin_finance_receipt_hooks/useAdminFinanceReceipt';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

export default function AdminFinanceReceiptClient() {

  const {
    search,
    setSearch,
    modeFilter,
    setModeFilter,
    filteredReceipts,
    kpiData,
    handleWhatsApp,
    handlePrint
  } = useAdminFinanceReceipt();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getModeBadge = (mode: string) => {
    switch(mode.toLowerCase()) {
      case 'upi': return 'bg-primary/10 text-primary';
      case 'cash': return 'bg-success/10 text-success';
      case 'card': return 'bg-warning/10 text-warning';
      case 'bank transfer': return 'bg-info/10 text-info';
      default: return 'bg-muted text-muted-foreground';
    }
  };
    const table = useClientTable(filteredReceipts, 10);
  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">Receipts</h1>
          <p className="text-sm text-muted-foreground mt-1">View and share payment receipts for all transactions.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 shadow-none border-border bg-card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">TOTAL RECEIPTS</span>
            <Receipt size={16} className="text-muted-foreground" />
          </div>
          <p className="text-text-primary text-xl font-bold leading-none tracking-tight text-primary">{kpiData.totalReceipts}</p>
        </Card>
        
        <Card className="p-5 shadow-none border-success/30 bg-success/5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-success">TOTAL COLLECTED</span>
            <Receipt size={16} className="text-success" />
          </div>
          <p className="text-text-primary text-xl font-bold leading-none tracking-tight text-success">{formatCurrency(kpiData.totalCollected)}</p>
        </Card>
        
        <Card className="p-5 shadow-none border-border bg-card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">THIS MONTH</span>
            <Receipt size={16} className="text-muted-foreground" />
          </div>
          <p className="text-text-primary text-xl font-bold leading-none tracking-tight text-primary">{kpiData.thisMonth}</p>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            className="pl-9 h-10"
            placeholder="Search by receipt no., student name or ID..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <AdminSearchableDropdown 
          className="flex h-10 w-full max-w-52 items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2"
          value={modeFilter} 
          onChange={e => setModeFilter(e.target.value as FilterMode)}
        >
          <option value="all">All Modes</option>
          <option value="upi">UPI</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="bank transfer">Bank Transfer</option>
        </AdminSearchableDropdown>
      </div>

      {/* Receipts Table */}
      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col">
        <div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <div className="w-full overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3">Receipt No.</th>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Plan</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Amount</th>
                <th className="px-5 py-3">Mode</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {table.paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">ðŸ§¾</div>
                      <p className="text-lg font-bold">No receipts found.</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.paginatedData.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-medium text-primary">{r.receiptNumber}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-sm text-primary">{r.studentName}</div>
                      <div className="text-xs text-muted-foreground font-medium mt-0.5">{r.studentId}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground font-medium max-w-xs truncate">
                      {r.planName}
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground font-medium">
                      {formatDate(r.date)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-bold text-sm text-primary">{formatCurrency(r.amount)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="secondary" className={`${getModeBadge(r.paymentMode)} border-none uppercase tracking-wider font-bold text-xs`}>
                        {r.paymentMode}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/admin_finance/receipt/${r.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10" title="View">
                            <Eye size={14} />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10" 
                          onClick={() => handlePrint(r)} 
                          title="Print (Thermal)"
                        >
                          <Printer size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-success hover:text-success hover:bg-success/10" 
                          onClick={() => handleWhatsApp(r)} 
                          title="Send WhatsApp"
                        >
                          <Send size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
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
            totalItems={filteredReceipts.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </Card>
    </div>
  );
}
