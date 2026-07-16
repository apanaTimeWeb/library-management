'use client';

// RESPONSIBILITY: Renders the Document Vault UI, managing file viewing and actions.
import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { FolderOpen, Upload, Search, FileText, Download, Trash2, Image as ImageIcon, File } from 'lucide-react';
import { gridTheme } from '@/app/manager/manager_reusable/gridTheme';
import { useDocuments } from '@/app/manager/manager_documents/manager_documents_hooks/useDocuments';

ModuleRegistry.registerModules([AllCommunityModule]);

export function ManagerDocumentsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const { documents, status, deleteDocument } = useDocuments();

  const setSearchQuery = (q: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (q) params.set('q', q);
    else params.delete('q');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const getFileIcon = (type: string) => {
    if (type === 'PDF') return <FileText size={18} className="text-danger" />;
    if (type === 'Image') return <ImageIcon size={18} className="text-primary" />;
    return <File size={18} className="text-info" />;
  };

  const filteredDocuments = useMemo(() => {
    if (!searchQuery) return documents;
    const lowerQ = searchQuery.toLowerCase();
    return documents.filter(d => 
      d.name.toLowerCase().includes(lowerQ) || 
      d.category.toLowerCase().includes(lowerQ) ||
      d.uploadedBy.toLowerCase().includes(lowerQ)
    );
  }, [documents, searchQuery]);

  const colDefs = [
    { 
      field: 'name', 
      headerName: 'File Name', 
      flex: 1,
      cellRenderer: (params: any) => (
        <div className="flex items-center gap-3 h-full">
          {getFileIcon(params?.data?.type)}
          <span className="mgr-cell-name font-medium">{params.value}</span>
        </div>
      )
    },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'size', headerName: 'Size', width: 100 },
    { field: 'uploadedBy', headerName: 'Uploaded By', width: 160 },
    { field: 'date', headerName: 'Date', width: 120 },
    {
      headerName: 'Actions',
      width: 120,
      sortable: false,
      cellRenderer: (params: any) => (
        <div className="flex gap-2 items-center h-full">
          <button className="mgr-btn-ghost mgr-btn-sm" title="Download">
            <Download size={16} />
          </button>
          <button onClick={() => deleteDocument(params.data.id)} className="mgr-btn-ghost mgr-btn-sm text-danger" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  if (status === 'loading') {
    return <div className="mgr-page"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-300 rounded w-1/4"></div><div className="h-32 bg-gray-300 rounded w-full"></div><div className="h-64 bg-gray-300 rounded w-full"></div></div></div>;
  }

  return (
    <div className="mgr-page">
      <div className="mgr-page-header">
        <div>
          <div className="mgr-breadcrumb">Home / Documents</div>
          <h1 className="mgr-page-title flex items-center gap-2"><FolderOpen size={24}/> Document Vault</h1>
        </div>
        <div className="mgr-page-actions">
          <button className="mgr-btn-primary flex items-center gap-2">
            <Upload size={16} />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="mgr-card p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors border-2 border-transparent">
          <FolderOpen size={32} className="text-primary mb-2" />
          <p className="font-medium text-text-primary">ID Proofs</p>
          <p className="text-xs text-text-secondary">124 Files</p>
        </div>
        <div className="mgr-card p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors border-2 border-transparent">
          <FolderOpen size={32} className="text-success mb-2" />
          <p className="font-medium text-text-primary">Finance</p>
          <p className="text-xs text-text-secondary">845 Files</p>
        </div>
        <div className="mgr-card p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors border-2 border-transparent">
          <FolderOpen size={32} className="text-warning mb-2" />
          <p className="font-medium text-text-primary">Study Material</p>
          <p className="text-xs text-text-secondary">42 Files</p>
        </div>
        <div className="mgr-card p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors border-2 border-transparent">
          <FolderOpen size={32} className="text-info mb-2" />
          <p className="font-medium text-text-primary">Other</p>
          <p className="text-xs text-text-secondary">19 Files</p>
        </div>
      </div>

      <div className="mgr-card p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="mgr-input-icon-wrap w-full max-w-sm">
            <Search size={16} className="mgr-input-icon" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="mgr-input mgr-input-with-icon"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mgr-table-wrapper h-[400px]">
          <AgGridReact
            theme={gridTheme}
            rowData={filteredDocuments}
            columnDefs={colDefs as never}
            rowHeight={56}
            headerHeight={48}
          />
        </div>
      </div>
    </div>
  );
}
