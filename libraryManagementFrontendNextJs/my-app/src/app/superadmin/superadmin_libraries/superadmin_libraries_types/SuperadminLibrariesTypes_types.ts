import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminLibrariesGridProps {
  libraries: SuperadminLibrary[];
  onRowClick: (lib: SuperadminLibrary, mode: SuperadminLibraryPanelMode) => void;
  onSuspend: (id: string) => void;
}
export interface SuperadminLibrariesPanelProps {
  lib: SuperadminLibrary;
  mode: SuperadminLibraryPanelMode;
  onClose: () => void;
  onSave: (updated: SuperadminLibrary) => Promise<void>;
  onSuspend: (id: string) => Promise<void>;
}
export interface SuperadminLibrariesErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}
export type SuperadminLibrary = z.infer<typeof superadminLibrarySchema>;
export type SuperadminLibraryPanelMode = 'view' | 'edit';
export type SuperadminLibrariesFetchState = 'idle' | 'loading' | 'success' | 'error';
