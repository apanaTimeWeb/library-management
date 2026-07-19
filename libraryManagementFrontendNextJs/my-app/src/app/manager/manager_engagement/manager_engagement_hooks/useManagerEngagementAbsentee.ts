// RESPONSIBILITY: Renders or handles logic for useManagerEngagementAbsentee.ts.
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AbsenteeRow } from '@/app/manager/manager_engagement/manager_engagement_types/ManagerEngagementTypes';

// DATA FLOW: Hook -> useManagerEngagementAbsentee -> Consuming UI Component
export function useManagerEngagementAbsentee() {
  const [data, setData] = useState<AbsenteeRow[]>([
    { id: '1', name: 'John Doe', initials: 'JD', smartId: 'S-101', shift: 'Morning', daysAbsent: 8, lastSeen: '2026-07-10', parentPhone: '9876543210', parentEmail: 'john@example.com', notified: false },
    { id: '2', name: 'Jane Smith', initials: 'JS', smartId: 'S-102', shift: 'Evening', daysAbsent: 4, lastSeen: '2026-07-14', parentPhone: '9876543211', parentEmail: 'jane@example.com', notified: false }
  ]);
  const [threshold, setThreshold] = useState('3');
  const [shift, setShift] = useState('All');
  const [toast, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  const filtered = data.filter(d => {
    if (threshold !== 'all' && d.daysAbsent < parseInt(threshold)) return false;
    if (shift !== 'All' && d.shift !== shift) return false;
    return true;
  });

  const critical = filtered.filter(d => d.daysAbsent >= 7);
  const moderate = filtered.filter(d => d.daysAbsent >= 3 && d.daysAbsent < 7);

  const notify = (id: string) => {
    setData(prev => prev.map(d => d.id === id ? { ...d, notified: true } : d));
    setToastType('success');
    setToastMsg('Notification sent to parent');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const notifyAll = () => {
    setData(prev => prev.map(d => ({ ...d, notified: true })));
    setToastType('success');
    setToastMsg(`Notifications sent to ${filtered.length} parents`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return {
    threshold, setThreshold,
    shift, setShift,
    toast, toastType,
    filtered, critical, moderate,
    notify, notifyAll
  };
}

