import { ADMIN_SEATS_MOCK_SEATS } from '@/app/admin/admin_seats_shifts_lockers/admin_seats_data/AdminSeatsMockData';
import { SeatManagementClient } from './SeatManagementClient';
import { type Seat } from './useSeatManagement';

export default function SeatManagementPage() {
  const seats = ADMIN_SEATS_MOCK_SEATS as Seat[];

  return <SeatManagementClient initialSeats={seats} />;
}
