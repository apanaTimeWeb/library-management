// RESPONSIBILITY: Renders the page.tsx component/hook.
import { ADMIN_SEATS_MOCK_SEATS } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_data/AdminSeatsMockData';
import { AdminSeatManagementClient } from '@/app/admin/admin_seats_shifts_lockers/seat-management/AdminSeatManagementClient';
import { type Seat } from '@/app/admin/admin_seats_shifts_lockers/seat-management/useAdminSeatManagement';

export default function SeatManagementPage() {
  const seats = ADMIN_SEATS_MOCK_SEATS as Seat[];

  return <AdminSeatManagementClient initialSeats={seats} />;
}
