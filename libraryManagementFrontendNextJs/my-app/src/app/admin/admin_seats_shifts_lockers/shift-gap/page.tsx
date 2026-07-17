// RESPONSIBILITY: Entry page for the admin_seats_shifts_lockers shift-gap module.
// DATA FLOW: Next.js Router -> Page -> Components

import { ShiftGapAnalyzerClient } from './admin_seats_shifts_lockers_components/ShiftGapAnalyzerClient';

export default function ShiftGapAnalyzerPage() {
  return <ShiftGapAnalyzerClient />;
}
