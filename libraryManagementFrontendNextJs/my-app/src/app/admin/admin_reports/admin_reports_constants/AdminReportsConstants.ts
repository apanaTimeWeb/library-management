export const ADMIN_REPORTS_MOCK_BRANCH_DATA = [
  { branch: 'Main Branch',    revenue: '₹62,000', expense: '₹18,000', profit: '₹44,000', students: 248, occ: 92 },
  { branch: 'Branch 2',       revenue: '₹48,000', expense: '₹14,500', profit: '₹33,500', students: 180, occ: 85 },
  { branch: 'Kothrud Center', revenue: '₹28,000', expense: '₹9,000',  profit: '₹19,000', students: 95,  occ: 78 },
  { branch: 'Nashik Branch',  revenue: '₹14,000', expense: '₹5,000',  profit: '₹9,000',  students: 42,  occ: 60 },
];

export const ADMIN_REPORTS_BRANCH_TABLE_HEADERS = [
  'Branch', 'Revenue', 'Expenses', 'Net Profit', 'Students', 'Occupancy'
];

export const ADMIN_REPORTS_BRANCH_OPTIONS = [
  { label: 'All Branches', value: 'All Branches' },
  { label: 'Main Branch', value: 'Main Branch' },
  { label: 'Branch 2', value: 'Branch 2' },
  { label: 'Kothrud Center', value: 'Kothrud Center' },
  { label: 'Nashik Branch', value: 'Nashik Branch' },
];

export const ADMIN_REPORTS_AXIS_TICK = { fill: 'var(--text-secondary)', fontSize: 11 } as const;

export const ADMIN_REPORTS_TOOLTIP_STYLE = {
  contentStyle: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 10,
    fontSize: 12,
    color: 'var(--text-primary)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  },
  labelStyle:  { color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 4 },
  itemStyle:   { color: 'var(--text-primary)'   },
  cursor:      { fill: 'rgba(99,102,241,0.06)'  },
} as const;
