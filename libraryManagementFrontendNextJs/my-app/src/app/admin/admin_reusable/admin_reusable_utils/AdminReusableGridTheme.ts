// RESPONSIBILITY: Provides the AG Grid theme parameters derived from CSS tokens and standard grid interfaces.
// DATA FLOW: CSS variables -> AdminReusableGridTheme -> AG Grid components

import { themeQuartz } from 'ag-grid-community';

const v = (name: string) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    : '';

export const gridTheme = themeQuartz.withParams({
  backgroundColor:       v('--ag-bg'),
  foregroundColor:       v('--ag-fg'),
  headerBackgroundColor: v('--ag-header-bg'),
  headerTextColor:       v('--ag-header-text'),
  borderColor:           v('--ag-border'),
  rowBorder:             true,
  oddRowBackgroundColor: v('--ag-odd-row-bg'),
  rowHoverColor:         v('--ag-row-hover'),
  fontFamily:            v('--ag-font'),
  fontSize:              13,
  wrapperBorder:         false,
  wrapperBorderRadius:   0,
});

export interface AdminGridCell<TValue = unknown, TData = unknown> {
  value: TValue;
  data?: TData;
}

export type AdminRecord = Record<string, unknown>;
