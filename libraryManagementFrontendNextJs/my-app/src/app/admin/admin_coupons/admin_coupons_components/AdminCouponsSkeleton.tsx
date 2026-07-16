// RESPONSIBILITY: Renders skeleton loading structure for coupons page (`Rule 26`, `Rule 38`).
// DATA FLOW: Parent Client Component -> AdminCouponsSkeleton

export function AdminCouponsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-1">
      {/* KPIs skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-lg border border-border bg-card flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-muted shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-20 rounded bg-muted" />
              <div className="h-6 w-12 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* Search & Action bar skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 rounded-md bg-muted" />
        <div className="h-10 w-36 rounded-md bg-muted" />
      </div>

      {/* Table grid skeleton */}
      <div className="border rounded-lg border-border overflow-hidden">
        <div className="h-12 bg-muted/60 border-b border-border" />
        <div className="divide-y divide-border">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-card">
              <div className="h-5 w-28 rounded bg-muted" />
              <div className="h-5 w-20 rounded bg-muted" />
              <div className="h-4 w-36 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-6 w-20 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
