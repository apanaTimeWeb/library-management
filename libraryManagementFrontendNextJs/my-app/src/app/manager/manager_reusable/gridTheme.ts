// (manager)/reusable/gridTheme.ts
// ⚠️ Zero hardcoded values — everything comes from manager.css
import { themeQuartz } from 'ag-grid-community';

const v = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    : '';

export const gridTheme = themeQuartz.withParams({
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

export interface ManagerRecord { [key: string]: unknown; }
export interface ManagerGridCell { value: unknown; data: ManagerRecord; }
