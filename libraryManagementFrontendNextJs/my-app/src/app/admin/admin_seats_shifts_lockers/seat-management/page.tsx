import { ADMIN_SEATS_MOCK_SEATS } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_data/AdminSeatsMockData';
import { SeatManagementClient } from '@/app/admin/admin_seats_shifts_lockers/seat-management/SeatManagementClient';
import { type Seat } from '@/app/admin/admin_seats_shifts_lockers/seat-management/useSeatManagement';

export default function SeatManagementPage() {
  const seats = ADMIN_SEATS_MOCK_SEATS as Seat[];

  return <SeatManagementClient initialSeats={seats} />;
}
