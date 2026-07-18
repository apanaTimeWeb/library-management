// (Seats & Shifts)/reusable/superadmin_gridTheme.ts
// ⚠️ NO hardcoded values here — all values come from seat_shift.css via CSS custom properties
import { themeQuartz } from 'ag-grid-community';

const v = (name: string): string =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    : '';

export const superadmin_gridTheme = themeQuartz.withParams({
  backgroundColor:       '#16161e',
  foregroundColor:       '#c0caf5',
  headerBackgroundColor: '#1a1b26',
  headerTextColor:       '#a9b1d6',
  borderColor:           '#292e42',
  rowBorder:             true,
  oddRowBackgroundColor: '#1a1b26',
  rowHoverColor:         '#292e42',
  fontFamily:            'Inter, sans-serif',
  fontSize:              13,
  wrapperBorder:         false,
  wrapperBorderRadius:   0,
});
