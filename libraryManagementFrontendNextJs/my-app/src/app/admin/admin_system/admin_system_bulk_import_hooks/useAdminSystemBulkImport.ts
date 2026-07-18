// RESPONSIBILITY: Renders the useAdminSystemBulkImport.ts component/hook.
import { useState, useRef, useMemo, useCallback } from 'react';
import { ADMIN_SYSTEM_MOCK_PREVIEW, ADMIN_SYSTEM_TEMPLATE_HEADERS } from '@/app/admin/admin_system/admin_system_data/AdminSystemMockData2';
import { PreviewRow, RowStatus, ImportStep } from "./useAdminSystemBulkImport_types";

export function useAdminSystemBulkImport() {
  const [step, setStep] = useState<ImportStep>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [filter, setFilter] = useState<'all' | RowStatus>('all');
  const [importProgress, setImportProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const errorCount = useMemo(() => (ADMIN_SYSTEM_MOCK_PREVIEW as PreviewRow[]).filter(r => r.status === 'error').length, []);
  const warningCount = useMemo(() => (ADMIN_SYSTEM_MOCK_PREVIEW as PreviewRow[]).filter(r => r.status === 'warning').length, []);
  const okCount = useMemo(() => (ADMIN_SYSTEM_MOCK_PREVIEW as PreviewRow[]).filter(r => r.status === 'ok').length, []);

  const filteredRows = useMemo(() => 
    filter === 'all' ? (ADMIN_SYSTEM_MOCK_PREVIEW as PreviewRow[]) : (ADMIN_SYSTEM_MOCK_PREVIEW as PreviewRow[]).filter(r => r.status === filter),
    [filter]
  );

  const handleFileSelect = useCallback((name: string) => {
    setFileName(name);
    setTimeout(() => setStep('preview'), 800);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file.name);
  }, [handleFileSelect]);

  const handleImport = useCallback(() => {
    setStep('importing');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 12;
      setImportProgress(Math.min(progress, 100));
      if (progress >= 100) { clearInterval(interval); setStep('done'); }
    }, 200);
  }, []);

  const handleReset = useCallback(() => {
    setStep('upload');
    setFileName('');
    setImportProgress(0);
    setFilter('all');
  }, []);

  const downloadTemplate = useCallback(() => {
    const csv = [ADMIN_SYSTEM_TEMPLATE_HEADERS.join(','), 'Rahul Sharma,9876543210,rahul@gmail.com,Morning,S-01,Monthly,1000,2026-04-12'].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'bulk_import_template.csv'; a.click();
    URL.revokeObjectURL(url);
  }, []);

  return {
    step, isDragging, setIsDragging, fileName, filter, setFilter, importProgress, fileInputRef,
    errorCount, warningCount, okCount, filteredRows,
    handleFileSelect, handleDrop, handleImport, handleReset, downloadTemplate
  };
}
