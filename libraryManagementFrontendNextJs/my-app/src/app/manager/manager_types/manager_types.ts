import { ReactNode } from 'react';

/**
 * Props for the ManagerSidebar component
 */
export interface ManagerSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

/**
 * Props for the ManagerHeader component
 */
export interface ManagerHeaderProps {
  sidebarWidth: number;
  onMobileOpen: () => void;
}

/**
 * Props for ManagerSearchableDropdown
 */
export interface ManagerSearchableDropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Standard Backend Response Envelope
 */
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
