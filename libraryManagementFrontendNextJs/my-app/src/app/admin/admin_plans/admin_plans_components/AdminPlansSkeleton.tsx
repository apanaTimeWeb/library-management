// RESPONSIBILITY: Renders skeleton loading cards for membership plans during initial fetch (`Rule 26`, `Rule 38`).
// DATA FLOW: Parent Client Component -> AdminPlansSkeleton

export function AdminPlansSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-1">
      {/* Search & Action bar skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 rounded-md bg-muted" />
        <div className="h-10 w-36 rounded-md bg-muted" />
      </div>

      {/* Plan Cards Grid skeleton (`Rule 1`) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-xl border border-border bg-card space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-5 w-24 rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>
              <div className="h-6 w-16 rounded-full bg-muted" />
            </div>

            <div className="flex items-baseline gap-2 pt-2">
              <div className="h-8 w-24 rounded bg-muted" />
              <div className="h-4 w-12 rounded bg-muted" />
            </div>

            <div className="h-6 w-36 rounded-full bg-muted" />

            <div className="border-t border-border pt-4 space-y-2.5">
              <div className="h-3 w-16 rounded bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
                <div className="h-4 w-4/6 rounded bg-muted" />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border">
              <div className="h-8 w-8 rounded bg-muted" />
              <div className="h-8 w-8 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
