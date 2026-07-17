'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

export interface AdminDashboardPayment {
  name: string;
  initials: string;
  amount: string;
  mode: 'UPI' | 'Cash' | 'Card' | 'Bank Transfer';
  timeAgo: string;
  studentId?: string;
}

export function AdminDashboardRecentPaymentsFeed({ payments }: { payments: AdminDashboardPayment[] }) {
  const router = useRouter();

  const handleRowClick = (studentId?: string) => {
    if (studentId) {
      router.push(`${ADMIN_ROUTES.STUDENTS}/${studentId}`);
    }
  };

  const getModeBadgeClass = (mode: string) => {
    if (mode === 'UPI') return 'bg-info/10 text-info';
    if (mode === 'Cash') return 'bg-success/10 text-success';
    if (mode === 'Card') return 'bg-primary/10 text-primary';
    if (mode === 'Bank Transfer') return 'bg-warning/10 text-warning';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="overflow-hidden border-border bg-card shadow-none flex flex-col h-full">
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
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 border-y text-muted-foreground text-xs font-medium uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((payment, i) => (
                <tr 
                  key={i} 
                  onClick={() => handleRowClick(payment.studentId)}
                  className="hover:bg-muted/10 transition-colors cursor-pointer group"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white text-xs font-bold shadow-sm">
                        {payment.initials}
                      </div>
                      <span className="font-semibold text-sm text-primary group-hover:text-primary transition-colors">{payment.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-sm text-primary">
                    {payment.amount}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className={`${getModeBadgeClass(payment.mode)} text-xs uppercase font-bold tracking-wider rounded-md border-none`}>
                      {payment.mode}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-medium">
                    {payment.timeAgo}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    No recent payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
