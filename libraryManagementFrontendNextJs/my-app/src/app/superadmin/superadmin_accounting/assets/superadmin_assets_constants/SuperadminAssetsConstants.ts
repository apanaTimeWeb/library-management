import type { SuperadminAsset } from '../superadmin_assets_types/SuperadminAssetsTypes';

export const SUPERADMIN_ASSETS_MOCK_DATA: SuperadminAsset[] = [
  { id: 1, name: 'AC Unit — Hall A',       category: 'Appliance',  purchaseDate: '2023-06-01', purchaseValue: 45000, currentValue: 32000, location: 'Ground Floor', status: 'active'      },
  { id: 2, name: 'CCTV Camera Set (8)',     category: 'Security',   purchaseDate: '2022-11-15', purchaseValue: 28000, currentValue: 18000, location: 'All Floors',   status: 'active'      },
  { id: 3, name: 'Water Purifier',          category: 'Appliance',  purchaseDate: '2024-01-10', purchaseValue: 12000, currentValue: 10000, location: 'Ground Floor', status: 'maintenance' },
  { id: 4, name: 'Study Tables (20)',       category: 'Furniture',  purchaseDate: '2021-08-20', purchaseValue: 60000, currentValue: 35000, location: 'First Floor',  status: 'active'      },
  { id: 5, name: 'Biometric Scanner',       category: 'Security',   purchaseDate: '2023-03-05', purchaseValue: 8500,  currentValue: 6000,  location: 'Entrance',     status: 'active'      },
  { id: 6, name: 'Old Printer',             category: 'Electronics',purchaseDate: '2020-05-12', purchaseValue: 15000, currentValue: 0,     location: 'Store Room',   status: 'disposed'    },
];

export const SUPERADMIN_ASSETS_STATUS_STYLES: Record<string, string> = {
  active:      'bg-[var(--success-bg,rgba(52,211,153,0.1))] text-[var(--success)]',
  maintenance: 'bg-[var(--warning-bg,rgba(251,191,36,0.1))] text-[var(--warning)]',
  disposed:    'bg-[var(--bg-input)] text-[var(--text-secondary)]',
};
