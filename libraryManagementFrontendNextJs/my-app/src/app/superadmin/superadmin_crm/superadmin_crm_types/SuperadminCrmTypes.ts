// RESPONSIBILITY: Renders or handles logic for SuperadminCrmTypes.ts.


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

