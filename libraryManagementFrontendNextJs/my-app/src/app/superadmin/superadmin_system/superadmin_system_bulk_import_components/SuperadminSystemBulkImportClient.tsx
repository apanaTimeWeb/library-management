'use client';
// RESPONSIBILITY: Renders the bulk import UI (drag and drop, preview, stepper). No logic.

import { SuperadminCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminCard';
import { SuperadminButton } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminButton';
import { SuperadminBadge } from '@/app/superadmin/superadmin_system/superadmin_system_shared_components/SuperadminBadge';
import { Upload, FileSpreadsheet, ChevronRight, CheckCircle, XCircle, AlertTriangle, Download, RefreshCw, Users } from 'lucide-react';
import { useSuperadminSystemBulkImport } from '@/app/superadmin/superadmin_system/superadmin_system_bulk_import_hooks/useSuperadminSystemBulkImport';
import { SUPERADMIN_SYSTEM_BULK_IMPORT_STATUS_CONFIG } from '@/app/superadmin/superadmin_system/superadmin_system_constants/SuperadminSystemBulkImportConstants';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";
import { TablePagination } from "@/components/ui/table-pagination";

export function SuperadminSystemBulkImportClient() {
    const table = useClientTable([
                          ['Name',      true,  'Rahul Sharma'],
                          ['Phone',     true,  '9876543210'],
                          ['Email',     false, 'rahul@gmail.com'],
                          ['Shift',     true,  'Morning / Afternoon / Evening'],
                          ['Seat',      false, 'S-01 (auto-assigned if blank)'],
                          ['Plan',      false, 'Monthly / Quarterly'],
                          ['Fee Paid',  false, '1000'],
                          ['Join Date', false, '2026-04-12'],
                        ]);
  const {
    step,
    isDragging,
    setIsDragging,
    fileName,
    filter,
    setFilter,
    importProgress,
    fileInputRef,
    errorCount,
    warningCount,
    okCount,
    filteredRows,
    handleFileSelect,
    handleDrop,
    handleImport,
    handleReset,
    downloadTemplate,
    previewData
  } = useSuperadminSystemBulkImport();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-secondary text-xs font-medium tracking-wide mb-1">
          <span>System</span><ChevronRight size={12} /><span>Bulk Import</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
              <FileSpreadsheet size={28} className="text-primary" />
              Bulk Student Import
            </h1>
            <p className="text-text-secondary mt-1 text-sm">
              Upload an Excel or CSV file to import up to 500 students at once. System validates every row before import.
            </p>
          </div>
          <SuperadminButton id="download-template-btn" variant="ghost" onClick={downloadTemplate}>
            <Download size={16} className="mr-1" /> Download Template
          </SuperadminButton>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-8">
        {[
          { id: 'upload',    label: 'Upload File',     num: 1 },
          { id: 'preview',   label: 'Review & Validate', num: 2 },
          { id: 'importing', label: 'Importing',        num: 3 },
          { id: 'done',      label: 'Complete',         num: 4 },
        ].map((s, i, arr) => {
          const stepOrder = ['upload', 'preview', 'importing', 'done'];
          const currentIdx = stepOrder.indexOf(step);
          const thisIdx    = stepOrder.indexOf(s.id);
          const isActive   = s.id === step;
          const isDone     = currentIdx > thisIdx;

          return (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  isDone    ? 'bg-primary border-primary text-on-primary' :
                  isActive  ? 'border-primary text-primary bg-primary/10' :
                              'border-border text-text-secondary'
                }`}>
                  {isDone ? 'âœ“' : s.num}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${isActive ? 'text-primary' : 'text-text-secondary'}`}>{s.label}</span>
              </div>
              {i < arr.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${isDone ? 'bg-primary' : 'bg-outline-variant'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* ── STEP 1: UPLOAD ── */}
      {step === 'upload' && (
        <div className="space-y-5">
          <SuperadminCard>
            <CardHeader>
              <CardTitle>Upload Your File</CardTitle>
              <CardDescription>Accepted formats: .xlsx, .xls, .csv — Maximum 500 rows, 5MB</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                id="bulk-drop-zone"
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-4 p-16 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                  isDragging
                    ? 'border-primary bg-primary/8 scale-[1.01]'
                    : 'border-border hover:border-primary/50 hover:bg-card'
                }`}
              >
                <div className={`h-20 w-20 rounded-2xl flex items-center justify-center text-4xl transition-all ${
                  isDragging ? 'bg-primary/20' : 'bg-input'
                }`}>
                  {isDragging ? 'ðŸ“‚' : 'ðŸ“'}
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-text-primary">
                    {isDragging ? 'Drop your file here' : 'Drag & drop your file here'}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">or <span className="text-primary font-medium">browse to upload</span></p>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary">
                  <span className="px-2 py-1 rounded-lg bg-input">.xlsx</span>
                  <span className="px-2 py-1 rounded-lg bg-input">.xls</span>
                  <span className="px-2 py-1 rounded-lg bg-input">.csv</span>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={e => { if (e.target.files?.[0]) handleFileSelect(e.target.files[0].name); }}
              />
            </CardContent>
          </SuperadminCard>

          {/* Instructions */}
          <SuperadminCard>
            <CardHeader>
              <CardTitle>File Format Instructions</CardTitle>
              <CardDescription>Make sure your file follows this column structure.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
      <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wide">
                      <th className="text-left py-2 pr-4">Column</th>
                      <th className="text-left py-2 pr-4">Required</th>
                      <th className="text-left py-2">Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {table.paginatedData.map(([col, req, ex]) => (
                      <tr key={col as string} className="hover:bg-card">
                        <td className="py-2.5 pr-4 font-medium text-text-primary">{col as string}</td>
                        <td className="py-2.5 pr-4">
                          {req
                            ? <SuperadminBadge variant="danger">Required</SuperadminBadge>
                            : <SuperadminBadge variant="default">Optional</SuperadminBadge>}
                        </td>
                        <td className="py-2.5 text-text-secondary text-xs">{ex as string}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
      <TablePagination 
        page={table.page} limit={table.limit} totalItems={table.totalItems} 
        onPageChange={table.setPage} onLimitChange={table.setLimit} 
      />
              </div>
            </CardContent>
          </SuperadminCard>
        </div>
      )}

      {/* ── STEP 2: PREVIEW ── */}
      {step === 'preview' && (
        <div className="space-y-5">
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-card border border-border text-center">
              <p className="text-text-primary text-xl font-bold text-text-primary">{previewData.length}</p>
              <p className="text-xs text-text-secondary mt-1">Total Rows</p>
            </div>
            <div className="p-4 rounded-2xl bg-success-bg border border-success/30 text-center">
              <p className="text-text-primary text-xl font-bold text-success">{okCount}</p>
              <p className="text-xs text-text-secondary mt-1"><CheckCircle size={14} className="inline mr-1" /> Ready to Import</p>
            </div>
            <div className="p-4 rounded-2xl bg-tertiary/10 border border-tertiary/20 text-center">
              <p className="text-text-primary text-xl font-bold text-tertiary">{warningCount}</p>
              <p className="text-xs text-text-secondary mt-1">⚠️ Warnings</p>
            </div>
            <div className="p-4 rounded-2xl bg-danger-bg/10 border border-danger/20 text-center">
              <p className="text-text-primary text-xl font-bold text-danger">{errorCount}</p>
              <p className="text-xs text-text-secondary mt-1">âŒ Errors (must fix)</p>
            </div>
          </div>

          {errorCount > 0 && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-danger-bg/10 border border-danger/20">
              <XCircle size={18} className="text-danger shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-danger">{errorCount} rows have errors and will be skipped</p>
                <p className="text-xs text-text-secondary mt-0.5">Fix the issues in your file and re-upload, or proceed to import only the valid rows.</p>
              </div>
            </div>
          )}

          {/* Preview Table */}
          <SuperadminCard>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Data Preview — {fileName}</CardTitle>
                  <CardDescription>Review each row before importing.</CardDescription>
                </div>
                {/* Filter buttons */}
                <div className="flex gap-2">
                  {(['all', 'ok', 'warning', 'error'] as const).map(( f ) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        filter === f
                          ? 'bg-primary text-on-primary'
                          : 'bg-card text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {f === 'all' ? `All (${previewData.length})` :
                       f === 'ok'  ? <><CheckCircle size={14} className="inline mr-1" /> OK ({okCount})</> :
                       f === 'warning' ? <><AlertTriangle size={14} className="inline mr-1" /> Warn ({warningCount})</> :
                       <><XCircle size={14} className="inline mr-1" /> Error ({errorCount})</>}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-text-secondary text-xs uppercase tracking-wide">
                      <th className="text-left py-3 pr-3">Row</th>
                      <th className="text-left py-3 pr-3">Name</th>
                      <th className="text-left py-3 pr-3">Phone</th>
                      <th className="text-left py-3 pr-3">Email</th>
                      <th className="text-left py-3 pr-3">Shift</th>
                      <th className="text-left py-3 pr-3">Seat</th>
                      <th className="text-left py-3 pr-3">Status</th>
                      <th className="text-left py-3">Issue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {filteredRows.map(( row ) => {
                      const cfg = SUPERADMIN_SYSTEM_BULK_IMPORT_STATUS_CONFIG[row.status];
                      const Icon = cfg.icon;
                      return (
                        <tr key={row.row} className={`hover:bg-card transition-colors ${
                          row.status === 'error' ? 'bg-danger-bg/5' :
                          row.status === 'warning' ? 'bg-tertiary/5' : ''
                        }`}>
                          <td className="py-3 pr-3 font-mono text-xs text-text-secondary">#{row.row}</td>
                          <td className="py-3 pr-3 font-medium text-text-primary">{row.name || <span className="text-danger text-xs italic">missing</span>}</td>
                          <td className="py-3 pr-3 text-text-secondary">{row.phone || <span className="text-danger text-xs italic">missing</span>}</td>
                          <td className="py-3 pr-3 text-text-secondary">{row.email || <span className="text-text-secondary/40 text-xs">—</span>}</td>
                          <td className="py-3 pr-3 text-text-primary">{row.shift}</td>
                          <td className="py-3 pr-3 font-mono text-xs text-text-primary">{row.seat || <span className="text-text-secondary/40 text-xs">auto</span>}</td>
                          <td className="py-3 pr-3">
                            <SuperadminBadge variant={cfg.variant}>
                              <Icon size={10} className="inline mr-1" /> {cfg.label}
                            </SuperadminBadge>
                          </td>
                          <td className="py-3 text-xs text-text-secondary">{row.issue || '—'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <SuperadminButton id="start-import-btn" variant="primary" onClick={handleImport}>
                <Upload size={16} className="mr-2" /> Import {okCount} Valid Rows
              </SuperadminButton>
              <SuperadminButton id="reupload-btn" variant="ghost" onClick={handleReset}>
                <RefreshCw size={16} className="mr-2" /> Re-upload File
              </SuperadminButton>
            </CardFooter>
          </SuperadminCard>
        </div>
      )}

      {/* ── STEP 3: IMPORTING ── */}
      {step === 'importing' && (
        <SuperadminCard>
          <CardContent className="py-16 flex flex-col items-center gap-6 text-center">
            <div className="text-5xl animate-bounce">â³</div>
            <div>
              <h2 className="text-xl font-bold text-text-primary mb-1">Importing Students...</h2>
              <p className="text-sm text-text-secondary">Please don't close this tab while import is in progress.</p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Progress</span>
                <span className="text-primary font-semibold">{importProgress}%</span>
              </div>
              <div className="h-3 rounded-full bg-input overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${importProgress}%` }}
                />
              </div>
              <p className="text-xs text-text-secondary">
                {Math.round((importProgress / 100) * okCount)} of {okCount} rows imported
              </p>
            </div>
          </CardContent>
        </SuperadminCard>
      )}

      {/* ── STEP 4: DONE ── */}
      {step === 'done' && (
        <SuperadminCard>
          <CardContent className="py-16 flex flex-col items-center gap-6 text-center">
            <div className="h-24 w-24 rounded-full bg-success-bg flex items-center justify-center text-5xl">
              ðŸŽ‰
            </div>
            <div>
              <h2 className="text-text-primary text-xl font-bold text-text-primary mb-2">Import Complete!</h2>
              <p className="text-text-secondary">
                <span className="text-success font-semibold">{okCount} students</span> were successfully imported into the system.
              </p>
              {errorCount > 0 && (
                <p className="text-sm text-text-secondary mt-2">
                  <span className="text-danger font-semibold">{errorCount} rows</span> were skipped due to validation errors.
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <SuperadminButton id="view-students-btn" variant="primary">
                <Users size={16} className="mr-2" /> View All Students
              </SuperadminButton>
              <SuperadminButton id="import-again-btn" variant="ghost" onClick={handleReset}>
                <Upload size={16} className="mr-2" /> Import Another File
              </SuperadminButton>
            </div>
          </CardContent>
        </SuperadminCard>
      )}
    </div>
  );
}
