// RESPONSIBILITY: Provides the AG Grid theme parameters derived from CSS tokens and standard grid interfaces.
// DATA FLOW: CSS variables -> AdminReusableGridTheme -> AG Grid components

import { themeQuartz } from 'ag-grid-community';


export interface AdminGridCell<TValue = unknown, TData = unknown> {
  value: TValue;
  data?: TData;
}
export type AdminRecord = Record<string, unknown>;

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
