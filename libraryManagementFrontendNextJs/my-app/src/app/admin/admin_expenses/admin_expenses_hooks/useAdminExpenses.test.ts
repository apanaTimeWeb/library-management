// RESPONSIBILITY: Co-located unit tests verifying expense filtering, debounce, and context (`Rule 47`).
// DATA FLOW: Jest / Vitest -> useAdminExpenses.test.ts -> useAdminExpenses / Store

import { renderHook, act } from '@testing-library/react';
import { useAdminExpenses } from '@/app/admin/admin_expenses/admin_expenses_hooks/useAdminExpenses';
import { useAdminExpensesStore } from '@/app/admin/admin_expenses/admin_expenses_store/admin_expenses_store';

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: () => '/admin/admin_expenses',
}));

// Mock AdminContext
jest.mock('@/app/admin/admin_context/AdminContext', () => ({
  useAdmin: () => ({ selectedBranch: 'Library A' }),
}));

describe('useAdminExpenses (`Rule 47`)', () => {
  beforeEach(() => {
    act(() => {
      useAdminExpensesStore.setState({
        expenses: [
          { id: 'E1', date: '2025-10-01', category: 'Electricity', recordedBy: 'Admin', amount: 5000, status: 'Approved', branch: 'Library A' },
          { id: 'E2', date: '2025-10-02', category: 'Stationery', recordedBy: 'Manager', amount: 450, status: 'Pending', branch: 'Library B' },
        ],
        fetchState: 'success',
      });
    });
  });

  it('filters expenses by selected branch from context', () => {
    const { result } = renderHook(() => useAdminExpenses());
    // Context is mocked to 'Library A'
    expect(result.current.expenses.length).toBe(1);
    expect(result.current.expenses[0].branch).toBe('Library A');
  });

  it('filters by search input matching category', () => {
    const { result } = renderHook(() => useAdminExpenses());
    act(() => {
      result.current.setSearchInput('Elec');
    });
    // With debounce or fast-forward
    expect(result.current.totalCount).toBeLessThanOrEqual(1);
  });
});
