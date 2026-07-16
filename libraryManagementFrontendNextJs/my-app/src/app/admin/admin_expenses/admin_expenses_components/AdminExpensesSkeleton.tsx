// RESPONSIBILITY: Renders skeleton loading structure for expenses table (`Rule 26`, `Rule 38`).
// DATA FLOW: Parent Client Component -> AdminExpensesSkeleton

export function AdminExpensesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-1">
      {/* Search & Action bar skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-72 rounded-md bg-muted" />
      </div>

      {/* Table grid skeleton */}
      <div className="border rounded-lg border-border overflow-hidden">
        <div className="h-12 bg-muted/60 border-b border-border" />
        <div className="divide-y divide-border">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-card">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-4 w-20 rounded bg-muted" />
              <div className="h-6 w-20 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
