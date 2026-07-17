// RESPONSIBILITY: Renders the SuperadminSwitch component.
'use client';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/superadmin_utils';
import { SuperadminSwitchProps } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemSharedComponentsTypes';

export function SuperadminSwitch({ checked, onCheckedChange, disabled = false, id, className }: SuperadminSwitchProps & { id?: string, className?: string }) {
  return (
    <SwitchPrimitive.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={cn('sys-switch', className)}
    >
      <SwitchPrimitive.Thumb className="sys-switch-thumb" />
    </SwitchPrimitive.Root>
  );
}
