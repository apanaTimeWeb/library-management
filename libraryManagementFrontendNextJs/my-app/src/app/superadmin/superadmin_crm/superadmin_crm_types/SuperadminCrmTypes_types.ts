import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminCrmSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}
export interface SuperadminCrmHeaderProps {
  onMenuClick?: () => void;
}
export interface SuperadminCrmMarkLostModalProps {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}
