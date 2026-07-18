'use client';
import { Props } from "./AdminReusableEmptyState_types";

// RESPONSIBILITY: Standardized empty state component for lists/tables in the admin_reusable module.
// DATA FLOW: Parent -> AdminReusableEmptyState -> DOM

export default function AdminReusableEmptyState({ title = 'No data found', description = 'Try adjusting your filters.' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground border border-dashed rounded-lg">
      <p className="font-medium text-foreground">{title}</p>
      <p className="text-sm mt-1">{description}</p>
    </div>
  );
}

