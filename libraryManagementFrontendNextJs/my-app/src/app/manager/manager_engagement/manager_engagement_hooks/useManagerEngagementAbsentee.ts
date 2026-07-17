import { useState } from 'react';
import toast from 'react-hot-toast';
import { AbsenteeRecord } from '@/app/manager/manager_engagement/manager_engagement_types/ManagerEngagementTypes';

export function useManagerEngagementAbsentee(mockData: AbsenteeRecord[]) {
  const [data, setData] = useState<AbsenteeRecord[]>(mockData);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dispatching, setDispatching] = useState(false);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map(d => d.id));
    }
  };

  const handleDispatch = async () => {
    if (selectedIds.length === 0) return;
    setDispatching(true);
    
    setTimeout(() => {
      setData(prev => prev.map(d => 
        selectedIds.includes(d.id) 
          ? { ...d, actionTaken: true, actionType: 'WhatsApp Reminder', actionDate: new Date().toLocaleDateString('en-GB') } 
          : d
      ));
      toast.success(`Reminders dispatched for ${selectedIds.length} absentees.`);
      setSelectedIds([]);
      setDispatching(false);
    }, 1200);
  };

  return {
    data,
    selectedIds,
    dispatching,
    toggleSelection,
    selectAll,
    handleDispatch
  };
}
