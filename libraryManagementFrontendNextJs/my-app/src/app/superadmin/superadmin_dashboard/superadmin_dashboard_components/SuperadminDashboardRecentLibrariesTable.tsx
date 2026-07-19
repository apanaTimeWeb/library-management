'use client';
// RESPONSIBILITY: Renders the SuperadminDashboardRecentLibrariesTable component.
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/SuperadminUrlConfig';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import type { SuperadminDashboardRecentLibrary as Library, SuperadminDashboardRecentLibrariesTableProps as Props } from '@/app/superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  active:   { label: 'Active',    bg: 'bg-success-bg', text: 'text-success' },
  setup:    { label: 'Setup Due', bg: 'bg-warning-bg', text: 'text-warning' },
  inactive: { label: 'Inactive',  bg: 'bg-danger-bg', text: 'text-danger' },
};

const PLAN_CLS: Record<string, { bg: string; text: string }> = {
  Basic:      { bg: 'bg-info-bg', text: 'text-info' },
  Pro:        { bg: 'bg-primary/10', text: 'text-primary' },
  Enterprise: { bg: 'bg-input', text: 'text-text-primary' },
};

export function SuperadminDashboardRecentLibrariesTable({ data }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const searchedData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter(lib => 
      lib.name?.toLowerCase().includes(lowerSearch) ||
      lib.owner?.toLowerCase().includes(lowerSearch)
    );
  }, [data, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(searchedData.length / pageSize);
  const paginatedData = searchedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col">
      <div className="p-6 flex items-center justify-between border-b border-border bg-page/30">
        <h2 className="text-base font-bold text-text-primary">Recently Registered Libraries</h2>
        <Link href={SUPERADMIN_ROUTES.LIBRARIES} className="text-primary text-xs font-bold flex items-center gap-1 hover:text-primary/80 transition-colors">
          View All <ExternalLink size={12} />
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-full p-4">
        <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
        
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-page/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Library</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Owner</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Students</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Plan</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Status</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((lib, index) => {
                  const pCls = PLAN_CLS[lib.plan ?? ''] ?? PLAN_CLS.Basic;
                  const sCls = STATUS_CONFIG[lib.status ?? 'inactive'];
                  
                  return (
                    <TableRow 
                      key={index}
                      className="hover:bg-page/50 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3 h-full">
                          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold uppercase tracking-wider shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                            {lib.initials}
                          </div>
                          <span className="font-medium text-text-primary text-sm">{lib.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-text-secondary text-sm">
                        {lib.owner}
                      </TableCell>
                      <TableCell className="font-bold text-text-primary text-sm">
                        {lib.students}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${pCls.bg} ${pCls.text}`}>
                          {lib.plan}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${sCls.bg} ${sCls.text}`}>
                          {sCls.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-text-disabled text-xs">
                        {lib.joinedAt}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-text-secondary">
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
          Showing {paginatedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedData.length)} of {searchedData.length} libraries
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
    </div>
  );
}

