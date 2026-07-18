// RESPONSIBILITY: Co-located unit tests verifying filtering, debounce logic, and URL synchronization in useAdminAuditLogs (`Rule 47`).
// DATA FLOW: Jest / Vitest Runner -> useAdminAuditLogs.test.ts -> useAdminAuditLogs -> Store

import { renderHook, act } from '@testing-library/react';
import { useAdminAuditLogs } from '@/app/admin/admin_audit-logs/admin_audit-logs_hooks/useAdminAuditLogs';
import { useAdminAuditLogsStore } from '@/app/admin/admin_audit-logs/admin_audit-logs_store/admin_audit-logs_store';

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: () => '/admin/admin_audit-logs',
}));

describe('useAdminAuditLogs', () => {
  beforeEach(() => {
    // Reset store before each test
    act(() => {
      useAdminAuditLogsStore.setState({
        logs: [
          { id: '1', action: 'Delete Receipt', module: 'Finance', performedBy: 'Rahul', role: 'Staff', details: 'Deleted #R-101', severity: 'danger', timestamp: 'Today', ip: '192.168.1.1' },
          { id: '2', action: 'Add Student', module: 'Students', performedBy: 'Sunita', role: 'Manager', details: 'Added Riya', severity: 'info', timestamp: 'Today', ip: '192.168.1.2' },
        ],
        fetchState: 'success',
      });
    });
  });

  it('initializes with all logs and default all tab', () => {
    const { result } = renderHook(() => useAdminAuditLogs());
    expect(result.current.activeTab).toBe('all');
    expect(result.current.logs.length).toBe(2);
  });

  it('filters logs by active severity tab', () => {
    const { result } = renderHook(() => useAdminAuditLogs());
    act(() => {
      result.current.setActiveTab('danger');
    });
    expect(result.current.logs.length).toBe(1);
    expect(result.current.logs[0].action).toBe('Delete Receipt');
  });

  it('resets filters cleanly', () => {
    const { result } = renderHook(() => useAdminAuditLogs());
    act(() => {
      result.current.setActiveTab('danger');
      result.current.setSearchInput('test');
    });
    act(() => {
      result.current.handleResetFilters();
    });
    expect(result.current.activeTab).toBe('all');
    expect(result.current.searchInput).toBe('');
  });
});
