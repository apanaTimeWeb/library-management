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
  const [searchTerm, setSearchTerm] = useState('');

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
      cellRenderer: (params: unknown) => (
        <div className="flex items-center gap-3 h-full">
          {getFileIcon(params?.data?.type)}
          <span className="font-medium text-text-primary">{params.value}</span>
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
      cellRenderer: (params: unknown) => (
        <div className="flex gap-2 items-center h-full">
          <button className="bg-transparent border border-border text-text-primary rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center justify-center gap-1" title="Download">
            <Download size={14} />
          </button>
          <button onClick={() => deleteDocument(params.data.id)} className="bg-transparent border border-border text-danger rounded-lg h-8 px-3 text-xs font-medium hover:bg-danger-bg hover:border-danger transition-colors inline-flex items-center justify-center gap-1" title="Delete">
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ];

  if (status === 'loading') {
    return <div className="p-6 min-h-screen"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-300 rounded w-1/4"></div><div className="h-32 bg-gray-300 rounded w-full"></div><div className="h-64 bg-gray-300 rounded w-full"></div></div></div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">Home / Documents</div>
          <h1 className="text-[22px] font-bold text-text-primary flex items-center gap-2"><FolderOpen size={24}/> Document Vault</h1>
        </div>
        <div className="flex gap-2">
          <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
            <Upload size={16} />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-bg-card rounded-xl border border-border p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <FolderOpen size={32} className="text-primary mb-2" />
          <p className="font-medium text-text-primary">ID Proofs</p>
          <p className="text-xs text-text-secondary">124 Files</p>
        </div>
        <div className="bg-bg-card rounded-xl border border-border p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <FolderOpen size={32} className="text-success mb-2" />
          <p className="font-medium text-text-primary">Finance</p>
          <p className="text-xs text-text-secondary">845 Files</p>
        </div>
        <div className="bg-bg-card rounded-xl border border-border p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <FolderOpen size={32} className="text-warning mb-2" />
          <p className="font-medium text-text-primary">Study Material</p>
          <p className="text-xs text-text-secondary">42 Files</p>
        </div>
        <div className="bg-bg-card rounded-xl border border-border p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <FolderOpen size={32} className="text-info mb-2" />
          <p className="font-medium text-text-primary">Other</p>
          <p className="text-xs text-text-secondary">19 Files</p>
        </div>
      </div>

      <div className="bg-bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="relative w-full max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="w-full bg-bg-input border border-border rounded-lg pl-10 pr-3.5 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="Search in table..." 
            className="px-3 py-2 border border-border rounded-md text-sm bg-bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
<div className="w-full overflow-hidden border border-border rounded-xl h-[400px]">
          <AgGridReact
              quickFilterText={searchTerm}
              pagination={true}
              paginationPageSize={10}
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
