// RESPONSIBILITY: Renders the SuperadminAssetsTable component.
import React from 'react';
import { PackageOpen } from 'lucide-react';
import type { SuperadminAsset } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_types/SuperadminAssetsTypes';
import { SUPERADMIN_ASSETS_STATUS_STYLES } from '@/app/superadmin/superadmin_accounting/assets/superadmin_assets_constants/SuperadminAssetsConstants';

interface Props {
  assets: SuperadminAsset[];
}

export function SuperadminAssetsTable({ assets }: Props) {
  if (assets.length === 0) {
    return (
      <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] shadow-sm flex flex-col items-center justify-center py-20 text-center">
        <PackageOpen size={48} className="text-text-disabled mb-4 opacity-50" />
        <p className="text-lg font-bold text-text-primary mb-1">No assets found.</p>
      </div>
    );
  }

  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] shadow-sm overflow-hidden overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-bg-page/50 border-b border-border">
            <th className="py-3.5 px-4 text-[11px] font-bold text-text-disabled uppercase tracking-wider">Asset Name</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-text-disabled uppercase tracking-wider">Category</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-text-disabled uppercase tracking-wider">Purchase Date</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-text-disabled uppercase tracking-wider text-right">Purchase Value ₹</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-text-disabled uppercase tracking-wider text-right">Current Value ₹</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-text-disabled uppercase tracking-wider">Location</th>
            <th className="py-3.5 px-4 text-[11px] font-bold text-text-disabled uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {assets.map(a => (
            <tr key={a.id} className={`hover:bg-bg-page/30 transition-colors ${a.status === 'disposed' ? 'opacity-50 grayscale' : ''}`}>
              <td className="py-3.5 px-4 text-sm font-extrabold text-text-primary">{a.name}</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-bg-input border border-border text-text-secondary">
                  {a.category}
                </span>
              </td>
              <td className="py-3.5 px-4 text-sm font-medium text-text-secondary">{a.purchaseDate}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-text-secondary text-right">₹{a.purchaseValue.toLocaleString()}</td>
              <td className="py-3.5 px-4 text-[15px] font-extrabold text-text-primary tracking-tight text-right">₹{a.currentValue.toLocaleString()}</td>
              <td className="py-3.5 px-4 text-sm font-medium text-text-secondary">{a.location}</td>
              <td className="py-3.5 px-4">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-transparent shadow-sm ${SUPERADMIN_ASSETS_STATUS_STYLES[a.status] || SUPERADMIN_ASSETS_STATUS_STYLES.disposed}`}>
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
