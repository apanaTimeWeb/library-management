'use client';
// RESPONSIBILITY: Renders the ManagerStudentsIdCard.tsx component.
import React from 'react';
import { Phone, Shield, Wifi } from 'lucide-react';

import { IdCardData } from '@/app/manager/manager_students/manager_students_types';

/* ── Barcode SVG stripes — deterministic from ID ── */
function BarcodeStripes({ id }: { id: string }) {
  const bars: { width: number; gap: number }[] = [];
  for (let i = 0; i < 28; i++) {
    const code = id.charCodeAt(i % id.length) + i * 3;
    bars.push({ width: (code % 3) + 1, gap: (code % 2) + 1 });
  }
  return (
    <svg width="110" height="36" viewBox="0 0 110 36" xmlns="http://www.w3.org/2000/svg">
      {bars.reduce<{ x: number; els: React.ReactElement[] }>(
        (acc, bar, i) => {
          const el = (
            <rect key={i} x={acc.x} y="0" width={bar.width} height="36"
              fill={i % 5 === 0 ? '#6366F1' : i % 3 === 0 ? '#8B5CF6' : '#C0C1FF'} rx="0.5" />
          );
          return { x: acc.x + bar.width + bar.gap, els: [...acc.els, el] };
        },
        { x: 0, els: [] }
      ).els}
    </svg>
  );
}

/* ── QR-pattern visual — deterministic ── */
function QrPattern({ id }: { id: string }) {
  const pattern: boolean[] = [];
  for (let i = 0; i < 25; i++) {
    const c = id.charCodeAt(i % id.length) + i;
    pattern.push(c % 3 !== 0);
  }
  [0, 1, 5, 6, 4, 9, 20, 21, 24, 19, 15].forEach(idx => { pattern[idx] = true; });
  return (
    <div className="grid grid-cols-5 gap-0.5 p-1 bg-white w-[52px] h-[52px]" aria-label={`QR code for ${id}`}>
      {pattern.map((on, i) => (
        <div key={i} className={`w-2 h-2 ${on ? 'bg-black' : 'bg-gray-100'}`} />
      ))}
    </div>
  );
}

import { ManagerStudentsIdCardProps } from '@/app/manager/manager_students/manager_students_types';

export default function ManagerStudentsIdCard({ data }: ManagerStudentsIdCardProps) {
  const initials = data.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const shiftLabel = data.shift.split(' ')[0];
  const avatarColors = ['#6366F1', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
  const colorIdx = data.smartId.charCodeAt(data.smartId.length - 1) % avatarColors.length;
  const avatarColor = avatarColors[colorIdx];

  return (
    <div className="flex items-center justify-center p-4">
      {/* ── FRONT of ID card ── */}
      <div className="relative w-[340px] bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 text-gray-900 font-sans" id="student-id-card-print">

        {/* Holographic diagonal lines overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(45deg,transparent_25%,var(--border)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" aria-hidden="true" />

        {/* ── Header band ── */}
        <div className="bg-bg-elevated text-white p-4 flex justify-between items-start relative z-10">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📚</div>
            <div>
              <div className="text-sm font-bold tracking-wider leading-tight">SMART LIBRARY 360</div>
              <div className="text-[9px] font-semibold text-gray-400 tracking-widest uppercase">{data.branch ?? 'MAIN BRANCH'}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Wifi size={14} color="rgba(255,255,255,0.7)" />
            <div className="text-[8px] font-bold tracking-widest border border-white/30 rounded px-1.5 py-0.5">STUDENT ID</div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-5 relative z-10 bg-white">

          {/* Profile row */}
          <div className="flex gap-4 items-center mb-5">
            {/* Photo avatar with color */}
            <div className="relative w-16 h-16 rounded-xl flex items-center justify-center border-2 shadow-sm shrink-0" style={{ background: `linear-gradient(135deg, ${avatarColor}55, ${avatarColor}22)`, borderColor: `${avatarColor}88` }}>
              <span className="text-xl font-bold" style={{ color: avatarColor }}>{initials}</span>
              {/* Chip icon on avatar */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-6 bg-yellow-400 rounded-sm border border-yellow-500 flex flex-col justify-evenly p-0.5 shadow-sm">
                <div className="w-full h-[1px] bg-yellow-600/50" />
                <div className="w-full h-[1px] bg-yellow-600/50" />
                <div className="w-full h-[1px] bg-yellow-600/50" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-gray-900 truncate leading-tight">{data.name}</p>
              {data.college && <p className="text-[10px] text-text-secondary truncate mt-1">🎓 {data.college}</p>}
              <p className="flex items-center gap-1 text-[11px] font-medium text-text-secondary mt-1.5">
                <Phone size={10} /> {data.phone}
              </p>
            </div>
          </div>

          {/* Colored divider */}
          <div className="flex w-full h-1 rounded-full overflow-hidden mb-5">
            <div className="flex-1" style={{ background: '#6366F1' }} />
            <div className="flex-1" style={{ background: '#8B5CF6' }} />
            <div className="flex-1" style={{ background: '#3B82F6' }} />
            <div className="flex-1" style={{ background: '#10B981' }} />
          </div>

          {/* Details grid — 4 boxes */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            <div className="border-t-2 pt-1.5" style={{ borderTopColor: '#6366F1' }}>
              <div className="text-[8px] font-bold text-gray-500 tracking-widest">⏰ SHIFT</div>
              <div className="text-[11px] font-bold text-gray-900 mt-0.5 truncate">{shiftLabel}</div>
            </div>
            <div className="border-t-2 pt-1.5" style={{ borderTopColor: '#8B5CF6' }}>
              <div className="text-[8px] font-bold text-gray-500 tracking-widest">💺 SEAT</div>
              <div className="text-[11px] font-bold text-gray-900 mt-0.5 truncate">{data.seat}</div>
            </div>
            <div className="border-t-2 pt-1.5" style={{ borderTopColor: '#3B82F6' }}>
              <div className="text-[8px] font-bold text-text-secondary tracking-widest">📋 PLAN</div>
              <div className="text-[11px] font-bold text-text-primary mt-0.5 truncate">{data.plan.split(' ')[0]}</div>
            </div>
            <div>
              <div className="text-[8px] font-bold text-text-secondary tracking-widest">🔐 LOCKER</div>
              <div className="text-[11px] font-bold text-text-primary mt-0.5 truncate">{data.locker === 'None' ? 'N/A' : data.locker.split(' ')[0]}</div>
            </div>
          </div>

          {/* Validity row */}
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2.5 mb-5 border border-gray-100">
            <div>
              <div className="text-[8px] font-bold text-text-secondary tracking-widest mb-0.5">VALID FROM</div>
              <div className="text-[10px] font-bold text-text-primary">{data.joinDate}</div>
            </div>
            <div className="text-border text-[10px]">▶</div>
            <div className="text-right">
              <div className="text-[8px] font-bold text-text-secondary tracking-widest mb-0.5">EXPIRES</div>
              <div className="text-[10px] font-bold text-danger">{data.expiryDate}</div>
            </div>
          </div>

          {/* QR + Barcode row */}
          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <div className="flex flex-col items-center gap-1">
              <QrPattern id={data.smartId} />
              <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Scan to Verify</span>
            </div>

            <div className="flex flex-col items-center flex-1 mx-4">
              <BarcodeStripes id={data.smartId} />
              <span className="text-[9px] font-mono font-bold tracking-widest mt-1">{data.smartId}</span>
              <span className="text-[7px] font-bold text-text-secondary uppercase tracking-widest">Member ID</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end justify-center">
            <div className="flex flex-col items-center border border-success/30 bg-success-bg px-2 py-1 rounded">
              <span className="text-[8px] font-bold text-success tracking-widest">VERIFIED</span>
              <span className="text-[6px] font-semibold text-success/70 uppercase tracking-wider">Tamper Evident</span>
            </div>
          </div>
        </div>

        {/* Rainbow holographic stripe at bottom */}
        <div className="h-1.5 w-full bg-[linear-gradient(90deg,#6366F1,#8B5CF6,#3B82F6,#10B981,#F59E0B,#EF4444)]" aria-hidden="true" />
      </div>
    </div>
  );
}
