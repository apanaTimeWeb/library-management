

export interface DocumentRecord {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  date: string;
  category: string;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
