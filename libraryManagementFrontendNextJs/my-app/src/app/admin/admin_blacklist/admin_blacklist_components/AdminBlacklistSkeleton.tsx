// RESPONSIBILITY: Renders skeleton loading structure for blacklist page (`Rule 26`, `Rule 38`).
// DATA FLOW: Parent Client Component -> AdminBlacklistSkeleton

export function AdminBlacklistSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-1">
      {/* Warning banner skeleton */}
      <div className="h-14 w-full rounded-lg bg-muted/70 border border-border" />

      {/* Search & Action bar skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 rounded-md bg-muted" />
        <div className="h-10 w-44 rounded-md bg-muted" />
      </div>

      {/* Table grid skeleton */}
      <div className="border rounded-lg border-border overflow-hidden">
        <div className="h-12 bg-muted/60 border-b border-border" />
        <div className="divide-y divide-border">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-card">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted shrink-0" />
                <div className="space-y-1">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-3 w-24 rounded bg-muted" />
                </div>
              </div>
              <div className="h-4 w-48 rounded bg-muted" />
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-6 w-24 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
