// RESPONSIBILITY: Renders the skeleton loading structure for the audit logs page during data fetching (`Rule 26`, `Rule 38`).
// DATA FLOW: Parent Client Component -> AdminAuditLogsSkeleton

export function AdminAuditLogsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-1">
      {/* Filters skeleton */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-10 w-64 rounded-md bg-muted" />
        <div className="flex gap-2">
          <div className="h-10 w-16 rounded-md bg-muted" />
          <div className="h-10 w-20 rounded-md bg-muted" />
          <div className="h-10 w-20 rounded-md bg-muted" />
          <div className="h-10 w-20 rounded-md bg-muted" />
        </div>
      </div>

      {/* Table grid skeleton */}
      <div className="border rounded-lg border-border overflow-hidden">
        <div className="h-12 bg-muted/60 border-b border-border" />
        <div className="divide-y divide-border">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-card">
              <div className="h-4 w-28 rounded bg-muted" />
              <div className="h-4 w-40 rounded bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-4 w-32 rounded bg-muted" />
              <div className="h-4 w-48 rounded bg-muted" />
              <div className="h-6 w-24 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
