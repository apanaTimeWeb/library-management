// RESPONSIBILITY: Provides the AG Grid theme parameters derived from CSS tokens and standard grid interfaces.
// DATA FLOW: CSS variables -> AdminReusableGridTheme -> AG Grid components

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

export interface AdminGridCell<TValue = unknown, TData = unknown> {
  value: TValue;
  data?: TData;
}

export type AdminRecord = Record<string, unknown>;

