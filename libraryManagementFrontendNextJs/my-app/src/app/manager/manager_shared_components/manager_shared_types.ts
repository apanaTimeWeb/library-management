export interface ManagerSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export interface ManagerHeaderProps {
  sidebarWidth: number;
  onMobileOpen: () => void;
}

export interface ManagerSearchableDropdownProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}
