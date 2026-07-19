'use client';
// RESPONSIBILITY: Renders the SuperadminSystemSettingsClient component.
import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminInput } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminInput';
import { SuperadminLabel } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminLabel';
import { SuperadminSwitch } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminSwitch';
import { Settings, Upload, Eye, EyeOff, Save, ChevronRight } from 'lucide-react';
import { useSuperadminSystemSettings } from '@/app/superadmin/superadmin_system/superadmin_system_settings_hooks/useSuperadminSystemSettings';
import { SUPERADMIN_SYSTEM_SETTINGS_CATEGORIES } from '@/app/superadmin/superadmin_system/superadmin_system_constants/SuperadminSystemSettingsConstants';

export function SuperadminSystemSettingsClient() {
  const { active, setActive, showApiKey, setShowApiKey, saved, form, setForm, handleSave } = useSuperadminSystemSettings();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-medium tracking-wide mb-1">
          <span>System</span>
          <ChevronRight size={12} />
          <span>Settings</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
          <Settings size={28} className="text-primary" />
          Settings
        </h1>
        <p className="text-text-secondary mt-1 text-sm">Manage your library configuration and preferences.</p>
      </div>

      <div className="flex gap-6">
        {/* Left sidebar nav */}
        <aside className="w-52 shrink-0">
          <nav className="flex flex-col gap-1">
            {SUPERADMIN_SYSTEM_SETTINGS_CATEGORIES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`settings-nav-${id}`}
                onClick={() => setActive(id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-150 text-left ${
                  active === id
                    ? 'bg-primary/15 text-primary border border-primary/20'
                    : 'text-text-secondary hover:bg-card hover:text-text-primary'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right panel */}
        <div className="flex-1">
          {active === 'branding' && (
            <SuperadminCard>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>Customize how your library appears to users.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <SuperadminLabel htmlFor="logo-upload">Logo</SuperadminLabel>
                  <div
                    id="logo-upload"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:bg-card transition-colors group"
                  >
                    <Upload size={24} className="text-text-secondary group-hover:text-primary transition-colors mb-2" />
                    <span className="text-sm text-text-secondary">Drop logo here or <span className="text-primary">browse</span></span>
                    <span className="text-xs text-text-secondary/60 mt-1">PNG, JPG up to 2MB</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <SuperadminLabel htmlFor="app-name">App Name</SuperadminLabel>
                  <SuperadminInput id="app-name" value={form.appName} onChange={e => setForm(f => ({ ...f, appName: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <SuperadminLabel htmlFor="primary-color">Primary Color</SuperadminLabel>
                    <div className="flex items-center gap-2">
                      <input type="color" id="primary-color" value={form.primaryColor} onChange={e => setForm(f => ({ ...f, primaryColor: e.target.value }))} className="h-10 w-12 rounded-lg border border-border bg-transparent cursor-pointer" />
                      <SuperadminInput value={form.primaryColor} onChange={e => setForm(f => ({ ...f, primaryColor: e.target.value }))} className="font-mono text-xs" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <SuperadminLabel htmlFor="secondary-color">Secondary Color</SuperadminLabel>
                    <div className="flex items-center gap-2">
                      <input type="color" id="secondary-color" value={form.secondaryColor} onChange={e => setForm(f => ({ ...f, secondaryColor: e.target.value }))} className="h-10 w-12 rounded-lg border border-border bg-transparent cursor-pointer" />
                      <SuperadminInput value={form.secondaryColor} onChange={e => setForm(f => ({ ...f, secondaryColor: e.target.value }))} className="font-mono text-xs" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <SuperadminButton id="save-branding-btn" onClick={handleSave} variant="primary">
                  <Save size={16} className="mr-1" /> {saved ? 'Saved!' : 'Save Settings'}
                </SuperadminButton>
              </CardFooter>
            </SuperadminCard>
          )}

          {active === 'late-fee' && (
            <SuperadminCard>
              <CardHeader>
                <CardTitle>Late Fee Rules</CardTitle>
                <CardDescription>Define penalty rules for overdue payments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Enable Late Fees</p>
                    <p className="text-xs text-text-secondary">Automatically apply penalties after due date</p>
                  </div>
                  <SuperadminSwitch id="enable-late-fees" checked={form.enableLateFees} onCheckedChange={v => setForm(f => ({ ...f, enableLateFees: v }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <SuperadminLabel htmlFor="grace-period">Grace Period</SuperadminLabel>
                    <div className="flex items-center gap-2">
                      <SuperadminInput id="grace-period" type="number" value={form.gracePeriod} onChange={e => setForm(f => ({ ...f, gracePeriod: +e.target.value }))} />
                      <span className="text-sm text-text-secondary whitespace-nowrap">days</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <SuperadminLabel htmlFor="penalty-per-day">Penalty Per Day</SuperadminLabel>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-secondary">â‚¹</span>
                      <SuperadminInput id="penalty-per-day" type="number" value={form.penaltyPerDay} onChange={e => setForm(f => ({ ...f, penaltyPerDay: +e.target.value }))} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <SuperadminButton id="save-latefee-btn" onClick={handleSave} variant="primary">
                  <Save size={16} className="mr-1" /> {saved ? 'Saved!' : 'Save Settings'}
                </SuperadminButton>
              </CardFooter>
            </SuperadminCard>
          )}

          {active === 'auto-suspend' && (
            <SuperadminCard>
              <CardHeader>
                <CardTitle>Auto-Suspend Rules</CardTitle>
                <CardDescription>Configure automatic seat suspension for defaulters.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Enable Auto-Suspend</p>
                    <p className="text-xs text-text-secondary">Suspend seats after payment overdue</p>
                  </div>
                  <SuperadminSwitch id="enable-auto-suspend" checked={form.enableAutoSuspend} onCheckedChange={v => setForm(f => ({ ...f, enableAutoSuspend: v }))} />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Auto-Restore on Payment</p>
                    <p className="text-xs text-text-secondary">Automatically restore when payment is received</p>
                  </div>
                  <SuperadminSwitch id="enable-auto-restore" checked={form.enableAutoRestore} onCheckedChange={v => setForm(f => ({ ...f, enableAutoRestore: v }))} />
                </div>
                <div className="space-y-2">
                  <SuperadminLabel htmlFor="days-before-suspend">Days Before Suspend</SuperadminLabel>
                  <div className="flex items-center gap-2">
                    <SuperadminInput id="days-before-suspend" type="number" value={form.daysBefore} onChange={e => setForm(f => ({ ...f, daysBefore: +e.target.value }))} className="max-w-32" />
                    <span className="text-sm text-text-secondary">days after due date</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <SuperadminButton id="save-autosuspend-btn" onClick={handleSave} variant="primary">
                  <Save size={16} className="mr-1" /> {saved ? 'Saved!' : 'Save Settings'}
                </SuperadminButton>
              </CardFooter>
            </SuperadminCard>
          )}

          {active === 'upi' && (
            <SuperadminCard>
              <CardHeader>
                <CardTitle>UPI / Payment</CardTitle>
                <CardDescription>Configure payment methods accepted at your library.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <SuperadminLabel htmlFor="upi-qr">UPI QR Code</SuperadminLabel>
                  <div id="upi-qr" className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:bg-card transition-colors">
                    <Upload size={24} className="text-text-secondary mb-2" />
                    <span className="text-sm text-text-secondary">Upload QR Code image</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <SuperadminLabel htmlFor="upi-id">UPI ID</SuperadminLabel>
                  <SuperadminInput id="upi-id" placeholder="owner@upi" value={form.upiId} onChange={e => setForm(f => ({ ...f, upiId: e.target.value }))} />
                </div>
                <div className="space-y-3">
                  <SuperadminLabel>Accepted Payment Modes</SuperadminLabel>
                  {[
                    { key: 'acceptCash', label: 'ðŸ’µ Cash' },
                    { key: 'acceptUpi', label: 'ðŸ“± UPI' },
                    { key: 'acceptCard', label: 'ðŸ’³ Card' },
                    { key: 'acceptBank', label: 'ðŸ¦ Bank Transfer' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        id={`payment-${key}`}
                        checked={form[key as keyof typeof form] as boolean}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                        className="h-4 w-4 rounded border-border bg-card accent-primary"
                      />
                      <span className="text-sm text-text-primary">{label}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <SuperadminButton id="save-upi-btn" onClick={handleSave} variant="primary">
                  <Save size={16} className="mr-1" /> {saved ? 'Saved!' : 'Save Settings'}
                </SuperadminButton>
              </CardFooter>
            </SuperadminCard>
          )}

          {active === 'notifications' && (
            <SuperadminCard>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure SMS / WhatsApp API for automated alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <SuperadminLabel htmlFor="api-key">SMS / WhatsApp API Key</SuperadminLabel>
                  <div className="relative">
                    <SuperadminInput
                      id="api-key"
                      type={showApiKey ? 'text' : 'password'}
                      value={form.apiKey}
                      onChange={e => setForm(f => ({ ...f, apiKey: e.target.value }))}
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <SuperadminButton id="test-connection-btn" variant="ghost">ðŸ”Œ Test Connection</SuperadminButton>
              </CardContent>
              <CardFooter>
                <SuperadminButton id="save-notifications-btn" onClick={handleSave} variant="primary">
                  <Save size={16} className="mr-1" /> {saved ? 'Saved!' : 'Save Settings'}
                </SuperadminButton>
              </CardFooter>
            </SuperadminCard>
          )}

          {active === 'general' && (
            <SuperadminCard>
              <CardHeader>
                <CardTitle>General</CardTitle>
                <CardDescription>Basic library configuration.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <SuperadminLabel htmlFor="library-name">Library Name</SuperadminLabel>
                  <SuperadminInput id="library-name" defaultValue="Smart Library 360" />
                </div>
                <div className="space-y-2">
                  <SuperadminLabel htmlFor="library-timezone">Timezone</SuperadminLabel>
                  <SuperadminInput id="library-timezone" defaultValue="Asia/Kolkata (IST)" />
                </div>
                <div className="space-y-2">
                  <SuperadminLabel htmlFor="library-currency">Currency</SuperadminLabel>
                  <SuperadminInput id="library-currency" defaultValue="INR (â‚¹)" />
                </div>
              </CardContent>
              <CardFooter>
                <SuperadminButton id="save-general-btn" onClick={handleSave} variant="primary">
                  <Save size={16} className="mr-1" /> {saved ? 'Saved!' : 'Save Settings'}
                </SuperadminButton>
              </CardFooter>
            </SuperadminCard>
          )}
        </div>
      </div>
    </div>
  );
}
