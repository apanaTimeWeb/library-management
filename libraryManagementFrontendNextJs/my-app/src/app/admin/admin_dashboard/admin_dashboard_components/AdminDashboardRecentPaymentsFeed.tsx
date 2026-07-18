'use client';
import { useState } from 'react';
// RESPONSIBILITY: Renders the AdminDashboardRecentPaymentsFeed component.

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';
import type { AdminDashboardPaymentData } from '@/app/admin/admin_dashboard/admin_dashboard_types/admin_dashboard_types';
import { TablePagination } from '@/components/ui/table-pagination';

export function AdminDashboardRecentPaymentsFeed({ payments }: { payments: AdminDashboardPaymentData[] }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const router = useRouter();

  const handleRowClick = (studentId?: string) => {
    if (studentId) {
      router.push(`${ADMIN_ROUTES.STUDENTS}/${studentId}`);
    }
  };

  const getModeBadgeClass = (mode: string) => {
    if (mode === 'UPI') return 'bg-info-bg text-info';
    if (mode === 'Cash') return 'bg-success-bg text-success';
    if (mode === 'Card') return 'bg-primary-subtle text-primary';
    if (mode === 'Bank Transfer') return 'bg-warning-bg text-warning';
    return 'bg-bg-pageg-input text-text-secondary';
  };

  return (
    <Card className="overflow-hidden border-border bg-bg-pageg-card shadow-none flex flex-col h-full">
      <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base text-text-primary">Recent Payments</CardTitle>
          <CardDescription className="text-xs mt-1 text-text-secondary">
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
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-bg-pageg-page border-y border-border text-text-secondary text-xs font-medium uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.slice((page - 1) * limit, page * limit).map((payment, i) => (
                <tr 
                  key={i} 
                  onClick={() => handleRowClick(payment.id)}
                  className="hover:bg-bg-pageg-page transition-colors cursor-pointer group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white text-xs font-bold shadow-sm">
                        {String(payment.studentName || 'U').charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-sm text-text-primary group-hover:text-primary transition-colors">{payment.studentName || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-sm text-text-primary">
                    ₹{payment.amount}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className={`${getModeBadgeClass('Cash')} text-xs uppercase font-bold tracking-wider rounded-md border-none`}>
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-text-secondary font-medium">
                    {payment.date}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-text-secondary">
                    No recent payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          <TablePagination
            page={page}
            limit={limit}
            totalItems={payments.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </CardContent>
    </Card>
  );
}
