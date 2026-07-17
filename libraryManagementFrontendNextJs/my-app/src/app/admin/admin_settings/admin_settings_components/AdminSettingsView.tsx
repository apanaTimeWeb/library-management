'use client';

import { Save, CheckCircle, Settings } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useAdminSettings, type SettingsState } from '@/app/admin/admin_settings/admin_settings_hooks/useAdminSettings';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
            fontSize: 13,
          },
        }}
      />
      <div className="h-full flex flex-col pb-10 space-y-6 relative max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4">
          <div>
            <nav className="text-xs text-muted-foreground font-medium mb-1 tracking-wide uppercase">Smart Library 360 › Admin › Settings</nav>
            <h1 className="text-2xl font-bold tracking-tight">Global Settings</h1>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p className="text-sm text-muted-foreground mt-1">Configure your library's core identity, billing info, and preferences.</p>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={loading}
            className="gap-2 w-full md:w-auto font-bold"
          >
            <Save size={16} />
            {loading ? 'Saving…' : 'Save Settings'}
          </Button>
        </div>

        {/* 2-col grid of cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Library Identity Card */}
          <Card className="p-6 shadow-sm border-border bg-card flex flex-col gap-6">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-3 text-primary">
              <Settings size={18} className="text-primary" /> Library Identity
            </h2>
            
            <div className="flex flex-col gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary" htmlFor="libraryName">Library Name</label>
                <Input id="libraryName" name="libraryName" value={form.libraryName} onChange={handleChange} className="h-10" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary" htmlFor="address">Full Address (For Invoices)</label>
                <Textarea id="address" name="address" value={form.address} onChange={handleChange} rows={3} className="resize-none min-h-20" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary" htmlFor="contactEmail">Contact Email</label>
                  <Input id="contactEmail" name="contactEmail" value={form.contactEmail} onChange={handleChange} type="email" className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary" htmlFor="contactPhone">Contact Phone</label>
                  <Input id="contactPhone" name="contactPhone" value={form.contactPhone} onChange={handleChange} className="h-10" />
                </div>
              </div>
            </div>
          </Card>

          {/* Billing & Receipts Card */}
          <Card className="p-6 shadow-sm border-border bg-card flex flex-col gap-6">
            <h2 className="text-lg font-bold flex items-center gap-2 border-b pb-3 text-primary">
              <CheckCircle size={18} className="text-success" /> Billing & Invoicing
            </h2>
            
            <div className="flex flex-col gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary" htmlFor="gstin">GSTIN / Tax ID</label>
                <Input id="gstin" name="gstin" value={form.gstin} onChange={handleChange} className="h-10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary" htmlFor="receiptPrefix">Receipt Prefix</label>
                  <Input id="receiptPrefix" name="receiptPrefix" value={form.receiptPrefix} onChange={handleChange} placeholder="e.g. REC-" className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary" htmlFor="taxPercentage">Default Tax (%)</label>
                  <Input id="taxPercentage" name="taxPercentage" value={form.taxPercentage} onChange={handleChange} type="number" className="h-10" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-primary" htmlFor="termsAndConditions">Terms & Conditions (Printed on Receipt)</label>
                <Textarea id="termsAndConditions" name="termsAndConditions" value={form.termsAndConditions} onChange={handleChange} rows={4} className="resize-none min-h-28" />
              </div>
            </div>
          </Card>

        </div>
      </div>
    </>
  );
}
