import { useState } from 'react';
import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { type ColDef, AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { gridTheme } from '@/app/manager/manager_reusable/gridTheme';
import type { ManagerReportsData, ManagerReportsTablesGridProps } from '@/app/manager/manager_reports/manager_reports_types/ManagerReportsTypes';

// RESPONSIBILITY: Renders the grid of AgGridReact tables for manager reports.

ModuleRegistry.registerModules([AllCommunityModule]);

function SmartIdCell(props: unknown) {
  return <span className="font-mono text-xs text-primary">{props.value}</span>;
}
function ShiftBadgeCell(props: unknown) {
  return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--info-bg,rgba(96,165,250,0.1))] text-info border border-info/20">{props.value}</span>;
}
function ShiftPrimaryCell(props: unknown) {
  return <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-subtle text-primary border border-primary/20">{props.value}</span>;
}
function DaysAbsentCell(props: unknown) {
  return <span className="text-danger font-bold">{props.value}</span>;
}
function LastPresentCell(props: unknown) {
  return <span className="text-text-secondary">{props.value}</span>;
}
function RateCell(props: unknown) {
  return <span className="text-success font-semibold">{props.value}</span>;
}
function PctCell(props: unknown) {
  return <span className="text-success font-semibold">{props.value}</span>;
}
function SecondaryCell(props: unknown) {
  return <span className="text-text-secondary">{props.value}</span>;
}
function PriorityCell(props: unknown) {
  const cls = props.value === 'High' ? 'bg-[var(--danger-bg,rgba(248,113,113,0.1))] text-danger border-danger/20' 
            : props.value === 'Medium' ? 'bg-[var(--warning-bg,rgba(251,191,36,0.1))] text-warning border-warning/20' 
            : 'bg-[var(--info-bg,rgba(96,165,250,0.1))] text-info border-info/20';
  return <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}>{props.value}</span>;
}


export function ManagerReportsTablesGrid({ data }: ManagerReportsTablesGridProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const absenteeCols = useMemo<ColDef[]>(() => [
    { field: 'name', headerName: 'NAME', flex: 2, sortable: true },
    { field: 'smartId', headerName: 'SMART ID', flex: 1, cellRenderer: SmartIdCell },
    { field: 'shift', headerName: 'SHIFT', flex: 1, sortable: true, cellRenderer: ShiftBadgeCell },
    { field: 'daysAbsent', headerName: 'ABSENT DAYS', flex: 1, sortable: true, cellRenderer: DaysAbsentCell },
    { field: 'lastPresent', headerName: 'LAST PRESENT', flex: 1, cellRenderer: LastPresentCell },
  ], []);

  const conversionCols = useMemo<ColDef[]>(() => [
    { field: 'month', headerName: 'MONTH', flex: 1, sortable: true },
    { field: 'newEnq', headerName: 'NEW ENQUIRIES', flex: 1, sortable: true },
    { field: 'converted', headerName: 'CONVERTED', flex: 1, sortable: true },
    { field: 'rate', headerName: 'RATE', flex: 1, cellRenderer: RateCell },
  ], []);

  const seatCols = useMemo<ColDef[]>(() => [
    { field: 'shift', headerName: 'SHIFT', flex: 1, sortable: true, cellRenderer: ShiftPrimaryCell },
    { field: 'occupancy', headerName: 'OCCUPANCY', flex: 1, sortable: true },
    { field: 'avgDuration', headerName: 'AVG DURATION', flex: 1, cellRenderer: SecondaryCell },
  ], []);

  const lockerCols = useMemo<ColDef[]>(() => [
    { field: 'type', headerName: 'TYPE', flex: 1, sortable: true },
    { field: 'occupied', headerName: 'OCCUPIED', flex: 1, sortable: true },
    { field: 'total', headerName: 'TOTAL', flex: 1 },
    { field: 'pct', headerName: '%', flex: 1, cellRenderer: PctCell },
  ], []);

  const maintenanceCols = useMemo<ColDef[]>(() => [
    { field: 'item', headerName: 'ITEM', flex: 2, sortable: true },
    { field: 'location', headerName: 'LOCATION', flex: 2, cellRenderer: SecondaryCell },
    { field: 'reported', headerName: 'REPORTED', flex: 1, cellRenderer: SecondaryCell },
    { field: 'priority', headerName: 'PRIORITY', flex: 1, sortable: true, cellRenderer: PriorityCell },
  ], []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-200">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Absentee Report</h3>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="Search in table..." 
            className="px-3 py-2 border border-border rounded-md text-sm bg-bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
<div style={{ height: 280 }}>
          <AgGridReact
              quickFilterText={searchTerm}
              pagination={true}
              paginationPageSize={10} theme={gridTheme} rowData={data.absenteeRows} columnDefs={absenteeCols} rowHeight={48} headerHeight={38} suppressMovableColumns suppressCellFocus defaultColDef={{ resizable: false }} />
        </div>
      </div>

      <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-200">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Enquiry Conversion Rate</h3>
        <div style={{ height: 280 }}>
          <AgGridReact
              quickFilterText={searchTerm}
              pagination={true}
              paginationPageSize={10} theme={gridTheme} rowData={data.conversionRows} columnDefs={conversionCols} rowHeight={48} headerHeight={38} suppressMovableColumns suppressCellFocus defaultColDef={{ resizable: false }} />
        </div>
      </div>

      <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-200">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Seat Utilization Report</h3>
        <div style={{ height: 260 }}>
          <AgGridReact
              quickFilterText={searchTerm}
              pagination={true}
              paginationPageSize={10} theme={gridTheme} rowData={data.seatRows} columnDefs={seatCols} rowHeight={48} headerHeight={38} suppressMovableColumns suppressCellFocus defaultColDef={{ resizable: false }} />
        </div>
      </div>

      <div className="bg-bg-card border border-border rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-200">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Locker Utilization Report</h3>
        <div style={{ height: 228 }}>
          <AgGridReact
              quickFilterText={searchTerm}
              pagination={true}
              paginationPageSize={10} theme={gridTheme} rowData={data.lockerRows} columnDefs={lockerCols} rowHeight={48} headerHeight={38} suppressMovableColumns suppressCellFocus defaultColDef={{ resizable: false }} />
        </div>
      </div>

      <div className="lg:col-span-2 bg-bg-card border border-border rounded-[var(--radius-lg)] p-5 hover:shadow-lg transition-all duration-200">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Pending Maintenance</h3>
        <div style={{ height: 260 }}>
          <AgGridReact
              quickFilterText={searchTerm}
              pagination={true}
              paginationPageSize={10} theme={gridTheme} rowData={data.maintenanceRows} columnDefs={maintenanceCols} rowHeight={48} headerHeight={38} suppressMovableColumns suppressCellFocus defaultColDef={{ resizable: false }} />
        </div>
      </div>
    </div>
  );
}
