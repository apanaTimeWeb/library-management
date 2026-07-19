'use client';
// RESPONSIBILITY: Renders the SuperadminLibrariesGrid component.
import React, { useState, useMemo } from 'react';
import { Edit2, ShieldAlert, CheckCircle, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import type { SuperadminLibrary as Library, SuperadminLibrariesGridProps as Props } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_types/SuperadminLibrariesTypes';
import { SuperadminLibrariesEmptyState } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_components/SuperadminLibrariesEmptyState';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export function SuperadminLibrariesGrid({ libraries, onRowClick, onSuspend }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const searchedLibraries = useMemo(() => {
    if (!searchTerm) return libraries;
    const lowerSearch = searchTerm.toLowerCase();
    return libraries.filter(lib => 
      lib.name?.toLowerCase().includes(lowerSearch) ||
      lib.location?.toLowerCase().includes(lowerSearch) ||
      lib.plan?.toLowerCase().includes(lowerSearch)
    );
  }, [libraries, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(searchedLibraries.length / pageSize);
  const paginatedLibraries = searchedLibraries.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col">
      <div className="p-4 border-b border-border bg-page/30 flex items-center justify-between">
        <div className="flex-1"></div>
        <span className="text-xs font-semibold text-text-disabled uppercase tracking-wider">{libraries.length} libraries</span>
      </div>
      
      {libraries.length === 0 ? (
        <div className="p-10">
          <SuperadminLibrariesEmptyState />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 w-full p-4">
            <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
            
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-page/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Library Name</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Location</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Seats</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase">Status</TableHead>
                    <TableHead className="text-xs font-semibold text-text-secondary uppercase w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLibraries.length > 0 ? (
                    paginatedLibraries.map((lib, index) => {
                      const pct = Math.round((lib.occupied / lib.seats) * 100);
                      return (
                        <TableRow 
                          key={index}
                          onClick={() => onRowClick(lib, 'view')}
                          className="cursor-pointer hover:bg-page/50 transition-colors"
                        >
                          <TableCell>
                            <div className="h-full flex flex-col justify-center">
                              <p className="font-medium text-text-primary leading-tight">{lib.name}</p>
                              <p className="text-xs font-semibold text-text-disabled uppercase tracking-wide mt-0.5">{lib.plan} Plan</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-text-secondary">
                            {lib.location}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1.5 justify-center h-full">
                              <span className="text-sm font-medium text-text-primary">
                                {lib.occupied}<span className="text-text-disabled">/{lib.seats}</span>
                              </span>
                              <div className="h-1.5 w-20 bg-bg-input rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${pct > 90 ? 'bg-danger' : 'bg-success'}`} style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {lib.status === 'Active'
                              ? <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-success-bg text-success"><CheckCircle size={12} /> Active</span>
                              : <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-warning-bg text-warning"><AlertTriangle size={12} /> Maintenance</span>
                            }
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 h-full">
                              <button 
                                className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-success hover:bg-success/10 transition-colors" 
                                title="Edit" 
                                onClick={e => { e.stopPropagation(); onRowClick(lib, 'edit'); }}
                              >
                                <Edit2 size={15} />
                              </button>
                              <button 
                                className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors" 
                                title="Suspend" 
                                onClick={e => { e.stopPropagation(); onSuspend(lib.id); }}
                              >
                                <ShieldAlert size={15} />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-text-secondary">
                        No libraries match your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-border flex items-center justify-between bg-page/30">
            <span className="text-sm font-semibold text-text-secondary">
              Showing {paginatedLibraries.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedLibraries.length)} of {searchedLibraries.length} libraries
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-semibold text-text-primary">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 rounded-md border border-border text-text-secondary hover:text-text-primary hover:bg-bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

