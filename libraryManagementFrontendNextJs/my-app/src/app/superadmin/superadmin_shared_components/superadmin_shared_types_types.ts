import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminHeaderProps {
  sidebarWidth: number;
  onMobileOpen: () => void;
}
export interface SuperadminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}
export interface SuperadminSearchableDropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}
