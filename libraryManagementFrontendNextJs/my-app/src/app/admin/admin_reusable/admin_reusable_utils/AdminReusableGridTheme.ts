// RESPONSIBILITY: Provides the common grid types for the admin module.
// DATA FLOW: Types only

export interface AdminGridCell<TValue = unknown, TData = unknown> {
  value: TValue;
  data?: TData;
}
export type AdminRecord = Record<string, unknown>;
