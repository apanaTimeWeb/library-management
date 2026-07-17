import { z } from 'zod';

export const superadminLibrarySchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Location is required'),
  seats: z.number().min(1, 'Must have at least 1 seat'),
  occupied: z.number().min(0),
  status: z.enum(['Active', 'Maintenance']),
  plan: z.enum(['Basic', 'Pro', 'Enterprise']),
  owner: z.string().min(2, 'Owner name is required'),
  phone: z.string().min(10, 'Valid phone required'),
  joined: z.string()
});

export type SuperadminLibrary = z.infer<typeof superadminLibrarySchema>;

export type SuperadminLibraryPanelMode = 'view' | 'edit';

export type SuperadminLibrariesFetchState = 'idle' | 'loading' | 'success' | 'error';

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
