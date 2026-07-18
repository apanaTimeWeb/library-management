import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface ManagerDocumentsState {
  documents: DocumentRecord[];
  documentsStatus: FetchState;
  documentsError: string | null;

  fetchDocuments: () => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
}
