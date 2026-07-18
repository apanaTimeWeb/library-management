// RESPONSIBILITY: Provides state and logic for QrScannerClient
import { useState } from 'react';


export type ScanResult = any;

const MOCK_QR_STUDENT: ScanResult = {
  name: 'Rahul Sharma',
  smartId: 'SL-0042',
  initials: 'RS',
  shift: 'Morning',
  plan: 'Premium',
  validTill: '31 Dec 2026'
};

export function useQrScannerClient() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'detected' | 'success'>('idle');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState<Array<any>>([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [manualId, setManualId] = useState('');
  const [showManual, setShowManual] = useState(false);

  const startScan = () => setScanState('scanning');

  const simulateScan = () => {
    if (scanState !== 'scanning') return;
    setScanState('detected');
    setResult(MOCK_QR_STUDENT);
  };

  const markAttendance = (type: 'IN' | 'OUT') => {
    const student = result;
    if (!student) return;
    const time = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    setSuccessMsg(`${student.name} marked ${type} at ${time}`);
    setHistory(h => [{
      name: student.name, type, time,
      id: student.smartId + '-' + Date.now(),
    }, ...h.slice(0, 4)]);
    setScanState('success');
    setTimeout(() => { setScanState('idle'); setResult(null); setSuccessMsg(''); }, 3000);
  };

  const handleManual = (type: 'IN' | 'OUT') => {
    if (!manualId.trim()) return;
    const time = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    setSuccessMsg(`Smart ID ${manualId} marked ${type} at ${time}`);
    setHistory(h => [{ name: `#${manualId}`, type, time, id: manualId + Date.now() }, ...h.slice(0,4)]);
    setScanState('success');
    setManualId(''); setShowManual(false);
    setTimeout(() => { setScanState('idle'); setSuccessMsg(''); }, 3000);
  };

  const reset = () => { setScanState('idle'); setResult(null); setSuccessMsg(''); };

  return {
    scanState, result, history, successMsg, manualId, setManualId, showManual, setShowManual,
    startScan, simulateScan, markAttendance, handleManual, reset
  };
}
