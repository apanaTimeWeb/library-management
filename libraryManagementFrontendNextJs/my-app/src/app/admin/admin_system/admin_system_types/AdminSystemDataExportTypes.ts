import React from 'react';

export interface AdminSystemExportModule {
  id: string;
  label: string;
  description: string;
  icon: string;
  estimatedRows: number;
  formats: string[];
}

export interface AdminSystemQuickExport {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  format: string;
}
