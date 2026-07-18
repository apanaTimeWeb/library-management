'use client';
// RESPONSIBILITY: Renders the AdminSystemOfflineClient component.
import { WifiOff, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useAdminSystemOffline } from '@/app/admin/admin_system/admin_system_offline_hooks/useAdminSystemOffline';

export function AdminSystemOfflineClient() {
  const { dots, online, checking, handleRetry, features } = useAdminSystemOffline();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface relative overflow-hidden text-text-primary">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center gap-0 relative z-10">

        {/* Icon */}
        <div className={`mb-6 h-24 w-24 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 ${
          online ? 'bg-success/20 shadow-success/10' : 'bg-bg-pageg-card shadow-black/10'
        }`}>
          {online
            ? <CheckCircle size={52} className="text-success" />
            : <WifiOff size={52} className="text-primary" />}
        </div>

        {/* Heading */}
        <h1 className={`text-3xl font-bold text-center tracking-tight mb-2 transition-colors duration-500 ${
          online ? 'text-success' : 'text-text-primary'
        }`}>
          {online ? 'Back Online! 🎉' : "You're Offline"}
        </h1>

        {/* Subtitle */}
        <p className="text-center text-text-secondary text-base mb-8 max-w-sm">
          {online
            ? "Great news! You're reconnected. Redirecting to Dashboard..."
            : "No internet connection detected. Don't worry — your basic features still work:"}
        </p>

        {/* Feature list */}
        {!online && (
          <div className="w-full bg-bg-pageg-card rounded-2xl p-4 shadow-sm border border-border space-y-3">
            {features.map((f, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 text-sm font-medium p-2 rounded-lg transition-colors ${
                  f.available ? 'bg-surface text-text-primary' : 'opacity-60 text-text-secondary'
                }`}
              >
                {f.available
                  ? <CheckCircle size={16} className="text-success shrink-0" />
                  : <XCircle size={16} className="text-danger shrink-0" />}
                {f.text}
              </div>
            ))}
          </div>
        )}

        {/* Waiting / Retry section */}
        {!online && (
          <div className="flex flex-col items-center gap-4 mt-6 w-full">
            {/* Pulsing status badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg-pageg-card border border-border text-xs font-semibold text-text-secondary uppercase tracking-widest shadow-inner">
              <span className={`w-2 h-2 rounded-full bg-danger ${checking ? 'animate-ping bg-primary' : 'animate-pulse'}`} />
              {checking ? 'Checking connection...' : `Waiting for connection${dots}`}
            </div>

            {/* Retry button */}
            <button
              id="retry-connection-btn"
              onClick={handleRetry}
              disabled={checking}
              className="group relative flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-on-primary font-bold text-base shadow-md shadow-primary/20 hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none transition-all"
            >
              <RefreshCw
                size={18}
                className={checking ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}
              />
              {checking ? 'Checking...' : 'Retry Connection'}
            </button>
          </div>
        )}

        {/* Footer */}
        <p className="mt-10 text-xs text-text-secondary/70 text-center font-medium tracking-wide">
          Smart Library 360 · Works offline with limited functionality
        </p>
      </div>
    </div>
  );
}
