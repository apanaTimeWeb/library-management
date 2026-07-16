'use client';
import React from 'react';
import { useSuperadminFinancialReports } from '@/app/superadmin/superadmin_accounting/financial-reports/superadmin_financial_reports_hooks/useSuperadminFinancialReports';
import { SuperadminFinancialReportsHeader } from '@/app/superadmin/superadmin_accounting/financial-reports/superadmin_financial_reports_components/SuperadminFinancialReportsHeader';
import { SuperadminFinancialReportsKpiCards } from '@/app/superadmin/superadmin_accounting/financial-reports/superadmin_financial_reports_components/SuperadminFinancialReportsKpiCards';
import { SuperadminFinancialReportsBarChart } from '@/app/superadmin/superadmin_accounting/financial-reports/superadmin_financial_reports_components/SuperadminFinancialReportsBarChart';
import { SuperadminFinancialReportsBreakdown } from '@/app/superadmin/superadmin_accounting/financial-reports/superadmin_financial_reports_components/SuperadminFinancialReportsBreakdown';

export function SuperadminFinancialReportsClient() {
  const { 
    period, 
    setPeriod, 
    monthlyData, 
    categoryBreakdown, 
    totalIncome, 
    totalExpense, 
    netProfit, 
    maxIncome 
  } = useSuperadminFinancialReports();

  return (
    <div className="relative p-2 sm:p-4">
      <SuperadminFinancialReportsHeader period={period} setPeriod={setPeriod} />
      
      <SuperadminFinancialReportsKpiCards 
        totalIncome={totalIncome} 
        totalExpense={totalExpense} 
        netProfit={netProfit} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <SuperadminFinancialReportsBarChart 
          monthlyData={monthlyData} 
          maxIncome={maxIncome} 
        />
        
        <SuperadminFinancialReportsBreakdown 
          categoryBreakdown={categoryBreakdown} 
        />
      </div>
    </div>
  );
}
