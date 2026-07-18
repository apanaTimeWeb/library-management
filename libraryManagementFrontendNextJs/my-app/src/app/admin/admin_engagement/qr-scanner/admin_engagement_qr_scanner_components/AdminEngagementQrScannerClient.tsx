'use client';
// RESPONSIBILITY: Entry page for the admin_engagement module.
// DATA FLOW: Next.js Router -> page -> Components

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, CheckCircle, X, RefreshCw, Camera, QrCode } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScanResult, ScanState } from "./AdminEngagementQrScannerClient_types";

const MOCK_STUDENT: ScanResult = {
  name: 'Rahul Sharma', initials: 'RS',
  smartId: 'SL-001', shift: 'Morning',
  validTill: '30 Jun 2026', plan: 'Premium – 6 Month',
};

export function AdminEngagementQrScannerClient() {
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
    <div className="space-y-6 pb-10 max-w-4xl mx-auto">
      {/* ── Breadcrumb ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1 uppercase tracking-wider mb-1">
            Engagement <ChevronRight size={12} /> QR Scanner
          </p>
          <h1 className="text-text-primaryxl font-bold tracking-tight">📷 QR Scanner</h1>
          <p className="text-sm text-muted-foreground mt-1">Scan student ID cards to instantly mark attendance.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* ── Left: Camera Viewport ── */}
        <div className="flex-1 space-y-6">
          <Card className="shadow-sm border-border overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between bg-muted/20 border-b border-border pb-4">
              <div>
                <CardTitle className="text-lg">Camera Feed</CardTitle>
                <CardDescription className="mt-1 font-medium">
                  {scanState === 'idle'     && 'Click Start Scan to activate camera'}
                  {scanState === 'scanning' && 'Point camera at student ID card QR code'}
                  {scanState === 'detected' && 'QR code detected — confirm attendance below'}
                  {scanState === 'success'  && 'Attendance recorded successfully!'}
                </CardDescription>
              </div>
              {scanState !== 'idle' && (
                <Button variant="outline" size="sm" onClick={reset} className="gap-2 h-8">
                  <RefreshCw size={14}/> Reset
                </Button>
              )}
            </CardHeader>

            <CardContent className="p-6 flex flex-col items-center">
              <div
                className={`relative w-full max-w-sm aspect-square bg-muted/10 border-2 rounded-xl flex items-center justify-center transition-all ${
                  scanState === 'scanning' ? 'border-primary cursor-pointer hover:bg-primary/5' :
                  scanState === 'detected' ? 'border-success bg-success/5' :
                  scanState === 'success'  ? 'border-success bg-success/10' :
                  'border-dashed border-border'
                }`}
                onClick={scanState === 'scanning' ? simulateScan : undefined}
              >
                <div className="text-center p-6 flex flex-col items-center justify-center h-full">
                  {scanState === 'success' ? (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                      <CheckCircle size={64} className="text-success mb-4 drop-shadow-sm"/>
                      <p className="font-bold text-success text-center px-4">{successMsg}</p>
                    </div>
                  ) : scanState === 'detected' ? (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                      <div className="text-6xl mb-4">✅</div>
                      <p className="font-bold text-foreground text-center">QR Code Detected!</p>
                    </div>
                  ) : (
                    <>
                      <div className={`mb-4 transition-colors ${scanState === 'scanning' ? 'text-primary animate-pulse' : 'text-muted-foreground'}`}>
                        {scanState === 'scanning' ? <QrCode size={64} /> : <Camera size={64} className="opacity-50" />}
                      </div>
                      <p className="font-bold text-foreground mb-1">
                        {scanState === 'idle' ? 'Camera inactive' : 'Tap to simulate scan'}
                      </p>
                      {scanState === 'scanning' && (
                        <p className="text-sm text-muted-foreground">Click anywhere in this area</p>
                      )}
                    </>
                  )}
                </div>

                {/* Corner guides */}
                {scanState === 'scanning' && (
                  <>
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"/>
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"/>
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"/>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"/>
                    {/* Scan animation line */}
                    <div className="absolute left-0 top-0 w-full h-1 bg-primary shadow-lg shadow-primary/80 animate-pulse"/>
                  </>
                )}
              </div>

              {/* Start button */}
              {scanState === 'idle' && (
                <Button onClick={startScan} size="lg" className="mt-8 gap-2 px-8 shadow-sm">
                  <Camera size={18} /> Start Scanning
                </Button>
              )}
            </CardContent>
          </Card>

          {/* ── Detected Student Card ── */}
          {scanState === 'detected' && result && (
            <Card className="shadow-sm border-success bg-success/5 animate-in slide-in-from-top-4 fade-in duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl shrink-0 shadow-sm border border-primary/20">
                      {result.initials}
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-lg">{result.name}</div>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="text-xs font-mono font-medium text-muted-foreground">{result.smartId}</span>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none px-2">{result.shift}</Badge>
                        <Badge variant="secondary" className="bg-success/10 text-success border-none px-2">{result.plan}</Badge>
                      </div>
                      <div className="text-xs font-medium text-muted-foreground mt-2">Valid till: {result.validTill}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={reset} className="text-muted-foreground hover:text-danger hover:bg-danger/10 -mt-2 -mr-2">
                    <X size={20}/>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => markAttendance('IN')} className="flex-1 bg-success hover:bg-success/90 text-white gap-2 font-bold py-6 text-base shadow-sm">
                    ✅ Mark IN
                  </Button>
                  <Button onClick={() => markAttendance('OUT')} variant="destructive" className="flex-1 gap-2 font-bold py-6 text-base shadow-sm">
                    🔚 Mark OUT
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Manual Fallback ── */}
          <div className="mt-6 text-center">
            {!showManual ? (
              <Button variant="link" onClick={() => setShowManual(true)} className="text-muted-foreground hover:text-foreground">
                Can't scan? Enter Smart ID manually →
              </Button>
            ) : (
              <Card className="shadow-sm border-border text-left max-w-sm mx-auto animate-in fade-in zoom-in-95 duration-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold">Manual Entry</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Smart ID *</label>
                    <Input 
                      placeholder="e.g. SL-001"
                      value={manualId} 
                      onChange={e => setManualId(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleManual('IN')} 
                      autoFocus
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button onClick={() => handleManual('IN')} disabled={!manualId.trim()} className="flex-1 bg-success hover:bg-success/90 text-white gap-2">
                      ✅ Mark IN
                    </Button>
                    <Button onClick={() => handleManual('OUT')} disabled={!manualId.trim()} variant="destructive" className="flex-1 gap-2">
                      🔚 Mark OUT
                    </Button>
                    <Button onClick={() => setShowManual(false)} variant="ghost" className="w-full mt-2">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* ── Right: Recent History ── */}
        <div className="w-full lg:w-80 shrink-0">
          <Card className="shadow-sm border-border h-full">
            <CardHeader className="border-b border-border bg-muted/20 pb-4">
              <CardTitle className="text-lg">Recent Scans</CardTitle>
              <CardDescription>Latest attendance records</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {history.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm font-medium">
                  No recent scans yet.
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {history.map(h => (
                    <div key={h.id} className="p-4 flex items-center gap-3 hover:bg-muted/30 transition-colors">
                      <Badge variant="secondary" className={`${h.type==='IN' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'} border-none font-bold tracking-wide px-2 shrink-0`}>
                        {h.type}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-foreground text-sm truncate">{h.name}</p>
                      </div>
                      <div className="text-xs font-mono font-medium text-muted-foreground shrink-0">{h.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
