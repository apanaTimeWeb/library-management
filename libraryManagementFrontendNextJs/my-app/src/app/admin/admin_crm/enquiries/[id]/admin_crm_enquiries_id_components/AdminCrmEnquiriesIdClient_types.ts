import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface MarkLostModalProps {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  isOpen: boolean;
}
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
