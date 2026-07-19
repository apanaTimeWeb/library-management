'use client';

import { useEffect } from 'react';
import { PackageOpen, Plus, MapPin } from 'lucide-react';
import { useManagerAccountingStore } from '@/app/manager/manager_accounting/manager_accounting_store/manager_accounting_store';
import { ACCOUNTING_STATUS_COLORS } from '@/app/manager/manager_accounting/manager_accounting_constants/manager_accounting_constants';

export function ManagerAccountingAssetsClient() {
  const { assets, stats, status, error, fetchAssets } = useManagerAccountingStore();

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  if (status === 'error') {
    return <div className="p-8 text-danger bg-danger/10 rounded-lg m-6">Failed to load assets: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Accounting</p>
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2"><PackageOpen size={24} className="text-primary" /> Assets Inventory</h1>
          <p className="text-sm text-text-secondary mt-1.5">Track and manage physical infrastructure and appliances.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
          <Plus size={16} /> Add Asset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-text-secondary mb-1">Total Assets Value</h3>
          <div className="text-2xl font-bold text-text-primary">
            ₹{stats?.totalAssetsValue.toLocaleString() || '---'}
          </div>
          <p className="text-xs text-text-secondary mt-1">Based on original purchase value</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated border-b border-border">
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Asset ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Name & Category</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Purchase Date & Value</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Location</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase">Condition</th>
                <th className="px-6 py-3 text-xs font-semibold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {status === 'loading' ? (
                <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Loading assets...</td></tr>
              ) : assets.map((ast) => (
                <tr key={ast.id} className="hover:bg-page transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-text-secondary">{ast.assetId}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">{ast.name}</span>
                      <span className="text-xs text-text-secondary">{ast.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-text-secondary">{ast.purchaseDate}</span>
                      <span className="text-sm font-bold text-text-primary">₹{ast.purchaseValue.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary flex items-center gap-1.5 mt-2">
                    <MapPin size={14} className="text-text-secondary" /> {ast.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${ACCOUNTING_STATUS_COLORS[ast.condition]}`}>
                      {ast.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-primary hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
