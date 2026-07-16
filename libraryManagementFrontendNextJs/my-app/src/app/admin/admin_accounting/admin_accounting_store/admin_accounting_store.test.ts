// RESPONSIBILITY: Co-located unit tests for accounting store logic (`Rule 47`).
// DATA FLOW: Jest / Vitest -> admin_accounting_store.test.ts -> admin_accounting_store

import { act } from '@testing-library/react';
import { useAdminAccountingStore } from '@/app/admin/admin_accounting/admin_accounting_store/admin_accounting_store';

describe('useAdminAccountingStore (`Rule 47`)', () => {
  beforeEach(() => {
    act(() => {
      useAdminAccountingStore.setState({
        assets: [],
        expenses: [],
        maintenance: [],
        fetchState: 'idle',
      });
    });
  });

  it('adds a new asset correctly', async () => {
    await act(async () => {
      await useAdminAccountingStore.getState().createAsset({
        name: 'New Asset',
        category: 'Furniture',
        purchaseDate: '2026-05-01',
        purchaseValue: 5000,
        location: 'Lobby',
      });
    });
    const state = useAdminAccountingStore.getState();
    expect(state.assets.length).toBe(1);
    expect(state.assets[0].name).toBe('New Asset');
  });

  it('adds a new expense correctly', async () => {
    await act(async () => {
      await useAdminAccountingStore.getState().createExpense({
        date: '2026-05-01',
        category: 'Maintenance',
        description: 'Repairs',
        amount: 2500,
        paidBy: 'Admin',
        mode: 'cash',
      });
    });
    const state = useAdminAccountingStore.getState();
    expect(state.expenses.length).toBe(1);
    expect(state.expenses[0].category).toBe('Maintenance');
  });
});
