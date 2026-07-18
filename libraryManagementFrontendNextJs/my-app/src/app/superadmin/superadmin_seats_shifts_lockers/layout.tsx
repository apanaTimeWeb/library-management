import { SuperadminSeatsRoute } from '@/app/superadmin/superadmin_seats_shifts_lockers/superadmin_seats_shared_components/SuperadminSeatsRoute';

export default function SeatsShiftsLockersLayout({ children }: { children: React.ReactNode }) {
  return <SuperadminSeatsRoute>{children}</SuperadminSeatsRoute>;
}
