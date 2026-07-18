import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface ManagerSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}
export interface ManagerHeaderProps {
  collapsed: boolean;
  onMobileOpen: () => void;
}
export interface ManagerSearchableDropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  error?: string;
  statusCode?: number;
}
export type ManagerNavItem = { group: string } | { href: string; icon: LucideIcon; label: string };
