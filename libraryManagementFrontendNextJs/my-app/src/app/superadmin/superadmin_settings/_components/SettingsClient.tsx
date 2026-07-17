// RESPONSIBILITY: Renders the SettingsClient component.
'use client';

import { useState } from 'react';
import { Save, ShieldCheck, Mail, Building, CheckCircle } from 'lucide-react';
import { SUPERADMIN_SETTINGS_MOCK_NOTIF_ITEMS } from '@/app/superadmin/superadmin_settings/superadmin_settings_constants/SuperadminSettingsConstants';



export function SettingsClient() {
  const [saved, setSaved] = useState(false);
  const [platform, setPlatform] = useState({ name: 'Smart Library 360', email: 'support@library360.com', phone: '+91 9988776655' });
  const [security, setSecurity] = useState({ maxAttempts: 5, autoLogout: 30 });
  const [checks, setChecks] = useState<Record<string, boolean>>(
    Object.fromEntries(SUPERADMIN_SETTINGS_MOCK_NOTIF_ITEMS.map(( n: FlexRecord ) => [n.id, n.default]))
  );

  const handleSave = () => {

import { useState } from 'react';
import { Save, ShieldCheck, Mail, Building, CheckCircle } from 'lucide-react';
import { SUPERADMIN_SETTINGS_MOCK_NOTIF_ITEMS } from '@/app/superadmin/superadmin_settings/superadmin_settings_constants/SuperadminSettingsConstants';



export function SettingsClient() {
  const [saved, setSaved] = useState(false);
  const [platform, setPlatform] = useState({ name: 'Smart Library 360', email: 'support@library360.com', phone: '+91 9988776655' });
  const [security, setSecurity] = useState({ maxAttempts: 5, autoLogout: 30 });
  const [checks, setChecks] = useState<Record<string, boolean>>(
    Object.fromEntries(SUPERADMIN_SETTINGS_MOCK_NOTIF_ITEMS.map(( n: FlexRecord ) => [n.id, n.default]))
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      {saved && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium z-50 animate-in slide-in-from-bottom-5 bg-success-bg text-success border border-success/20">
          <CheckCircle size={16} /> Settings saved successfully!
        </div>
      )}

      <div className="flex flex-col gap-1 mb-8">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-text-secondary">
          <span>Nexus 360</span><span>/</span><span>Super Admin</span><span>/</span><span>Settings</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Global Security & Base Config</h1>
          <button className="h-9 px-4 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-hover transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50" onClick={handleSave}>
            {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">

          {/* Platform Identity */}
          <div className="bg-bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
            <h2 className="text-base font-bold text-primary mb-5 flex items-center gap-2">
              <Building size={15} className="text-primary" /> Platform Identity
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Platform Name</label>
                <input type="text" className="w-full h-9 px-3 bg-bg-input border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" value={platform.name}
                  onChange={e => setPlatform(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Support Email</label>
                  <input type="text" className="w-full h-9 px-3 bg-bg-input border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" value={platform.email}
                    onChange={e => setPlatform(p => ({ ...p, email: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Contact Phone</label>
                  <input type="text" className="w-full h-9 px-3 bg-bg-input border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" value={platform.phone}
                    onChange={e => setPlatform(p => ({ ...p, phone: e.target.value }))} />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
            <h2 className="text-base font-bold text-primary mb-5 flex items-center gap-2">
              <Mail size={15} className="text-success" /> SaaS Auto-Notifications
            </h2>
            <div className="space-y-4">
              {SUPERADMIN_SETTINGS_MOCK_NOTIF_ITEMS.map((item: FlexRecord) => (
                <div key={item.id} className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setChecks(c => ({ ...c, [item.id]: !c[item.id] }))}>
                  <div className={`w-10 h-[22px] rounded-full relative transition-colors duration-200 ease-in-out ${checks[item.id] ? 'bg-success' : 'bg-border'}`}>
                    <div className={`absolute top-[1px] left-[1px] w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${checks[item.id] ? 'translate-x-[18px]' : ''}`} />
                  </div>
                  <span className="text-sm text-text-primary select-none">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Security */}
          <div className="bg-bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
            <h2 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <ShieldCheck size={15} className="text-warning" /> Security Defaults
            </h2>
            <p className="text-sm text-secondary mb-4 leading-relaxed">
              These settings enforce strict security policies across all newly provisioned library branches automatically.
            </p>
            <div className="space-y-4 pt-4 border-t border-border">
              <div>
                <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Max Login Attempts</label>
                <input type="number" className="w-full h-9 px-3 bg-bg-input border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" min={1} max={10}
                  value={security.maxAttempts}
                  onChange={e => setSecurity(s => ({ ...s, maxAttempts: +e.target.value }))} />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-text-secondary mb-1.5">Staff Auto-Logout (Mins)</label>
                <input type="number" className="w-full h-9 px-3 bg-bg-input border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" min={5} max={120}
                  value={security.autoLogout}
                  onChange={e => setSecurity(s => ({ ...s, autoLogout: +e.target.value }))} />
              </div>
            </div>
          </div>

          <div className="bg-info-bg border border-info/20 text-info rounded-xl p-4 text-sm leading-relaxed">
            💡 Changes apply to all <strong>newly provisioned</strong> branches. Existing branches retain their current settings until manually updated.
          </div>
        </div>
      </div>
    </>
  );
}
