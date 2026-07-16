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
