'use client';

import Link from 'next/link';
import { Eye, EyeOff, BookOpen, CheckCircle, ChevronRight } from 'lucide-react';
import { useAuthLogin } from '@/app/auth/login/auth_hooks/useAuthLogin';
import { AUTH_ROUTES } from '@/app/auth/auth_url_config';

// RESPONSIBILITY: Renders the login page UI, including brand panel and form. No complex logic.
export function AuthLoginForm() {
  const {
    showPw,
    setShowPw,
    selectedRole,
    handleRoleSelect,
    register,
    handleSubmit,
    errors,
    fetchState,
    errorMessage,
    roles,
    roleDestLabel
  } = useAuthLogin();

  const isLoading = fetchState === 'loading';

  return (
    <main className="flex min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      {/* Ambient glows */}
      <div className="auth-glow-tr" />
      <div className="auth-glow-bl" />

      {/* ── LEFT BRAND PANEL ── */}
      <section className="hidden lg:flex lg:w-1/2 flex-col justify-between p-8 xl:p-12 auth-brand-panel">
        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="auth-logo-box">
            <BookOpen size={22} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">Smart Library 360</span>
        </div>

        {/* Hero */}
        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-[var(--text-primary)]">
              Manage Smarter,<br />
              <span className="auth-gradient-text">Grow Faster</span>
            </h1>
            <p className="mt-4 text-[var(--text-secondary)] text-base leading-relaxed max-w-sm">
              The complete Business Operating System for modern self-study centers and reading rooms.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Smart ID Auto-Fill', 'WhatsApp Alerts', 'Gap Analysis', 'Offline PWA', 'Multi-Branch'].map(f => (
              <span key={f} className="auth-feature-chip">
                <CheckCircle size={11} className="text-[var(--primary)]" /> {f}
              </span>
            ))}
          </div>

          {/* Portal access info */}
          <div className="auth-hint-box space-y-2">
            <p className="text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-3">Portal Access</p>
            {roles.map(r => (
              <div key={r.id} className="flex items-center gap-2.5">
                <span className="text-base w-5 text-center shrink-0">{r.icon}</span>
                <span className={`text-xs font-semibold w-20 shrink-0 auth-role-label--${r.id}`}>{r.label}</span>
                <ChevronRight size={12} className="text-[var(--text-secondary)] shrink-0" />
                <span className="text-xs text-[var(--text-secondary)]">{roleDestLabel[r.id]}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-8">
            {[['12k+', 'Libraries Joined'], ['4.9★', 'Rating'], ['99.9%', 'Uptime']].map(([v, l]) => (
              <div key={l}>
                <p className="auth-stat-value">{v}</p>
                <p className="auth-stat-label">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-[var(--text-secondary)]">© 2026 Smart Library 360. All rights reserved.</p>
      </section>

      {/* ── RIGHT AUTH PANEL ── */}
      <section className="w-full lg:w-1/2 flex items-start lg:items-center justify-center p-4 sm:p-8 lg:p-12 bg-[var(--bg-page)] overflow-y-auto min-h-screen lg:min-h-0">
        <div className="w-full max-w-[480px] space-y-6 py-8 lg:py-0">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-2">
            <div className="flex items-center gap-2.5">
              <div className="auth-logo-box auth-logo-box--sm"><BookOpen size={18} className="text-white" /></div>
              <span className="text-lg font-extrabold text-[var(--text-primary)]">Smart Library 360</span>
            </div>
          </div>

          <div className="auth-card">
            <div className="mb-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary)] to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-[var(--primary)]/20">
                  <BookOpen size={24} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Smart Library 360</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Sign in to your account</p>
            </div>

            {/* Role selector */}
            <div className="mb-6">
              <div className="flex items-center p-1 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg">
                {roles.map(role => {
                  const isActive = selectedRole.id === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-md transition-all text-xs font-semibold ${
                        isActive 
                          ? `bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm border border-[var(--border)]`
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/50 border border-transparent'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${isActive ? 'border-[var(--primary)]' : 'border-[var(--text-secondary)]'}`}>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />}
                      </div>
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="auth-divider" />

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <input type="hidden" {...register('role')} />

              {/* Email */}
              <div>
                <label htmlFor="login-email" className="auth-label auth-label--required">Email or Phone</label>
                <input
                  id="login-email"
                  type="text"
                  placeholder="Email or Phone Number"
                  {...register('email')}
                  className={`auth-input ${errors.email ? 'auth-input--error' : ''}`}
                />
                {errors.email && <p className="auth-error">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="login-password" className="auth-label auth-label--required">Password</label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Your password"
                    {...register('password')}
                    className={`auth-input pr-12 ${errors.password ? 'auth-input--error' : ''}`}
                  />
                  <button type="button" className="auth-pw-toggle" onClick={() => setShowPw(s => !s)}>
                    {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && <p className="auth-error">{errors.password.message}</p>}
              </div>

              {/* Credential error */}
              {errorMessage && (
                <div className="auth-error-banner">❌ {errorMessage}</div>
              )}

              {/* Submit */}
              <button
                id="login-submit-btn"
                type="submit"
                disabled={isLoading}
                className="auth-btn-primary"
              >
                {isLoading ? (
                  <><span className="auth-spinner" /> Signing in...</>
                ) : `Login as ${selectedRole.label}`}
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-6 space-y-3 text-center">
              <Link href={AUTH_ROUTES.FORGOT_PASSWORD} className="auth-btn-ghost text-sm">
                Forgot Password?
              </Link>
              <div className="auth-divider" />
              <p className="text-sm text-[var(--text-secondary)]">
                Don&apos;t have an account?{' '}
                <Link href={AUTH_ROUTES.SIGNUP} className="text-[var(--primary)] font-semibold hover:underline">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
