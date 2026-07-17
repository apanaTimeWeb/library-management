export type AdminFinanceTrustScoreStudent = {
  rank: number;
  studentName: string;
  smartId: string;
  shift: 'Morning' | 'Evening' | 'Full Day';
  trustScore: number;
  totalPromises: number;
  timesChanged: number;
  fulfilledCount: number;
  badge: 'reliable' | 'moderate' | 'low';
};
