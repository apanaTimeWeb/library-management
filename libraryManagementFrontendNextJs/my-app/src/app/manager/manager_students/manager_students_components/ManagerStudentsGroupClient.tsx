'use client';
// RESPONSIBILITY: Renders the ManagerStudentsGroupClient.tsx component.
import React from 'react';
import { Users2, Plus, Upload, Download } from 'lucide-react';
import Link from 'next/link';

export function ManagerStudentsGroupClient() {
  return (
    <div className="p-6 min-h-screen">
      <div className="p-6 min-h-screen-header">
        <div>
          <Link href="/manager/manager_students" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-4">
            ← Back to Students
          </Link>
          <h1 className="text-[22px] font-bold text-text-primary">Group Admission</h1>
        </div>
        <div className="p-6 min-h-screen-actions">
          <button className="bg-transparent border border-border text-text-primary rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2">
            <Download size={16} />
            <span>Download Excel Template</span>
          </button>
          <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2">
            <Plus size={16} />
            <span>New Group</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center text-center gap-4 border-dashed border-2 border-border bg-transparent hover:border-primary transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-primary-subtle flex items-center justify-center text-primary mb-2">
            <Upload size={28} />
          </div>
          <div>
            <h3 className="text-text-primary font-semibold mb-1">Bulk Upload (Excel/CSV)</h3>
            <p className="text-text-secondary text-sm max-w-[250px]">Upload multiple student records at once using our standard template.</p>
          </div>
          <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2 mt-2">Choose File</button>
        </div>

        <div className="bg-bg-card rounded-xl border border-border p-6 flex flex-col items-center justify-center text-center gap-4 border-dashed border-2 border-border bg-transparent hover:border-success transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-[color-mix(in_srgb,var(--success)_15%,transparent)] flex items-center justify-center text-success mb-2">
            <Users2 size={28} />
          </div>
          <div>
            <h3 className="text-text-primary font-semibold mb-1">Manual Group Entry</h3>
            <p className="text-text-secondary text-sm max-w-[250px]">Manually add multiple students who are joining together (e.g., friends sharing a plan).</p>
          </div>
          <button className="bg-primary text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-primary-hover transition-colors inline-flex items-center gap-2 mt-2 bg-success border-none">Start Manual Entry</button>
        </div>
      </div>

      <div className="bg-bg-card rounded-xl border border-border p-6 mt-6">
        <h3 className="font-semibold text-text-primary mb-4">Recent Group Admissions</h3>
        <div className="text-center text-text-secondary py-12">
          No recent group admissions found.
        </div>
      </div>
    </div>
  );
}
