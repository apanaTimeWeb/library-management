'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, X, RefreshCw } from 'lucide-react';
import { ScanResult, ScanState } from '@/app/manager/manager_engagement/manager_engagement_types/ManagerEngagementTypes';
import { MOCK_STUDENT } from '@/app/manager/manager_engagement/manager_engagement_constants/ManagerEngagementConstants';
import { MANAGER_ROUTES } from '@/app/manager/manager_url_config';

// RESPONSIBILITY: Provides the QR code scanning interface, displays result overlays, and manages scan history.
export function ManagerEngagementQrScannerClient() {
  const [scanState, setScanState]   = useState<ScanState>('idle');
  const [result, setResult]         = useState<ScanResult | null>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [history, setHistory]       = useState<{name:string;type:string;time:string;id:string}[]>([]);
  const [manualId, setManualId]     = useState('');
  const [showManual, setShowManual] = useState(false);

  const startScan = () => setScanState('scanning');

  const simulateScan = () => {
    if (scanState !== 'scanning') return;
    setScanState('detected');
    setResult(MOCK_STUDENT);
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

  return (
    <div className="p-6 min-h-screen relative">
      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Link href={MANAGER_ROUTES.ENGAGEMENT_ATTENDANCE}>Engagement</Link>
        <ChevronRight size={12} className="mx-1"/>
        <span>QR Scanner</span>
      </div>

      <div className="mb-8">
        <h1 className="text-xl font-bold text-text-primary">ðŸ“· QR Scanner</h1>
        <p className="text-sm text-text-secondary mt-1.5">Scan student ID cards to instantly mark attendance.</p>
      </div>

      <div className="max-w-md mx-auto">

        {/* â”€â”€ Camera Viewport â”€â”€ */}
        <div className="bg-card rounded-xl border border-border p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-base font-semibold text-text-primary">Camera Feed</div>
              <div className="text-sm text-text-secondary mt-1">
                {scanState === 'idle'     && 'Click Start Scan to activate camera'}
                {scanState === 'scanning' && 'Point camera at student ID card QR code'}
                {scanState === 'detected' && 'QR code detected â€” confirm attendance below'}
                {scanState === 'success'  && 'Attendance recorded successfully!'}
              </div>
            </div>
            {scanState !== 'idle' && (
              <button onClick={reset} className="bg-transparent border border-border text-text-primary rounded-lg h-8 px-3 text-xs font-medium hover:bg-primary-subtle hover:border-primary transition-colors inline-flex items-center gap-2">
                <RefreshCw size={13}/> Reset
              </button>
            )}
          </div>

          <div
            className="aspect-square bg-bg-pagelack rounded-lg relative overflow-hidden flex items-center justify-center cursor-pointer border-2 border-transparent data-[scanning=true]:border-primary"
            data-scanning={scanState === 'scanning' ? 'true' : undefined}
            onClick={scanState === 'scanning' ? simulateScan : undefined}
          >
            <div className="flex flex-col items-center justify-center text-center p-6 text-white z-10">
              {scanState === 'success' ? (
                <div className="animate-in zoom-in duration-300 flex flex-col items-center">
                  <CheckCircle size={72} className="text-success mb-2 drop-shadow-md"/>
                  <p className="text-sm font-bold bg-bg-pagelack/60 px-3 py-1.5 rounded-full backdrop-blur-sm">{successMsg}</p>
                </div>
              ) : scanState === 'detected' ? (
                <div className="animate-in zoom-in duration-300 flex flex-col items-center">
                  <div className="text-5xl mb-2 drop-shadow-md">âœ…</div>
                  <p className="text-sm font-bold bg-bg-pagelack/60 px-3 py-1.5 rounded-full backdrop-blur-sm">QR Code Detected!</p>
                </div>
              ) : (
                <>
                  <div className="text-5xl opacity-50 mb-2">
                    {scanState === 'scanning' ? 'ðŸ“·' : 'ðŸ”²'}
                  </div>
                  <p className="text-sm font-medium opacity-80">
                    {scanState === 'idle' ? 'Camera inactive' : 'Tap to simulate scan'}
                  </p>
                  {scanState === 'scanning' && (
                    <p className="text-xs opacity-60 mt-1">Click anywhere in this area</p>
                  )}
                </>
              )}
            </div>

            {/* Corner guides */}
            <div className="absolute w-8 h-8 border-primary z-20 top-4 left-4 border-t-4 border-l-4 rounded-tl-lg"/>
            <div className="absolute w-8 h-8 border-primary z-20 top-4 right-4 border-t-4 border-r-4 rounded-tr-lg"/>
            <div className="absolute w-8 h-8 border-primary z-20 bottom-4 left-4 border-b-4 border-l-4 rounded-bl-lg"/>
            <div className="absolute w-8 h-8 border-primary z-20 bottom-4 right-4 border-b-4 border-r-4 rounded-br-lg"/>

            {/* Scan animation line */}
            {scanState === 'scanning' && <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_8px_var(--primary)] z-30 animate-pulse"/>}
          </div>

          {/* Start button */}
          {scanState === 'idle' && (
            <button onClick={startScan} className="w-full mt-4 bg-primary text-white rounded-lg px-5 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors inline-flex items-center justify-center gap-2">
              ðŸ“· Start Scanning
            </button>
          )}
        </div>

        {/* â”€â”€ Detected Student Card â”€â”€ */}
        {scanState === 'detected' && result && (
          <div className="bg-card rounded-xl border border-border p-5 mb-4 shadow-lg animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-start gap-4 mb-5 relative">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-bold shrink-0">{result.initials}</div>
              <div className="flex-1 min-w-0 pr-8">
                <div className="text-base font-bold text-text-primary truncate">{result.name}</div>
                <div className="flex items-center gap-2 mt-1 mb-1.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-text-secondary bg-card px-1.5 py-0.5 rounded">{result.smartId}</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary">{result.shift}</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold bg-success-bg text-success">{result.plan}</span>
                </div>
                <div className="text-xs text-text-secondary">Valid till: {result.validTill}</div>
              </div>
              <button onClick={reset} className="absolute top-0 right-0 w-8 h-8 rounded-lg border border-transparent text-text-secondary inline-flex items-center justify-center hover:bg-bg-pagelack/5 dark:hover:bg-white/10 transition-colors">
                <X size={15}/>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => markAttendance('IN')} className="bg-success text-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-colors flex items-center justify-center gap-2">
                âœ… Mark IN
              </button>
              <button onClick={() => markAttendance('OUT')} className="bg-danger text-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-colors flex items-center justify-center gap-2">
                ðŸ”š Mark OUT
              </button>
            </div>
          </div>
        )}

        {/* â”€â”€ Recent History â”€â”€ */}
        {history.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-6 mb-4">
            <div className="text-base font-semibold text-text-primary mb-4">Recent Scans</div>
            {history.map(h => (
              <div key={h.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${h.type==='IN' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`}>
                  {h.type}
                </span>
                <span className="flex-1 text-sm font-medium text-text-primary truncate">{h.name}</span>
                <span className="text-xs text-text-secondary">{h.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* â”€â”€ Manual Fallback â”€â”€ */}
        <div className="text-center mt-6">
          {!showManual ? (
            <button onClick={() => setShowManual(true)} className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
              Can't scan? Enter Smart ID manually â†’
            </button>
          ) : (
            <div className="bg-card rounded-xl border border-border p-6 mt-4 text-left animate-in fade-in duration-200">
              <div className="text-base font-bold text-text-primary mb-4">Manual Entry</div>
              <div className="flex flex-col mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-1.5">Smart ID <span className="text-danger ml-1">*</span></label>
                <input className="w-full bg-input border border-border rounded-lg px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary font-mono uppercase" placeholder="e.g. SL-001"
                  value={manualId} onChange={e => setManualId(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleManual('IN')} />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => handleManual('IN')} disabled={!manualId.trim()}
                  className="bg-success text-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-colors flex items-center justify-center gap-2 flex-1 disabled:opacity-50">âœ… Mark IN</button>
                <button onClick={() => handleManual('OUT')} disabled={!manualId.trim()}
                  className="bg-danger text-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition-colors flex items-center justify-center gap-2 flex-1 disabled:opacity-50">ðŸ”š Mark OUT</button>
                <button onClick={() => setShowManual(false)} className="bg-transparent border border-border text-text-primary rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-primary-subtle hover:border-primary transition-colors flex items-center justify-center gap-2 flex-1">Cancel</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

