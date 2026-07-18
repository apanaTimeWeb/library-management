'use client';
// RESPONSIBILITY: Renders the SuperadminAuditLogsGrid component.
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SuperadminAuditLog, SuperadminAuditLogsGridProps as Props } from '@/app/superadmin/superadmin_audit-logs/superadmin_audit_logs_types/SuperadminAuditLogsTypes';
import { SuperadminSearchableDropdown } from '@/app/superadmin/superadmin_shared_components/SuperadminSearchableDropdown';
import { TableToolbar } from "@/components/ui/table-toolbar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export function ActionBadge({ action }: { action: string }) {
  if (action === 'Created') return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-[#064E3B] text-[#34D399]">CREATED</span>;
  if (action === 'Updated') return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-[#1E3A5F] text-[#60A5FA]">UPDATED</span>;
  if (action === 'Deleted') return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-[#450A0A] text-[#F87171]">DELETED</span>;
  if (action === 'Fee_Collected') return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-[#451A03] text-[#FBBF24]">FEE_COLLECTED</span>;
  return null;
}

export function SuperadminAuditLogsGrid({ logs, onRowClick, actionFilter, onFilterChange }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const searchedLogs = useMemo(() => {
    if (!searchTerm) return logs;
    const lowerSearch = searchTerm.toLowerCase();
    return logs.filter(log => 
      log.user?.toLowerCase().includes(lowerSearch) ||
      log.target?.toLowerCase().includes(lowerSearch) ||
      log.entity?.toLowerCase().includes(lowerSearch) ||
      log.ip?.toLowerCase().includes(lowerSearch)
    );
  }, [logs, searchTerm]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, actionFilter]);

  const totalPages = Math.ceil(searchedLogs.length / pageSize);
  const paginatedLogs = searchedLogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col">
      <div className="p-4 border-b border-border bg-bg-page/30 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex-1"></div>
        <div className="flex items-center gap-4 ml-auto w-full sm:w-auto">
          <div className="w-full sm:w-48">
            <SuperadminSearchableDropdown
              options={[
                { label: 'All Actions', value: 'All Actions' },
                { label: 'Created', value: 'Created' },
                { label: 'Updated', value: 'Updated' },
                { label: 'Deleted', value: 'Deleted' },
                { label: 'Fee_Collected', value: 'Fee_Collected' }
              ]}
              value={actionFilter}
              onChange={onFilterChange}
            />
          </div>
          <span className="text-xs font-bold text-text-disabled uppercase tracking-wider whitespace-nowrap">{logs.length} entries</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 w-full p-4">
        <TableToolbar search={searchTerm} onSearch={setSearchTerm} />
        
        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-bg-page/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Timestamp</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Performed By</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Target Entity</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">Action</TableHead>
                <TableHead className="text-xs font-semibold text-text-secondary uppercase">IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLogs.length > 0 ? (
                paginatedLogs.map((log, index) => (
                  <TableRow 
                    key={index}
                    onClick={() => onRowClick(log)}
                    className="cursor-pointer hover:bg-bg-page/50 transition-colors"
                  >
                    <TableCell className="font-mono text-xs text-text-disabled tracking-tight">
                      {log.time}
                    </TableCell>
                    <TableCell className="font-bold text-text-primary">
                      {log.user}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 h-full">
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{log.entity}:</span>
                        <span className="text-sm font-semibold text-text-primary">{log.target}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ActionBadge action={log.action} />
                    </TableCell>
                    <TableCell className="font-mono text-xs text-text-disabled">
                      {log.ip}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-text-secondary">
                    No logs match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-text-secondary">
            Showing {paginatedLogs.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, searchedLogs.length)} of {searchedLogs.length} logs
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
    </div>
  );
}
