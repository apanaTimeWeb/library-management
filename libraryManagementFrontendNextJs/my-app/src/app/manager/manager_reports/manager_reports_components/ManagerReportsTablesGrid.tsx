import { useState } from 'react';
import React from 'react';
import type { ManagerReportsData, ManagerReportsTablesGridProps } from '@/app/manager/manager_reports/manager_reports_types/ManagerReportsTypes';
import { TablePagination } from '@/components/ui/table-pagination';

// RESPONSIBILITY: Renders the grid of native HTML tables for manager reports.

function SmartIdCell(props: { value: string }) {
  return <span className="font-mono text-xs text-primary">{props.value}</span>;
}
function ShiftBadgeCell(props: { value: string }) {
  return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-info-bg text-info border border-info-bg">{props.value}</span>;
}
function ShiftPrimaryCell(props: { value: string }) {
  return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-subtle text-primary border border-primary/20">{props.value}</span>;
}
function DaysAbsentCell(props: { value: number }) {
  return <span className="text-danger font-bold">{props.value}</span>;
}
function LastPresentCell(props: { value: string }) {
  return <span className="text-text-secondary">{props.value}</span>;
}
function RateCell(props: { value: string }) {
  return <span className="text-success font-semibold">{props.value}</span>;
}
function PctCell(props: { value: string }) {
  return <span className="text-success font-semibold">{props.value}</span>;
}
function SecondaryCell(props: { value: string | number }) {
  return <span className="text-text-secondary">{props.value}</span>;
}
function PriorityCell(props: { value: string }) {
  const cls = props.value === 'High' ? 'bg-danger-bg text-danger border-danger-bg' 
            : props.value === 'Medium' ? 'bg-warning-bg text-warning border-warning-bg' 
            : 'bg-info-bg text-info border-info-bg';
  return <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}>{props.value}</span>;
}

function ReportTable<T extends Record<string, unknown>>({ 
  title, 
  headers, 
  data, 
  renderRow,
  searchTerm
}: { 
  title: string, 
  headers: string[], 
  data: T[], 
  renderRow: (row: T, i: number) => React.ReactNode,
  searchTerm: string
}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const filtered = data.filter(item => {
    if (!searchTerm) return true;
    return Object.values(item).some(v => String(v).toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
      <h3 className="text-sm font-semibold text-text-primary mb-4">{title}</h3>
      <div className="flex-1 w-full overflow-x-auto border border-border rounded-xl mb-4">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-bg-elevated border-b border-border">
            <tr className="text-text-secondary text-xs uppercase tracking-wider">
              {headers.map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-bg-card">
            {filtered.slice((page - 1) * limit, page * limit).map((row, i) => (
              <tr key={i} className="hover:bg-bg-page transition-colors">
                {renderRow(row, i)}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="px-4 py-8 text-center text-text-secondary">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-auto">
        <TablePagination
          page={page}
          limit={limit}
          totalItems={filtered.length}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </div>
    </div>
  );
}

export function ManagerReportsTablesGrid({ data }: ManagerReportsTablesGridProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Search Input for All Tables */}
      <div className="lg:col-span-2 flex justify-end">
        <input 
          type="text" 
          placeholder="Search all reports..." 
          className="px-3 py-2 border border-border rounded-md text-sm bg-bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ReportTable 
        title="Absentee Report"
        headers={['NAME', 'SMART ID', 'SHIFT', 'ABSENT DAYS', 'LAST PRESENT']}
        data={data.absenteeRows}
        searchTerm={searchTerm}
        renderRow={(row) => (
          <>
            <td className="px-4 py-4 font-semibold text-text-primary">{row.name}</td>
            <td className="px-4 py-4"><SmartIdCell value={row.smartId} /></td>
            <td className="px-4 py-4"><ShiftBadgeCell value={row.shift} /></td>
            <td className="px-4 py-4"><DaysAbsentCell value={row.daysAbsent} /></td>
            <td className="px-4 py-4"><LastPresentCell value={row.lastPresent} /></td>
          </>
        )}
      />

      <ReportTable 
        title="Enquiry Conversion Rate"
        headers={['MONTH', 'NEW ENQUIRIES', 'CONVERTED', 'RATE']}
        data={data.conversionRows}
        searchTerm={searchTerm}
        renderRow={(row) => (
          <>
            <td className="px-4 py-4 font-semibold text-text-primary">{row.month}</td>
            <td className="px-4 py-4">{row.newEnq}</td>
            <td className="px-4 py-4">{row.converted}</td>
            <td className="px-4 py-4"><RateCell value={row.rate} /></td>
          </>
        )}
      />

      <ReportTable 
        title="Seat Utilization Report"
        headers={['SHIFT', 'OCCUPANCY', 'AVG DURATION']}
        data={data.seatRows}
        searchTerm={searchTerm}
        renderRow={(row) => (
          <>
            <td className="px-4 py-4"><ShiftPrimaryCell value={row.shift} /></td>
            <td className="px-4 py-4 font-semibold text-text-primary">{row.occupancy}</td>
            <td className="px-4 py-4"><SecondaryCell value={row.avgDuration} /></td>
          </>
        )}
      />

      <ReportTable 
        title="Locker Utilization Report"
        headers={['TYPE', 'OCCUPIED', 'TOTAL', '%']}
        data={data.lockerRows}
        searchTerm={searchTerm}
        renderRow={(row) => (
          <>
            <td className="px-4 py-4 font-semibold text-text-primary">{row.type}</td>
            <td className="px-4 py-4">{row.occupied}</td>
            <td className="px-4 py-4">{row.total}</td>
            <td className="px-4 py-4"><PctCell value={row.pct} /></td>
          </>
        )}
      />

      <div className="lg:col-span-2">
        <ReportTable 
          title="Pending Maintenance"
          headers={['ITEM', 'LOCATION', 'REPORTED', 'PRIORITY']}
          data={data.maintenanceRows}
          searchTerm={searchTerm}
          renderRow={(row) => (
            <>
              <td className="px-4 py-4 font-semibold text-text-primary">{row.item}</td>
              <td className="px-4 py-4"><SecondaryCell value={row.location} /></td>
              <td className="px-4 py-4"><SecondaryCell value={row.reported} /></td>
              <td className="px-4 py-4"><PriorityCell value={row.priority} /></td>
            </>
          )}
        />
      </div>
    </div>
  );
}
