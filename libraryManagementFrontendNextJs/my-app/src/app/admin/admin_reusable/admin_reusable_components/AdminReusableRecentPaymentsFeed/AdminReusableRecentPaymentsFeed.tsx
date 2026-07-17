// RESPONSIBILITY: Renders the AdminReusableRecentPaymentsFeed component.
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ADMIN_ROUTES } from '@/app/admin/admin_url_config';

export interface AdminReusablePayment {
  name: string;
  initials: string;
  amount: string;
  mode: 'UPI' | 'Cash' | 'Card' | 'Bank Transfer';
  timeAgo: string;
  studentId?: string;
}

export default function AdminReusableRecentPaymentsFeed({ payments }: { payments: AdminReusablePayment[] }) {
  const router = useRouter();

  const handleRowClick = (studentId?: string) => {
    if (studentId) {
      router.push(`${ADMIN_ROUTES.STUDENTS}/${studentId}`);
    }
  };

  const getModeBadgeClass = (mode: string) => {
    if (mode === 'UPI') return 'bg-info/10 text-info hover:bg-info/20';
    if (mode === 'Cash') return 'bg-success/10 text-success hover:bg-success/20';
    if (mode === 'Card') return 'bg-primary/10 text-primary hover:bg-primary/20';
    if (mode === 'Bank Transfer') return 'bg-warning/10 text-warning hover:bg-warning/20';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="overflow-hidden border-border bg-card shadow-none flex flex-col h-full">
      <CardHeader className="pb-4 flex flex-row items-center justify-between space-y-0 border-b">
        <div>
          <CardTitle className="text-base font-bold">Recent Payments</CardTitle>
          <CardDescription className="text-xs mt-1 font-medium">
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

      <CardContent className="p-0 flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-medium uppercase tracking-wider sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Mode</th>
              <th className="px-4 py-3">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.map((payment, index) => (
              <tr 
                key={index}
                className="hover:bg-muted/10 transition-colors cursor-pointer"
                onClick={() => handleRowClick(payment.studentId)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {payment.initials}
                    </div>
                    <span className="font-semibold text-sm text-foreground">{payment.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-bold text-sm text-foreground">{payment.amount}</span>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary" className={`${getModeBadgeClass(payment.mode)} text-xs uppercase font-bold tracking-wider rounded-md border-none`}>
                    {payment.mode}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-muted-foreground font-medium">{payment.timeAgo}</span>
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No recent transactions.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
