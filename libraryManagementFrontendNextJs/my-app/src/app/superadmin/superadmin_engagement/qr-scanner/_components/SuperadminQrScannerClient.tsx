'use client';
// RESPONSIBILITY: Renders the SuperadminQrScannerClient component.
import Link from 'next/link';
import { SUPERADMIN_ROUTES } from '@/app/superadmin/SuperadminUrlConfig';
import { ChevronRight, RefreshCw, CheckCircle, LogOut, X } from 'lucide-react';
import { useSuperadminQrScannerClient } from '@/app/superadmin/superadmin_engagement/qr-scanner/_components/useSuperadminQrScannerClient';

export function SuperadminQrScannerClient() {
  const {
    scanState, result, history, successMsg, manualId, setManualId, showManual, setShowManual,
    startScan, simulateScan, markAttendance, handleManual, reset
  } = useSuperadminQrScannerClient();

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-page animate-in fade-in zoom-in-95 duration-200">
      {/* â”€â”€ Breadcrumb â”€â”€ */}
      <div className="flex items-center gap-2 text-text-secondary text-xs font-bold tracking-wide mb-6">
        <Link href={SUPERADMIN_ROUTES.ENGAGEMENT_ATTENDANCE} className="hover:text-primary transition-colors">Engagement</Link>
        <ChevronRight size={12} className="opacity-50" />
        <span className="text-text-primary">QR Scanner</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">ðŸ“· QR Scanner</h1>
        <p className="text-sm text-text-secondary mt-1">Scan student ID cards to instantly mark attendance.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">

        {/* â”€â”€ Camera Viewport â”€â”€ */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
            <div>
              <div className="text-base font-extrabold text-text-primary">Camera Feed</div>
              <div className="text-xs text-text-secondary mt-0.5">
                {scanState === 'idle'     && 'Click Start Scan to activate camera'}
                {scanState === 'scanning' && 'Point camera at student ID card QR code'}
                {scanState === 'detected' && 'QR code detected â€” confirm attendance below'}
                {scanState === 'success'  && 'Attendance recorded successfully!'}
              </div>
            </div>
            {scanState !== 'idle' && (
              <button onClick={reset} className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-text-secondary hover:text-text-primary hover:bg-input rounded-md transition-colors cursor-pointer">
                <RefreshCw size={13}/> Reset
              </button>
            )}
          </div>

          <div
            className={`relative bg-black aspect-video flex items-center justify-center overflow-hidden transition-all duration-300 ${scanState === 'scanning' ? 'cursor-pointer hover:bg-black/90' : ''}`}
            onClick={scanState === 'scanning' ? simulateScan : undefined}
          >
            <div className="flex flex-col items-center justify-center text-center p-6 z-10">
              {scanState === 'success' ? (
                <div className="flex flex-col items-center text-success animate-in zoom-in duration-300">
                  <CheckCircle size={72} className="drop-shadow-lg" />
                  <p className="mt-4 text-lg font-extrabold text-white drop-shadow-md">{successMsg}</p>
                </div>
              ) : scanState === 'detected' ? (
                <div className="flex flex-col items-center text-success animate-in zoom-in duration-300">
                  <div className="bg-white rounded-full p-2 mb-4 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                    <CheckCircle size={48} className="text-success" />
                  </div>
                  <p className="text-lg font-extrabold text-white drop-shadow-md">QR Code Detected!</p>
                </div>
              ) : (
                <>
                  <div className={`text-5xl drop-shadow-lg transition-transform duration-500 ${scanState === 'scanning' ? 'scale-110' : 'opacity-50'}`}>
                    {scanState === 'scanning' ? 'ðŸ“·' : 'ðŸ”²'}
                  </div>
                  <p className="text-sm font-bold text-white/80 mt-4 tracking-wide uppercase">
                    {scanState === 'idle' ? 'Camera inactive' : 'Tap to simulate scan'}
                  </p>
                  {scanState === 'scanning' && (
                    <p className="text-xs text-white/50 mt-2 font-medium">Click anywhere in this area</p>
                  )}
                </>
              )}
            </div>

            {/* Corner guides */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-[var(--radius-lg)] opacity-50" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-[var(--radius-lg)] opacity-50" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-[var(--radius-lg)] opacity-50" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-[var(--radius-lg)] opacity-50" />

            {/* Scan animation line */}
            {scanState === 'scanning' && <div className="absolute left-0 right-0 h-0.5 bg-primary/70 shadow-[0_0_15px_rgba(var(--color-primary),0.8)] animate-[scan_2.5s_ease-in-out_infinite] pointer-events-none" />}
          </div>

          {/* Start button */}
          {scanState === 'idle' && (
            <div className="p-4 border-t border-border flex justify-center bg-muted/20">
              <button onClick={startScan} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:bg-primary/90 hover:scale-105 hover:shadow-lg transition-all active:scale-95 cursor-pointer">
                ðŸ“· Start Scanning
              </button>
            </div>
          )}
        </div>

        {/* â”€â”€ Detected Student Card â”€â”€ */}
        {scanState === 'detected' && result && (
          <div className="bg-card border-2 border-primary rounded-xl shadow-lg overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-5 flex items-center justify-between border-b border-border bg-primary/5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-extrabold text-primary shadow-inner">{result.initials}</div>
                <div>
                  <div className="text-lg font-extrabold text-text-primary">{result.name}</div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs font-bold text-text-secondary font-mono">{result.smartId}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">{result.shift}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-success/10 text-success uppercase tracking-wider">{result.plan}</span>
                  </div>
                  <div className="text-xs text-text-secondary mt-1">Valid till: <span className="font-medium text-text-primary">{result.validTill}</span></div>
                </div>
              </div>
              <button onClick={reset} className="h-8 w-8 rounded-full hover:bg-input flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer self-start">
                <X size={16}/>
              </button>
            </div>
            <div className="p-4 bg-muted/30 flex items-center gap-3 justify-end">
              <button onClick={() => markAttendance('IN')} className="flex items-center gap-2 px-5 py-2.5 bg-success text-white text-sm font-bold rounded-md hover:bg-success/90 hover:shadow-md transition-all active:scale-95 cursor-pointer">
                <CheckCircle size={16} /> Mark IN
              </button>
              <button onClick={() => markAttendance('OUT')} className="flex items-center gap-2 px-5 py-2.5 bg-danger text-white text-sm font-bold rounded-md hover:bg-danger/90 hover:shadow-md transition-all active:scale-95 cursor-pointer">
                <LogOut size={16} /> Mark OUT
              </button>
            </div>
          </div>
        )}

        {/* â”€â”€ Recent History â”€â”€ */}
        {history.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
            <div className="text-sm font-extrabold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Recent Scans
            </div>
            <div className="space-y-2">
              {history.map((h: any) => (
                <div key={h.id} className="flex items-center gap-4 p-3 rounded-md border border-border/50 bg-input/30 hover:bg-input transition-colors">
                  <span className={`px-2.5 py-1 rounded-sm text-xs font-bold uppercase tracking-wider w-14 text-center ${h.type==='IN' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                    {h.type}
                  </span>
                  <span className="flex-1 text-sm font-bold text-text-primary truncate">{h.name}</span>
                  <span className="text-xs font-medium text-text-secondary">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€ Manual Fallback â”€â”€ */}
        <div className="flex justify-center pt-2">
          {!showManual ? (
            <button onClick={() => setShowManual(true)} className="text-xs font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer hover:underline underline-offset-4">
              Can't scan? Enter Smart ID manually â†’
            </button>
          ) : (
            <div className="w-full bg-card border border-border rounded-lg p-5 shadow-sm animate-in zoom-in-95 duration-200">
              <div className="text-sm font-extrabold text-text-primary mb-4 border-b border-border pb-3">Manual Entry</div>
              <div className="space-y-2 mb-5">
                <label className="text-xs font-bold text-text-primary flex gap-1">Smart ID <span className="text-danger">*</span></label>
                <input 
                  className="w-full h-10 px-3 bg-input border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-text-secondary" 
                  placeholder="e.g. SL-001"
                  value={manualId} 
                  onChange={e => setManualId(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleManual('IN')} 
                />
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => handleManual('IN')} disabled={!manualId.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-success text-white text-sm font-bold rounded-md hover:bg-success/90 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                  <CheckCircle size={16} /> Mark IN
                </button>
                <button onClick={() => handleManual('OUT')} disabled={!manualId.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-danger text-white text-sm font-bold rounded-md hover:bg-danger/90 hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                  <LogOut size={16} /> Mark OUT
                </button>
                <button onClick={() => setShowManual(false)} className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-input border border-transparent hover:border-border rounded-md transition-colors cursor-pointer">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

