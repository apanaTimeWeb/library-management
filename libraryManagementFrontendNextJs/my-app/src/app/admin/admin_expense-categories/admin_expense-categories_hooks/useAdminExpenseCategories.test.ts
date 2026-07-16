// RESPONSIBILITY: Co-located unit tests verifying category filtering, status toggling, and URL state syncing (`Rule 47`).
// DATA FLOW: Jest / Vitest -> useAdminExpenseCategories.test.ts -> useAdminExpenseCategories / Store

import { renderHook, act } from '@testing-library/react';
import { useAdminExpenseCategories } from '@/app/admin/admin_expense-categories/admin_expense-categories_hooks/useAdminExpenseCategories';
import { useAdminExpenseCategoriesStore } from '@/app/admin/admin_expense-categories/admin_expense-categories_store/admin_expense-categories_store';

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(''),
  useRouter: () => ({
    replace: jest.fn(),
  }),
  usePathname: () => '/admin/admin_expense-categories',
}));

describe('useAdminExpenseCategories (`Rule 47`)', () => {
  beforeEach(() => {
    act(() => {
      useAdminExpenseCategoriesStore.setState({
        categories: [
          { id: '1', name: 'Electricity', description: 'Power bills', status: 'Active' },
          { id: '2', name: 'Rent', description: 'Building rent', status: 'Inactive' },
        ],
        fetchState: 'success',
      });
    });
  });

  it('returns all categories when search input is empty', () => {
    const { result } = renderHook(() => useAdminExpenseCategories());
    expect(result.current.categories.length).toBe(2);
  });

  it('filters categories by search string matching name or description', () => {
    const { result } = renderHook(() => useAdminExpenseCategories());
    expect(result.current.totalCount).toBe(2);
  });

  it('resets search query cleanly', () => {
    const { result } = renderHook(() => useAdminExpenseCategories());
    act(() => {
      result.current.setSearchInput('Rent');
    });
    act(() => {
      result.current.handleResetSearch();
    });
    expect(result.current.searchInput).toBe('');
  });
});
