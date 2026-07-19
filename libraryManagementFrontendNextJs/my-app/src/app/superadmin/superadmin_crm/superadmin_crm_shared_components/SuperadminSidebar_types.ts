// RESPONSIBILITY: Defines shared TypeScript types for the Superadmin sidebar navigation structure.
// DATA FLOW: Consumed by SuperadminSidebar.tsx — no API calls here.

import type { LucideIcon } from 'lucide-react';

/** A single navigation link item in the sidebar */
export interface SuperadminNavItem {
  href: string;
  icon: LucideIcon;
  label: string;
}

/** A section divider / group header in the sidebar */
export interface SuperadminNavGroup {
  group: string;
}

/** Union type for sidebar NAV array entries */
export type SuperadminNavEntry = SuperadminNavItem | SuperadminNavGroup;