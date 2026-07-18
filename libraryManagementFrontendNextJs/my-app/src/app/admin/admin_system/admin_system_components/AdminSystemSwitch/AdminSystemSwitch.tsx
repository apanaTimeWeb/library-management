// RESPONSIBILITY: Renders the Switch component for the admin_system module.
'use client';
// DATA FLOW: Parent -> AdminSystemSwitch -> DOM

import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/app/admin/admin_system/admin_system_components/AdminSystemutils/AdminSystemutils';
import { SwitchProps } from "./AdminSystemSwitch_types";

export function Switch({ checked, onCheckedChange, disabled, id, className }: SwitchProps) {
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

