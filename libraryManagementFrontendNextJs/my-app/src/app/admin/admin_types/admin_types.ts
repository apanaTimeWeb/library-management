import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

/**
 * Navigation Item for Admin Sidebar
 */
export type AdminNavItem = 
  | { group: string }
  | { href: string; icon: LucideIcon; label: string };

/**
 * Admin Context State
 */
export interface AdminContextType {
  selectedBranch: string;
  setSelectedBranch: (val: string) => void;
}

/**
 * Props for the AdminRoute wrapper
 */
export interface AdminRouteProps {
  children: ReactNode;
}

/**
 * Action Item from the dashboard
 */
export interface AdminActionItem {
  id: string;
  label: string;
  count: number;
  type: 'danger' | 'warning';
  icon?: LucideIcon;
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
