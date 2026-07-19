'use client';
// RESPONSIBILITY: Renders the AdminFinanceReferralsClient component.
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Users, Trophy, IndianRupee , Search} from 'lucide-react';
import { formatCurrency } from '@/app/admin/admin_finance/admin_finance_utils/AdminFinanceFormat';
import { useAdminFinanceReferrals } from '@/app/admin/admin_finance/referrals/admin_finance_referrals_hooks/useAdminFinanceReferrals';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from '@/components/ui/table-toolbar';
import { useClientTable } from '@/components/ui/use-client-table';

export function AdminFinanceReferralsClient() {

  const {
    isLoading,
    expanded,
    setExpanded,
    totalReferrals,
    totalBonus,
    topReferrer,
    referrers
  } = useAdminFinanceReferrals();

    const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
    const table = useClientTable(referrers, 10);
  return (
    <div className="h-full flex flex-col pb-10 space-y-6 relative">
      {/* page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
        <div>
          <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Finance</nav>
          <h1 className="text-text-primary text-xl font-bold tracking-tight">Referrals & Bonuses</h1>
          <p className="text-sm text-muted-foreground mt-1">Student referral leaderboard and bonus tracking.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 shadow-none flex flex-col justify-center border-border bg-card">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">Total Referrals Made</span>
            <Users size={16} className="text-muted-foreground" />
          </div>
          <p className="text-text-primary text-xl font-bold text-primary">{totalReferrals}</p>
        </Card>
        
        <Card className="p-4 shadow-none flex flex-col justify-center border-success/30 bg-success/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold tracking-wider uppercase text-success">Total Bonus Issued ₹</span>
            <IndianRupee size={16} className="text-success" />
          </div>
          <p className="text-text-primary text-xl font-bold text-success">{formatCurrency(totalBonus)}</p>
        </Card>
        
        <Card className="p-4 shadow-none flex flex-col justify-center border-warning/30 bg-warning/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold tracking-wider uppercase text-warning">Top Referrer</span>
            <Trophy size={16} className="text-warning" />
          </div>
          <p className="text-xl font-bold text-primary truncate">{topReferrer?.name || '—'}</p>
          <p className="text-xs text-muted-foreground font-medium">{topReferrer?.referredCount || 0} referrals</p>
        </Card>
      </div>

      {/* Table */}
      <Card className="flex-1 shadow-none border-border bg-card overflow-hidden flex flex-col min-h-96">
        <div className="w-full overflow-x-auto flex-1">
          
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

<div className="mb-4">
        <TableToolbar 
          search={table.searchTerm} 
          onSearch={table.setSearchTerm} 
        />
      </div>
      <table className="w-full text-sm text-left whitespace-nowrap min-w-max">
            <thead className="bg-muted/30 border-b text-muted-foreground text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-5 py-3">Rank</th>
                <th className="px-5 py-3">Referrer</th>
                <th className="px-5 py-3">Referred Students</th>
                <th className="px-5 py-3 text-center">Referred Count</th>
                <th className="px-5 py-3 text-right">Bonus Earned ₹</th>
                <th className="px-5 py-3 text-right">Redeemed ₹</th>
                <th className="px-5 py-3 text-right">Balance ₹</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <p className="text-muted-foreground font-medium">Loading referrals...</p>
                    </div>
                  </td>
                </tr>
              ) : table.paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="text-4xl opacity-50">ðŸ‘¥</div>
                      <p className="text-lg font-bold">No referrals recorded yet.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                table.paginatedData.map((r: Record<string, unknown>, idx: number) => (
                  <tr key={r.id as string} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4">
                      <span className={`text-sm ${idx === 0 ? 'text-warning font-black text-lg' : 'text-muted-foreground font-bold'}`}>#{idx + 1}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-sm text-primary">{r.name as string}</div>
                      <div className="text-xs font-mono text-muted-foreground">{r.smartId as string}</div>
                    </td>
                    <td className="px-5 py-4 max-w-xs whitespace-normal">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-muted text-primary hover:bg-muted/80 border-none font-bold text-xs h-7 px-3 gap-1"
                        onClick={() => setExpanded(expanded === r.id ? null : (r.id as never))}
                      >
                        {expanded === r.id ? 'â–²' : 'â–¼'} {r.referredCount as number} students
                      </Button>
                      {expanded === r.id && (
                        <div className="flex flex-wrap gap-1 mt-3 animate-in fade-in slide-in-from-top-1">
                          {(r.referredNames as string[]).map((name: string, i: number) => (
                            <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-none text-xs uppercase tracking-wider font-bold">
                              {name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center font-bold text-sm text-primary">{r.referredCount as number}</td>
                    <td className="px-5 py-4 text-right text-sm font-bold text-success">{formatCurrency(r.bonusEarned as number)}</td>
                    <td className="px-5 py-4 text-right text-sm font-medium text-primary">{formatCurrency(r.redeemed as number)}</td>
                    <td className="px-5 py-4 text-right text-sm font-bold text-primary">{formatCurrency(r.balance as number)}</td>
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
            totalItems={referrers.length}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
      </Card>
    </div>
  );
}
