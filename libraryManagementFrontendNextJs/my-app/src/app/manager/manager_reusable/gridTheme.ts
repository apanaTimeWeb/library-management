// (manager)/reusable/gridTheme.ts
// ⚠️ Zero hardcoded values — everything comes from manager.css
import { themeQuartz } from 'ag-grid-community';

export const gridTheme = themeQuartz.withParams({
  backgroundColor:       'var(--bg-card)',
  foregroundColor:       'var(--text-primary)',
  headerBackgroundColor: 'var(--bg-page)',
  headerTextColor:       'var(--text-secondary)',
  borderColor:           'var(--border)',
  rowBorder:             true,
  oddRowBackgroundColor: 'var(--bg-page)',
  rowHoverColor:         'var(--primary-subtle, rgba(0,0,0,0.05))',
  fontFamily:            'Inter, sans-serif',
  fontSize:              13,
  wrapperBorder:         false,
  wrapperBorderRadius:   0,
});

export interface ManagerRecord { [key: string]: unknown; }
export interface ManagerGridCell { value: unknown; data: ManagerRecord; }
