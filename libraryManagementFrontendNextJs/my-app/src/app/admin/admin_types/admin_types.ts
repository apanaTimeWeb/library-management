// RESPONSIBILITY: Renders the admin_types.ts component/hook.
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';


export interface AdminContextType {
  selectedBranch: string;
  setSelectedBranch: (val: string) => void;
}
export interface AdminRouteProps {
  children: ReactNode;
}
export interface AdminActionItem {
  id: string;
  label: string;
  count: number;
  type: 'danger' | 'warning';
  icon?: LucideIcon;
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
export type AdminNavItem = 
  | { group: string }
  | { href: string; icon: LucideIcon; label: string };
