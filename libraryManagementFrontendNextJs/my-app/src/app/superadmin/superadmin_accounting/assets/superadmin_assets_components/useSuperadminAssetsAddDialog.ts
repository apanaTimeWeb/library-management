/**
 * RESPONSIBILITY: Logic and form validation for the SuperadminAssetsAddDialog component.
 * DATA FLOW: Form Interaction -> useSuperadminAssetsAddDialog (validation/state) -> onSave API
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { logger } from '@/lib/logger';
import type { SuperadminAsset } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_types/SuperadminAssetsTypes';
import { UseSuperadminAssetsAddDialogProps, SuperadminAssetFormData } from "./useSuperadminAssetsAddDialog_types";

export const superadminAssetSchema = z.object({
  name: z.string().min(1, 'Asset name is required'),
  category: z.string().min(1, 'Category is required'),
  purchaseDate: z.string().min(1, 'Purchase date is required'),
  purchaseValue: z.number().positive('Value must be positive'),
  location: z.string().min(1, 'Location is required'),
});

export function useSuperadminAssetsAddDialog({ categories, onSave, onClose }: UseSuperadminAssetsAddDialogProps) {
  const [saving, setSaving] = useState(false);

  const form = useForm<SuperadminAssetFormData>({
    resolver: zodResolver(superadminAssetSchema),
    defaultValues: {
      name: '',
      category: categories[0] || 'Furniture',
      purchaseDate: '',
      purchaseValue: undefined,
      location: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: SuperadminAssetFormData) => {
    setSaving(true);
    try {
    // @ts-ignore
      await onSave({
        name: data.name,
        category: data.category,
        purchaseDate: data.purchaseDate,
        purchaseValue: data.purchaseValue,
        location: data.location,
      });
      onClose();
    } catch (err) {
      logger.error('Failed to save asset registration', err);
    } finally {
      setSaving(false);
    }
  };

  const allCategories = Array.from(new Set([...categories, 'Other']));

  return {
    form,
    saving,
    onSubmit: form.handleSubmit(onSubmit),
    allCategories,
  };
}
