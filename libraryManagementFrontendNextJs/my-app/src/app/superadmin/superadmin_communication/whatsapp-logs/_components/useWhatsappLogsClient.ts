/**
 * RESPONSIBILITY: Logic and state management for WhatsappLogsClient.
 */
import { useState } from 'react';
import { SUPERADMIN_COMMUNICATION_MOCK_WA_LOGS } from '@superadmin/superadmin_communication/superadmin_communication_data/SuperadminCommunicationMockData';
import type { SuperadminCommunicationWhatsappLog as WaLog } from '@/app/superadmin/superadmin_communication/superadmin_communication_types/SuperadminCommunicationTypes';

export function useWhatsappLogsClient() {
  const [typeFilter,   setTypeFilter]   = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search,       setSearch]       = useState('');
  const [dateFrom,     setDateFrom]     = useState('');
  const [dateTo,       setDateTo]       = useState('');
  const [viewLog,      setViewLog]      = useState<WaLog | null>(null);

  const filteredLogs = (SUPERADMIN_COMMUNICATION_MOCK_WA_LOGS as WaLog[]).filter(l => {
    if (typeFilter !== 'All' && l.type !== typeFilter) return false;
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    if (search && !l.student.toLowerCase().includes(search.toLowerCase()) && !l.phone.includes(search)) return false;
    return true;
  });

  return {
    typeFilter, setTypeFilter,
    statusFilter, setStatusFilter,
    search, setSearch,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    viewLog, setViewLog,
    filteredLogs
  };
}
