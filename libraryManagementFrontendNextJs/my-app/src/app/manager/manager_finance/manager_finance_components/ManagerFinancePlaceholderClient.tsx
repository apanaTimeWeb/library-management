'use client';

import { Wrench } from 'lucide-react';
import Link from 'next/link';
import { MANAGER_FINANCE_ROUTES } from '@/app/manager/manager_finance/manager_finance_url_config';

export function ManagerFinancePlaceholderClient({ title, description }: { title: string, description: string }) {
  return (
    <div className="p-6 min-h-screen">
      <div className="mb-8">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Smart Library 360 › Finance</p>
        <h1 className="text-xl font-bold text-text-primary">{title}</h1>
        <p className="text-sm text-text-secondary mt-1.5">{description}</p>
      </div>

      <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-xl border-dashed mt-12 max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-bg-elevated text-text-secondary rounded-full flex items-center justify-center mb-6">
          <Wrench size={32} />
        </div>
        <h2 className="text-lg font-bold text-text-primary mb-2">Under Construction</h2>
        <p className="text-text-secondary mb-8">
          The {title} module is currently being built and integrated with the new design system.
        </p>
        <Link 
          href={MANAGER_FINANCE_ROUTES.PAYMENTS} 
          className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
