'use client';
import { WifiOff, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { SUPERADMIN_SYSTEM_MOCK_OFFLINE_FEATURES } from '@/app/superadmin/superadmin_system/superadmin_system_data/SuperadminSystemMockData';
import { useSuperadminSystemOffline } from '../superadmin_system_offline_hooks/useSuperadminSystemOffline';

export function SuperadminSystemOfflineClient() {
  const { dots, online, checking, handleRetry } = useSuperadminSystemOffline();

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg text-center flex flex-col items-center">
        {online ? (
          <>
            <div className="h-24 w-24 rounded-full bg-success/10 flex items-center justify-center text-success mb-6 animate-pulse">
              <CheckCircle size={48} />
            </div>
            <h1 className="text-3xl font-bold text-on-surface mb-2">Back Online!</h1>
            <p className="text-on-surface-variant text-lg">Reconnecting you to the dashboard...</p>
          </>
        ) : (
          <>
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-error/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="h-32 w-32 rounded-full bg-surface-container-high border-4 border-error flex items-center justify-center text-error relative z-10 shadow-2xl">
                <WifiOff size={48} />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-on-surface mb-3 tracking-tight">No Connection</h1>
            <p className="text-on-surface-variant text-lg mb-8 max-w-sm">
              It looks like you are offline. Check your internet connection and try again.
            </p>

            <button
              onClick={handleRetry}
              disabled={checking}
              className={`flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold transition-all ${
                checking 
                  ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed' 
                  : 'bg-primary text-on-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5'
              }`}
            >
              <RefreshCw size={20} className={checking ? 'animate-spin' : ''} />
              {checking ? `Checking${dots}` : 'Try Again'}
            </button>

            {/* Offline Capabilities Card */}
            <div className="mt-16 w-full text-left bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4">
                Available Offline
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SUPERADMIN_SYSTEM_MOCK_OFFLINE_FEATURES.map((feat: any) => (
                  <div key={feat.title} className="flex items-start gap-3 p-3 rounded-xl bg-surface hover:bg-surface-container-high transition-colors">
                    <CheckCircle size={18} className="text-success mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm text-on-surface">{feat.title}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                ))}
                {/* Visual filler for things that are disabled */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface opacity-50">
                  <XCircle size={18} className="text-error mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-on-surface line-through">Sync Data to Cloud</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">Requires connection</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
