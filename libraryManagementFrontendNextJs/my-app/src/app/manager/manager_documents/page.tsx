import { Suspense } from 'react';
// RESPONSIBILITY: Renders the Document Vault page (Server Component).
import { ManagerDocumentsClient } from '@/app/manager/manager_documents/ManagerDocumentsClient';

export default function DocumentVaultPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-secondary">Loading...</div>}>
      <ManagerDocumentsClient />
    </Suspense>
  );
}
