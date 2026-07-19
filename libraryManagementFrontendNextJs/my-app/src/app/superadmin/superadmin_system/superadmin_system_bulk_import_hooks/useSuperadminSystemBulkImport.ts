// RESPONSIBILITY: Renders or handles logic for useSuperadminSystemBulkImport.ts.
// DATA FLOW: SuperadminSystemMockData -> useSuperadminSystemBulkImport -> SuperadminSystemBulkImportClient
import { useState, useRef, useCallback } from 'react';
import { SUPERADMIN_SYSTEM_MOCK_IMPORT_PREVIEW } from '@/app/superadmin/superadmin_system/superadmin_system_utils/SuperadminSystemMockData';
import { SuperadminSystemBulkImportStep, SuperadminSystemBulkImportPreviewRow, SuperadminSystemBulkImportRowStatus } from '@/app/superadmin/superadmin_system/superadmin_system_types/SuperadminSystemBulkImportTypes';
import { SUPERADMIN_SYSTEM_BULK_IMPORT_TEMPLATE_HEADERS } from '@/app/superadmin/superadmin_system/superadmin_system_constants/SuperadminSystemBulkImportConstants';

export function useSuperadminSystemBulkImport() {
  const [step, setStep] = useState<SuperadminSystemBulkImportStep>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const [previewData, setPreviewData] = useState<SuperadminSystemBulkImportPreviewRow[]>([]);
  const [filter, setFilter] = useState<'all' | SuperadminSystemBulkImportRowStatus>('all');
  const [importProgress, setImportProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const errorCount = previewData.filter(r => r.status === 'error').length;
  const warningCount = previewData.filter(r => r.status === 'warning').length;
  const okCount = previewData.filter(r => r.status === 'ok').length;

  const filteredRows = filter === 'all' ? previewData : previewData.filter(r => r.status === filter);

  const handleFileSelect = useCallback((name: string) => {
    setFileName(name);
    setPreviewData(SUPERADMIN_SYSTEM_MOCK_IMPORT_PREVIEW as SuperadminSystemBulkImportPreviewRow[]);
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
    const csv = [SUPERADMIN_SYSTEM_BULK_IMPORT_TEMPLATE_HEADERS.join(','), 'Rahul Sharma,9876543210,rahul@gmail.com,Morning,S-01,Monthly,1000,2026-04-12'].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'bulk_import_template.csv'; a.click();
    URL.revokeObjectURL(url);
  }, []);

  return {
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
  };
}

