// RESPONSIBILITY: Renders the recent payments transaction feed using AG Grid with payment mode badges and quick navigation.
// DATA FLOW: AdminDashboardPage / Finance -> AdminReusableRecentPaymentsFeed -> AG Grid

'use client';

import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef, type RowClickedEvent } from 'ag-grid-community';
import { gridTheme } from '@/app/admin/admin_reusable/admin_reusable_utils/AdminReusableGridTheme';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

ModuleRegistry.registerModules([AllCommunityModule]);

export interface AdminReusablePayment {
  name: string;
  initials: string;
  amount: string;
  mode: 'UPI' | 'Cash' | 'Card' | 'Bank Transfer';
  timeAgo: string;
  studentId?: string;
}

function NameCell({ value, data }: { value?: string; data?: AdminReusablePayment }) {
  if (!data || !value) return null;
  return (
    <div className="flex items-center gap-3 h-full">
      <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-white text-[10px] font-bold">
        {data.initials}
      </div>
      <span className="font-semibold text-sm text-text-primary">{value}</span>
    </div>
  );
}

function AmountCell({ value }: { value?: string }) {
  if (!value) return null;
  return <span className="font-bold text-sm text-text-primary">{value}</span>;
}

function ModeCell({ value }: { value?: string }) {
  if (!value) return null;
  let badgeClass = 'bg-muted text-muted-foreground';
  if (value === 'UPI') badgeClass = 'bg-info/10 text-info hover:bg-info/20';
  if (value === 'Cash') badgeClass = 'bg-success/10 text-success hover:bg-success/20';
  if (value === 'Card') badgeClass = 'bg-primary/10 text-primary hover:bg-primary/20';
  if (value === 'Bank Transfer') badgeClass = 'bg-warning/10 text-warning hover:bg-warning/20';
  
  return <Badge variant="secondary" className={`${badgeClass} text-[10px] uppercase font-bold tracking-wider rounded-md border-none`}>{value}</Badge>;
}

function TimeCell({ value }: { value?: string }) {
  if (!value) return null;
  return <span className="text-xs text-muted-foreground font-medium">{value}</span>;
}

export default function AdminReusableRecentPaymentsFeed({ payments }: { payments: AdminReusablePayment[] }) {
  const router = useRouter();

  const colDefs = useMemo<ColDef<AdminReusablePayment>[]>(() => [
    {
      field: 'name',
      headerName: 'STUDENT NAME',
      flex: 2,
      sortable: true,
      cellRenderer: NameCell,
    },
    {
      field: 'amount',
      headerName: 'AMOUNT',
      flex: 1,
      sortable: true,
      cellRenderer: AmountCell,
    },
    {
      field: 'mode',
      headerName: 'MODE',
      flex: 1,
      sortable: true,
      filter: true,
      cellRenderer: ModeCell,
    },
    {
      field: 'timeAgo',
      headerName: 'TIME',
      flex: 1,
      cellRenderer: TimeCell,
    },
  ], []);

  const onRowClicked = useCallback((e: RowClickedEvent<AdminReusablePayment>) => {
    const studentId = e.data?.studentId;
    if (studentId) {
      router.push(`${ADMIN_ROUTES.STUDENTS}/${studentId}`);
    }
  }, [router]);

  return (
    <Card className="overflow-hidden border-border bg-bg-card shadow-none flex flex-col h-full">
      <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base">Recent Payments</CardTitle>
          <CardDescription className="text-xs mt-1">
            Last {payments.length} transactions today — click row to view student
          </CardDescription>
        </div>
        <Link
          href={ADMIN_ROUTES.REPORTS}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View Report <ExternalLink size={12} />
        </Link>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        <div style={{ height: 300, width: '100%' }}>
          <AgGridReact<AdminReusablePayment>
            theme={gridTheme}
            rowData={payments}
            columnDefs={colDefs}
            rowHeight={48}
            headerHeight={38}
            suppressMovableColumns
            suppressCellFocus
            onRowClicked={onRowClicked}
            rowStyle={{ cursor: 'pointer' }}
            pagination={false}
            defaultColDef={{ resizable: false }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

