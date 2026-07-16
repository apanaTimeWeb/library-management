'use client';

import { Save, CheckCircle, Settings } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useAdminSettings, type SettingsState } from '@/app/admin/admin_settings/admin_settings_hooks/useAdminSettings';

interface AdminSettingsViewProps {
  initialSettings: SettingsState;
}

export function AdminSettingsView({ initialSettings }: AdminSettingsViewProps) {
  const { loading, form, handleChange, handleSave } = useAdminSettings(initialSettings);

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            fontSize: 13,
          },
        }}
      />
      <div style={{ maxWidth: 1000, paddingBottom: 40 }}>
        {/* Page Header */}
        <div className="admin-page-header" style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 24 }}>
          <div>
            <p className="admin-breadcrumb">Smart Library 360 › Admin › Settings</p>
            <h1 className="admin-page-title">Global Settings</h1>
            <p className="admin-page-subtitle">Configure your library's core identity, billing info, and preferences.</p>
          </div>
          <div className="admin-page-actions">
            <button className="admin-btn-primary" onClick={handleSave} disabled={loading}>
              <Save size={16} />
              {loading ? 'Saving…' : 'Save Settings'}
            </button>
          </div>
        </div>

        {/* 2-col grid of cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Library Identity Card */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Settings size={17} style={{ color: 'var(--primary)' }} />
                Library Identity
              </h2>
            </div>
            <div className="admin-card-body admin-flex-col admin-gap-16">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="admin-label" htmlFor="libraryName">Library Name</label>
                <input className="admin-input" id="libraryName" name="libraryName" value={form.libraryName} onChange={handleChange} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="admin-label" htmlFor="address">Full Address (For Invoices)</label>
                <textarea className="admin-textarea" id="address" name="address" value={form.address} onChange={handleChange} rows={3} style={{ resize: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="admin-label" htmlFor="contactEmail">Contact Email</label>
                  <input className="admin-input" id="contactEmail" name="contactEmail" value={form.contactEmail} onChange={handleChange} type="email" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="admin-label" htmlFor="contactPhone">Contact Phone</label>
                  <input className="admin-input" id="contactPhone" name="contactPhone" value={form.contactPhone} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          {/* Billing & Receipts Card */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={17} style={{ color: 'var(--success)' }} />
                Billing &amp; Invoicing
              </h2>
            </div>
            <div className="admin-card-body admin-flex-col admin-gap-16">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="admin-label" htmlFor="gstin">GSTIN / Tax ID</label>
                <input className="admin-input" id="gstin" name="gstin" value={form.gstin} onChange={handleChange} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="admin-label" htmlFor="receiptPrefix">Receipt Prefix</label>
                  <input className="admin-input" id="receiptPrefix" name="receiptPrefix" value={form.receiptPrefix} onChange={handleChange} placeholder="e.g. REC-" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label className="admin-label" htmlFor="taxPercentage">Default Tax (%)</label>
                  <input className="admin-input" id="taxPercentage" name="taxPercentage" value={form.taxPercentage} onChange={handleChange} type="number" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label className="admin-label" htmlFor="termsAndConditions">Terms &amp; Conditions (Printed on Receipt)</label>
                <textarea className="admin-textarea" id="termsAndConditions" name="termsAndConditions" value={form.termsAndConditions} onChange={handleChange} rows={4} style={{ resize: 'none' }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

