import { Users } from 'lucide-react';
import Link from 'next/link';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';

// RESPONSIBILITY: Renders the empty state for the students table.

export function ManagerStudentsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-bg-card rounded-lg border border-border">
      <div className="mb-4 text-text-secondary">
        <Users size={48} />
      </div>
      <h3 className="text-text-primary font-semibold text-lg mb-2">No students yet</h3>
      <p className="text-text-secondary text-sm mb-6">Get started by adding your first admission.</p>
      <Link href={MANAGER_ROUTES.STUDENTS_NEW} className="mgr-btn-primary">
        ➕ Add Student
      </Link>
    </div>
  );
}
