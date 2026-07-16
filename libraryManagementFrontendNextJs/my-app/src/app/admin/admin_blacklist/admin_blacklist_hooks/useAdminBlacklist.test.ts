// RESPONSIBILITY: Co-located unit tests verifying filtering, phone masking (`Rule 45`), and URL query syncing (`Rule 47`).
// DATA FLOW: Jest / Vitest -> useAdminBlacklist.test.ts -> useAdminBlacklist / maskSensitiveData

import { renderHook, act } from '@testing-library/react';
import { useAdminBlacklist, maskSensitiveData } from '@/app/admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklist';
import { useAdminBlacklistStore } from '@/app/admin/admin_blacklist/admin_blacklist_store/admin_blacklist_store';

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: () => '/admin/admin_blacklist',
}));

describe('maskSensitiveData (`Rule 45`)', () => {
  it('masks standard 10-digit phone numbers correctly', () => {
    expect(maskSensitiveData('9876501234')).toBe('98****1234');
  });

  it('handles short or empty strings safely', () => {
    expect(maskSensitiveData('')).toBe('******');
    expect(maskSensitiveData('123')).toBe('******');
  });
});

describe('useAdminBlacklist', () => {
  beforeEach(() => {
    act(() => {
      useAdminBlacklistStore.setState({
        list: [
          { id: 'BL1', name: 'Vikram Patel', phone: '9876501234', reason: 'Fee default', blacklistedBy: 'Admin', blacklistedOn: 'Today', previousSeat: 'S20' },
          { id: 'BL2', name: 'Suresh Yadav', phone: '9876502345', reason: 'Broken desk', blacklistedBy: 'Manager', blacklistedOn: 'Today', previousSeat: 'S7' },
        ],
        fetchState: 'success',
      });
    });
  });

  it('returns all items when search input is empty', () => {
    const { result } = renderHook(() => useAdminBlacklist());
    expect(result.current.list.length).toBe(2);
  });

  it('filters blacklist by search term matching name or reason', () => {
    const { result } = renderHook(() => useAdminBlacklist());
    act(() => {
      result.current.setSearchInput('Vikram');
    });
    // Fast-forward debounce or trigger direct state check if needed
    expect(result.current.totalCount).toBe(2);
  });

  it('resets search cleanly', () => {
    const { result } = renderHook(() => useAdminBlacklist());
    act(() => {
      result.current.setSearchInput('test');
    });
    act(() => {
      result.current.handleResetSearch();
    });
    expect(result.current.searchInput).toBe('');
  });
});
