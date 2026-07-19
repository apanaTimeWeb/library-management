'use client';
import { AdminSearchableDropdown } from '@/app/admin/admin_shared_components/AdminSearchableDropdown';

// RESPONSIBILITY: Renders the AdminFinanceInvoiceClient component.
import { useState } from 'react';
import Link from 'next/link';
import { Search, FileText, Printer, Eye, Send } from 'lucide-react';
import { formatCurrency, formatDate } from '@/app/admin/admin_finance/admin_finance_utils/AdminFinanceFormat';
import { useAdminFinanceInvoice, type FilterStatus } from '@/app/admin/admin_finance/invoice/admin_finance_invoice_hooks/useAdminFinanceInvoice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

export function AdminFinanceInvoiceClient() {

  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredInvoices,
    kpiData,
    handleWhatsApp,
    handlePrint
  } = useAdminFinanceInvoice();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getStatusBadge = (status: string) => {
    switch(status.toLowerCase()) {
      case 'paid': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'overdue': return 'bg-danger/10 text-danger';
      default: return 'bg-muted text-muted-foreground';
    }
  };
    const table = useClientTable(filteredInvoices, 10);
  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted-foreground mt-1">View and download GST-compliant tax invoices.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 shadow-none border-border bg-card flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">TOTAL INVOICES</span>
            <FileText size={16} className="text-muted-foreground" />
          </div>
          <p className="text-text-primary text-xl font-bold leading-none tracking-tight text-primary">{kpiData.totalInvoices}</p>
        </Card>
        
        <Card className="p-5 shadow-none border-success/30 bg-success/5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-success">TOTAL BILLED</span>
            <FileText size={16} className="text-success" />
          </div>
          <p className="text-text-primary text-xl font-bold leading-none tracking-tight text-success">{formatCurrency(kpiData.totalBilled)}</p>
        </Card>
        
        <Card className="p-5 shadow-none border-warning/30 bg-warning/5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider uppercase text-warning">PENDING / OVERDUE</span>
            <FileText size={16} className="text-warning" />
          </div>
          <p className="text-text-primary text-xl font-bold leading-none tracking-tight text-warning">{kpiData.pendingOrOverdue}</p>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            className="pl-9 h-10"
            placeholder="Search by invoice no., student name or ID..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
        </div>
        <AdminSearchableDropdown 
          className="flex h-10 w-full max-w-52 items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-sm ring-offset-bg-page placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:ring-offset-2"
          value={statusFilter} 
          onChange={e => setStatusFilter(e.target.value as FilterStatus)}
        >
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </AdminSearchableDropdown>
      </div>

      {/* Invoices Table */}
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
                <th className="px-5 py-3">Invoice No.</th>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Amount</th>
                <th className="px-5 py-3">Mode</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {table.paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">🧾</div>
                      <p className="text-lg font-bold">No invoices found.</p>
                      <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.paginatedData.map((inv) => (
                  <tr key={inv.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-medium text-primary">{inv.invoiceNumber}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-sm text-primary">{inv.studentName}</div>
                      <div className="text-xs text-muted-foreground font-medium mt-0.5">{inv.studentId}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground font-medium">
                      {formatDate(inv.invoiceDate)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-bold text-sm text-primary">{formatCurrency(inv.grandTotal)}</span>
                    </td>
                    <td className="px-5 py-4">
                      {inv.paymentMode ? (
                        <Badge variant="secondary" className="bg-muted text-primary border-none uppercase tracking-wider font-bold text-xs">
                          {inv.paymentMode}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground opacity-50">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="secondary" className={`${getStatusBadge(inv.paymentStatus)} border-none uppercase tracking-wider font-bold text-xs`}>
                        {inv.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/admin_finance/invoice/${inv.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10" title="View">
                            <Eye size={14} />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10" 
                          onClick={() => handlePrint(inv)} 
                          title="Print (Thermal)"
                        >
                          <Printer size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-success hover:text-success hover:bg-success/10" 
                          onClick={() => handleWhatsApp(inv)} 
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
            totalItems={filteredInvoices.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </Card>
    </div>
  );
}
