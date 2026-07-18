// RESPONSIBILITY: Renders skeleton loading cards for categories during initial fetch (`Rule 26`, `Rule 38`).
// DATA FLOW: Parent Client Component -> AdminExpenseCategoriesSkeleton

export function AdminExpenseCategoriesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-1">
      {/* Search & Action bar skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 rounded-md bg-muted" />
        <div className="h-10 w-40 rounded-md bg-muted" />
      </div>

      {/* Grid skeleton (`Rule 1`) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-5 rounded-xl border border-border bg-card flex flex-col h-full space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-muted" />
                <div className="h-5 w-24 rounded bg-muted" />
              </div>
              <div className="h-6 w-16 rounded-full bg-muted" />
            </div>

            <div className="flex-1 space-y-2 pt-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
            </div>

            <div className="flex justify-end pt-3 border-t border-border">
              <div className="h-8 w-8 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
