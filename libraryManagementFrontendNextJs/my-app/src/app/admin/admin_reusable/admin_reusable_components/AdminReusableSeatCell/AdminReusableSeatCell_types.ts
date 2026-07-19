// RESPONSIBILITY: Renders or handles logic for AdminReusableSeatCell_types.ts.
import React from "react";
export interface AdminReusableSeatCellProps {
  id: string;
  status: 'free' | 'occupied' | 'expiring' | 'maintenance';
  occupant?: string;
  shift?: string;
  expiry?: string;
  onClick?: () => void;
}

