import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface UseSuperadminAssetsAddDialogProps {
  categories: string[];
  onSave: (data: Omit<SuperadminAsset, 'id' | 'status'>) => Promise<void>;
  onClose: () => void;
}
export type SuperadminAssetFormData = z.infer<typeof superadminAssetSchema>;
