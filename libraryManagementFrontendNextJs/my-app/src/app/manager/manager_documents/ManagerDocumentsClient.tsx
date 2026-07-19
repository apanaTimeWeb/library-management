'use client';
// RESPONSIBILITY: Renders the Document Vault UI, managing file viewing and actions.
import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { FolderOpen, Upload, Search, FileText, Download, Trash2, Image as ImageIcon, File } from 'lucide-react';
import { useManagerDocuments } from '@/app/manager/manager_documents/manager_documents_hooks/useManagerDocuments';
import { TablePagination } from '@/components/ui/table-pagination';
import { TableToolbar } from "@/components/ui/table-toolbar";
import { useClientTable } from "@/components/ui/use-client-table";

export function ManagerDocumentsClient() {
  const { documents, status, deleteDocument } = useManagerDocuments();

  const getFileIcon = (type: string) => {
    if (type === 'PDF') return <FileText size={18} className="text-danger" />;
    if (type === 'Image') return <ImageIcon size={18} className="text-primary" />;
    return <File size={18} className="text-info" />;
  };

  const table = useClientTable(documents);

  if (status === 'loading') {
    return <div className="p-6 min-h-screen"><div className="animate-pulse space-y-4"><div className="h-8 bg-skeleton-base rounded w-1/4"></div><div className="h-32 bg-skeleton-base rounded w-full"></div><div className="h-64 bg-skeleton-base rounded w-full"></div></div></div>;
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
        <div className="bg-card rounded-xl border border-border p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <FolderOpen size={32} className="text-primary mb-2" />
          <p className="font-medium text-text-primary">ID Proofs</p>
          <p className="text-xs text-text-secondary">124 Files</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <FolderOpen size={32} className="text-success mb-2" />
          <p className="font-medium text-text-primary">Finance</p>
          <p className="text-xs text-text-secondary">845 Files</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <FolderOpen size={32} className="text-warning mb-2" />
          <p className="font-medium text-text-primary">Study Material</p>
          <p className="text-xs text-text-secondary">42 Files</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <FolderOpen size={32} className="text-info mb-2" />
          <p className="font-medium text-text-primary">Other</p>
          <p className="text-xs text-text-secondary">19 Files</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 flex flex-col">
        <div className="w-full overflow-x-auto border border-border rounded-xl">
          <TableToolbar search={table.searchTerm} onSearch={table.setSearchTerm} />
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-card border-b border-border">
              <tr className="text-text-secondary text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-semibold">File Name</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Size</th>
                <th className="px-4 py-3 font-semibold">Uploaded By</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {table.paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-text-secondary">No documents found</td>
                </tr>
              ) : (
                table.paginatedData.map((row: any) => (
                  <tr key={row.id} className="hover:bg-page transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(row.type)}
                        <span className="font-medium text-text-primary">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-text-secondary">{row.category}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.size}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.uploadedBy}</td>
                    <td className="px-4 py-4 text-text-secondary">{row.date}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex gap-2 items-center justify-end">
                        <button className="bg-transparent border border-border text-text-primary rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center justify-center gap-1" aria-label="Download" title="Download">
                          <Download size={14} />
                        </button>
                        <button onClick={() => deleteDocument(row.id)} className="bg-transparent border border-border text-danger rounded-lg h-8 px-3 text-xs font-medium hover:bg-danger-bg hover:border-danger transition-colors inline-flex items-center justify-center gap-1" aria-label="Delete" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <TablePagination 
            page={table.page} limit={table.limit} totalItems={table.totalItems} 
            onPageChange={table.setPage} onLimitChange={table.setLimit} 
          />
        </div>
      </div>
    </div>
  );
}