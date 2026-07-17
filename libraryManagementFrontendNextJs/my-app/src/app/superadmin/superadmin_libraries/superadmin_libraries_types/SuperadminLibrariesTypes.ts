export interface SuperadminLibrary {
  id: string;
  name: string;
  location: string;
  seats: number;
  occupied: number;
  status: string;
  plan: string;
  owner: string;
  phone: string;
  joined: string;
}

export type SuperadminLibraryPanelMode = 'view' | 'edit';

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
