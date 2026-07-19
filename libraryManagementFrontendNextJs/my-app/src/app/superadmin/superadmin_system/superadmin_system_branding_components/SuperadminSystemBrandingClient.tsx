'use client';
// RESPONSIBILITY: Renders the SuperadminSystemBrandingClient component.
import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminInput } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminInput';
import { SuperadminLabel } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminLabel';
import { Palette, ChevronRight, Upload, RotateCcw, Save } from 'lucide-react';
import { useSuperadminSystemBranding } from '@/app/superadmin/superadmin_system/superadmin_system_branding_hooks/useSuperadminSystemBranding';

export function SuperadminSystemBrandingClient() {
  const { form, setForm, containerRef, handleReset } = useSuperadminSystemBranding();

  return (
    <div className="relative p-2 sm:p-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-bold tracking-wide mb-2">
          <span>System</span><ChevronRight size={12} /><span>Branding</span>
        </div>
        <h1 className="text-3xl font-extrabold text-text-primary flex items-center gap-3 tracking-tight">
          <Palette size={28} className="text-primary" />
          Branding & White-Label
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          Customize your library's visual identity. Changes reflect across the entire app.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left — Settings Form */}
        <div className="lg:col-span-2 space-y-4">
          <SuperadminCard>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>Configure logo, name, colors, and tagline.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <SuperadminLabel>Library Logo</SuperadminLabel>
                <div
                  id="branding-logo-upload"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:bg-input transition-colors"
                >
                  <div className="h-16 w-16 rounded-md flex items-center justify-center text-text-primary text-xl font-bold mb-2 bg-card border border-border shadow-sm">
                    ðŸ“š
                  </div>
                  <button type="button" className="text-xs text-primary font-bold flex items-center gap-1 cursor-pointer">
                    <Upload size={12} /> Upload Logo (200Ã—200px)
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <SuperadminLabel htmlFor="branding-name">Library Name</SuperadminLabel>
                <SuperadminInput id="branding-name" value={form.libraryName}
                  onChange={e => setForm(f => ({ ...f, libraryName: e.target.value }))} />
              </div>

              <div className="space-y-2">
                <SuperadminLabel htmlFor="branding-tagline">
                  App Tagline <span className="text-text-secondary font-normal text-xs">(optional)</span>
                </SuperadminLabel>
                <SuperadminInput id="branding-tagline" placeholder="Your tagline here..."
                  value={form.tagline}
                  onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} />
              </div>

              {/* Color pickers */}
              <div className="space-y-2">
                <SuperadminLabel htmlFor="branding-primary-color">Primary Color</SuperadminLabel>
                <div className="flex items-center gap-2">
                  <input type="color" id="branding-primary-color" value={form.primaryColor}
                    onChange={e => setForm(f => ({ ...f, primaryColor: e.target.value }))}
                    className="h-10 w-12 rounded-md border border-border bg-transparent cursor-pointer p-0.5" />
                  <SuperadminInput value={form.primaryColor}
                    onChange={e => setForm(f => ({ ...f, primaryColor: e.target.value }))}
                    className="font-mono text-xs" />
                  <div className="h-10 w-10 rounded-md shrink-0 border border-border/50 shadow-inner" style={{ backgroundColor: form.primaryColor }} />
                </div>
              </div>

              <div className="space-y-2">
                <SuperadminLabel htmlFor="branding-accent-color">Secondary Accent Color</SuperadminLabel>
                <div className="flex items-center gap-2">
                  <input type="color" id="branding-accent-color" value={form.accentColor}
                    onChange={e => setForm(f => ({ ...f, accentColor: e.target.value }))}
                    className="h-10 w-12 rounded-md border border-border bg-transparent cursor-pointer p-0.5" />
                  <SuperadminInput value={form.accentColor}
                    onChange={e => setForm(f => ({ ...f, accentColor: e.target.value }))}
                    className="font-mono text-xs" />
                  <div className="h-10 w-10 rounded-md shrink-0 border border-border/50 shadow-inner" style={{ backgroundColor: form.accentColor }} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center gap-3 border-t border-border bg-muted/50 rounded-b-[var(--radius-lg)] p-4">
              <SuperadminButton id="save-branding-page-btn" variant="primary" className="flex-1 cursor-pointer"><Save size={16} className="mr-1.5" /> Save</SuperadminButton>
              <SuperadminButton id="reset-branding-btn" variant="ghost" onClick={handleReset} className="flex-1 border border-border cursor-pointer"><RotateCcw size={16} className="mr-1.5" /> Reset</SuperadminButton>
            </CardFooter>
          </SuperadminCard>
        </div>

        {/* Right — Live Preview */}
        <div ref={containerRef} className="lg:col-span-3 space-y-4">
          <SuperadminCard>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how your branding looks across different parts of the app.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mini Sidebar Preview */}
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Sidebar</p>
                <div className="border border-border rounded-lg bg-card overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${form.primaryColor}` }}>
                  <div className="p-4 flex items-center gap-3 border-b border-border bg-muted/30">
                    <div className="h-10 w-10 rounded-md flex items-center justify-center text-lg font-bold bg-card border border-border shadow-sm">
                      ðŸ“š
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-text-primary leading-tight truncate w-48">{form.libraryName || 'Library'}</p>
                      {form.tagline && <p className="text-xs text-text-secondary leading-tight truncate w-48 mt-0.5">{form.tagline}</p>}
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    {['Dashboard', 'Students', 'Finance', 'Reports'].map((item, i) => (
                      <div key={item} className={`px-3 py-2.5 text-xs font-bold rounded-md flex items-center gap-2 ${i === 0 ? 'text-primary-foreground shadow-sm' : 'text-text-secondary hover:bg-input'}`} style={{ backgroundColor: i === 0 ? form.primaryColor : 'transparent' }}>
                        <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-primary-foreground' : 'bg-text-secondary/50'}`} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mini Login Preview */}
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Login Page</p>
                <div className="rounded-xl border border-border p-6 max-w-sm bg-card shadow-sm mx-auto relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: form.primaryColor }} />
                  <div className="flex flex-col items-center mb-6 gap-2 text-center mt-2">
                    <div className="h-12 w-12 rounded-md flex items-center justify-center text-xl font-bold bg-muted border border-border shadow-sm">
                      ðŸ“š
                    </div>
                    <p className="text-lg font-extrabold text-text-primary tracking-tight">{form.libraryName || 'Library'}</p>
                    {form.tagline && <p className="text-xs text-text-secondary">{form.tagline}</p>}
                  </div>
                  <div className="space-y-3">
                    <div className="h-10 rounded-md bg-input border border-border" />
                    <div className="h-10 rounded-md bg-input border border-border" />
                    <div className="h-10 rounded-md flex items-center justify-center text-sm font-bold text-primary-foreground shadow-sm mt-4" style={{ backgroundColor: form.primaryColor }}>Login</div>
                  </div>
                </div>
              </div>

              {/* Mini ID Card Preview */}
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Student ID Card</p>
                <div className="rounded-lg border border-border overflow-hidden max-w-xs shadow-sm">
                  <div className="p-4 flex items-center gap-3 text-primary-foreground relative overflow-hidden" style={{ backgroundColor: form.primaryColor }}>
                    <div className="absolute right-0 top-0 bottom-0 w-24 opacity-20" style={{ background: `linear-gradient(to right, transparent, ${form.accentColor})` }} />
                    <div className="h-10 w-10 rounded-md bg-white/20 flex items-center justify-center text-xl backdrop-blur-sm shadow-sm relative z-10 border border-white/20">ðŸ“š</div>
                    <div className="relative z-10">
                      <p className="text-base font-extrabold tracking-tight truncate w-40">{form.libraryName || 'Library'}</p>
                      <p className="text-xs font-medium opacity-90 uppercase tracking-widest mt-0.5">Student ID</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-4 bg-card relative">
                    <div className="h-16 w-16 rounded-md bg-input flex items-center justify-center text-3xl border border-border shadow-inner">ðŸ‘¤</div>
                    <div className="flex-1">
                      <p className="text-sm font-extrabold text-text-primary">Rahul Sharma</p>
                      <p className="text-xs font-mono text-text-secondary mt-1">ID: #0042</p>
                      <p className="text-xs font-bold text-text-secondary mt-0.5 inline-flex items-center px-1.5 py-0.5 rounded bg-input">Morning</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </SuperadminCard>
        </div>
      </div>
    </div>
  );
}
