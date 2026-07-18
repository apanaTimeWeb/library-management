'use client';
// RESPONSIBILITY: Renders the data export UI, displaying quick exports and custom export builder. No raw logic.

import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';
import { Download, FileSpreadsheet, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { SUPERADMIN_SYSTEM_QUICK_EXPORTS } from '@/app/superadmin/superadmin_system/superadmin_system_constants/SuperadminSystemDataExportConstants';
import { useSuperadminSystemDataExport } from '@/app/superadmin/superadmin_system/superadmin_system_data_export_hooks/useSuperadminSystemDataExport';
// Lucide icons mapped dynamically for mock modules if needed.
import * as LucideIcons from 'lucide-react';

export function SuperadminSystemDataExportClient() {
  const {
    selected,
    format,
    setFormat,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    exporting,
    exported,
    toggleModule,
    selectAll,
    clearAll,
    handleExport,
    estimatedTotal,
    exportModules
  } = useSuperadminSystemDataExport();

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-medium tracking-wide mb-1">
          <span>System</span><ChevronRight size={12} /><span>Data Export</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
          <Download size={28} className="text-primary" />
          Data Export
        </h1>
        <p className="text-text-secondary mt-1 text-sm">
          Export your library data as CSV or Excel. All exports are filtered by date range.
        </p>
      </div>

      {/* Quick Exports */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-text-primary mb-3">⚡ Quick Exports</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SUPERADMIN_SYSTEM_QUICK_EXPORTS.map((qe) => (
            <SuperadminCard key={qe.id} className="hover:border-primary/40 transition-colors cursor-pointer group" onClick={() => handleExport(qe.id)}>
              <CardContent className="flex items-start gap-3 py-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <qe.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary">{qe.label}</p>
                  <p className="text-xs text-text-secondary mt-0.5 leading-snug">{qe.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <SuperadminBadge variant="outline">{qe.format}</SuperadminBadge>
                    <button
                      id={`quick-export-${qe.id}`}
                      disabled={exporting === qe.id}
                      className="text-xs text-primary font-medium hover:underline disabled:opacity-50 flex items-center gap-1"
                    >
                      {exporting === qe.id
                        ? <><Loader2 size={11} className="animate-spin" /> Exporting...</>
                        : exported.has(qe.id)
                        ? <><CheckCircle size={11} /> Downloaded!</>
                        : '↓ Export'}
                    </button>
                  </div>
                </div>
              </CardContent>
            </SuperadminCard>
          ))}
        </div>
      </div>

      {/* Custom Export Builder */}
      <SuperadminCard>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet size={18} className="text-primary" /> Custom Export Builder
              </CardTitle>
              <CardDescription>Select modules and configure filters for a custom data export.</CardDescription>
            </div>
            <div className="flex gap-2">
              <button onClick={selectAll} className="text-xs text-primary font-medium hover:underline">Select All</button>
              <span className="text-text-secondary text-xs">·</span>
              <button onClick={clearAll} className="text-xs text-text-secondary hover:text-text-primary">Clear</button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Module selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exportModules.map((mod) => {
              const isSelected = selected.has(mod.id);
              // Dynamic icon lookup for mock data
              const Icon = (LucideIcons as any)[mod.icon] || FileSpreadsheet;
              
              return (
                <div
                  key={mod.id}
                  id={`export-module-${mod.id}`}
                  onClick={() => toggleModule(mod.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary/40 bg-primary/8'
                      : 'border-border hover:border-primary/25 hover:bg-bg-card'
                  }`}
                >
                  <div className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isSelected ? 'bg-primary border-primary' : 'border-border'
                  }`}>
                    {isSelected && <CheckCircle size={12} className="text-on-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-base"><Icon size={16} /></span>
                      <span className="text-sm font-semibold text-text-primary">{mod.label}</span>
                      <span className="text-xs text-text-secondary ml-auto">~{mod.estimatedRows.toLocaleString()} rows</span>
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5 leading-snug">{mod.description}</p>
                    <div className="flex gap-1 mt-1.5">
                      {mod.formats.map(( f ) => <SuperadminBadge key={f} variant="outline">{f}</SuperadminBadge>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filters row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-bg-card border border-border">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">Output Format</label>
              <div className="flex gap-2">
                {(['CSV', 'XLSX'] as const).map(( f ) => (
                  <button
                    key={f}
                    id={`format-${f.toLowerCase()}`}
                    onClick={() => setFormat(f)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${
                      format === f
                        ? 'bg-primary text-on-primary border-primary'
                        : 'bg-bg-card text-text-secondary border-border hover:border-primary/40'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="export-date-from" className="text-xs font-medium text-text-secondary uppercase tracking-wide">From Date</label>
              <input
                id="export-date-from"
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-bg-card border border-border text-sm text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="export-date-to" className="text-xs font-medium text-text-secondary uppercase tracking-wide">To Date</label>
              <input
                id="export-date-to"
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-bg-card border border-border text-sm text-text-primary focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1">
              {selected.size > 0 && (
                <p className="text-sm text-text-secondary">
                  <span className="text-primary font-semibold">{selected.size} module{selected.size > 1 ? 's' : ''}</span> selected ·
                  ~<span className="text-text-primary font-medium">{estimatedTotal.toLocaleString()} rows</span> · Format: <span className="text-primary font-medium">{format}</span>
                </p>
              )}
            </div>
            <SuperadminButton
              id="export-data-btn"
              variant="primary"
              disabled={selected.size === 0 || exporting === 'bulk'}
              onClick={() => handleExport()}
            >
              {exporting === 'bulk'
                ? <><Loader2 size={16} className="animate-spin" /> Exporting...</>
                : exported.has('bulk')
                ? <><CheckCircle size={16} /> Downloaded!</>
                : <><Download size={16} /> Export {selected.size > 0 ? `${selected.size} Module${selected.size > 1 ? 's' : ''}` : 'Data'}</>}
            </SuperadminButton>
          </div>
        </CardFooter>
      </SuperadminCard>
    </div>
  );
}
