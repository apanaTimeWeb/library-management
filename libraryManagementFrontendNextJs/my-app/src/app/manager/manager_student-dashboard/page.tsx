// RESPONSIBILITY: Redirect to manager dashboard.
import { redirect } from 'next/navigation';

export default function StudentDashboardRedirect() {
  redirect('/manager/manager_dashboard');
}
