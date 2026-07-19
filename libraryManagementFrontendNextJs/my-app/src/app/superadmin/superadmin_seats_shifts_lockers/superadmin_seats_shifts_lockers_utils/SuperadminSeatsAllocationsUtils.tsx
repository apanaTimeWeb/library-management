import React from 'react';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';

export const getSuperadminSeatsAllocationsStatusVariant = (status: string): "default" | "success" | "warning" | "danger" => {
  switch (status) {
    case 'Active': return 'success';
    case 'Expired': return 'danger';
    case 'Suspended': return 'warning';
    default: return 'default';
  }
};

export const renderSuperadminSeatsAllocationsDaysLeftBadge = (days: number) => {
  if (days < 0) return <SuperadminBadge variant="danger">{Math.abs(days)}d ago</SuperadminBadge>;
  if (days <= 7) return <SuperadminBadge variant="danger">{days}d left</SuperadminBadge>;
  if (days <= 15) return <SuperadminBadge variant="warning">{days}d left</SuperadminBadge>;
  return <SuperadminBadge variant="success">{days}d left</SuperadminBadge>;
};
