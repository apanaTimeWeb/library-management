'use client';
// RESPONSIBILITY: Renders the login page UI, using Tailwind classes mapped to `globals.css` (`Rule 4`).
// DATA FLOW: UI Component -> useAuthLogin -> useAuthStore (`Rule 39`).

import Link from 'next/link';
import { Eye, EyeOff, BookOpen, CheckCircle, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuthLogin } from '@/app/auth/login/auth_login_hooks/useAuthLogin';
import { AUTH_ROUTES } from '@/app/auth/auth_url_config';
import { ThemeToggle } from '@/components/ThemeToggle';

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
    <main className="flex min-h-screen bg-page text-text-primary relative">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Ambient glows (using tailwind arbitrary radial gradients if needed, or just plain colors) */}
      <div className="absolute top-[-10%] right-[-5%] w-2/5 h-2/5 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-2/5 h-2/5 bg-purple/20 blur-[100px] rounded-full pointer-events-none" />

      {/* ── LEFT BRAND PANEL ── */}
      <section className="hidden lg:flex lg:w-1/2 flex-col justify-between p-8 xl:p-12 relative z-10 border-r border-border bg-page">
        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg shadow-primary/20">
            <BookOpen size={22} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-text-primary tracking-tight">Smart Library 360</span>
        </div>

        {/* Hero */}
        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-text-primary">
              Manage Smarter,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple">Grow Faster</span>
            </h1>
            <p className="mt-4 text-text-secondary text-base leading-relaxed max-w-sm">
              The complete Business Operating System for modern self-study centers and reading rooms.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Smart ID Auto-Fill', 'WhatsApp Alerts', 'Gap Analysis', 'Offline PWA', 'Multi-Branch'].map(f => (
              <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-text-primary shadow-sm backdrop-blur-sm">
                <CheckCircle size={11} className="text-primary" /> {f}
              </span>
            ))}
          </div>

          {/* Portal access info */}
          <div className="p-5 rounded-xl bg-card border border-border shadow-sm space-y-2 backdrop-blur-sm">
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3">Portal Access</p>
            {roles.map(r => (
              <div key={r.id} className="flex items-center gap-2.5">
                <span className="text-base w-5 flex justify-center shrink-0"><r.icon size={16} /></span>
                <span className={`text-xs font-semibold w-20 shrink-0 ${r.id === 'superadmin' ? 'text-primary' : r.id === 'manager' ? 'text-warning' : 'text-success'}`}>{r.label}</span>
                <ChevronRight size={12} className="text-text-secondary shrink-0" />
                <span className="text-xs text-text-secondary">{roleDestLabel[r.id]}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-8">
            {[['12k+', 'Libraries Joined'], ['4.9★', 'Rating'], ['99.9%', 'Uptime']].map(([v, l]) => (
              <div key={l}>
                <p className="text-3xl font-extrabold text-text-primary tracking-tighter">{v}</p>
                <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-text-secondary">© 2026 Smart Library 360. All rights reserved.</p>
      </section>

      {/* ── RIGHT AUTH PANEL ── */}
      <section className="w-full lg:w-1/2 flex items-start lg:items-center justify-center p-4 sm:p-8 lg:p-12 relative z-10 overflow-y-auto min-h-screen lg:min-h-0">
        <div className="w-full max-w-md space-y-6 py-8 lg:py-0">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-md"><BookOpen size={18} className="text-white" /></div>
              <span className="text-lg font-extrabold text-text-primary">Smart Library 360</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="mb-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-xl bg-card border border-border shadow-sm flex items-center justify-center">
                  <BookOpen size={24} className="text-text-primary" />
                </div>
              </div>
              <h2 className="text-text-primary text-xl font-bold text-text-primary tracking-tight">Smart Library 360</h2>
              <p className="text-sm text-text-secondary mt-1">Sign in to your account</p>
            </div>

            {/* Role selector */}
            <div className="mb-6">
              <div className="flex items-center p-1 bg-page border border-border rounded-lg">
                {roles.map(role => {
                  const isActive = selectedRole.id === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleRoleSelect(role)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-md transition-all text-xs font-semibold ${
                        isActive 
                          ? `bg-card text-text-primary shadow-sm border border-border`
                          : 'text-text-secondary hover:text-text-primary hover:bg-card/50 border border-transparent'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${isActive ? 'border-primary' : 'border-text-secondary'}`}>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      </div>
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-border my-6" />

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Phone */}
              <div>
                <label htmlFor="login-phone" className="block text-xs font-medium text-text-secondary mb-1.5">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  id="login-phone"
                  type="text"
                  placeholder="Enter your registered phone number"
                  {...register('phone')}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-input text-text-primary border outline-none transition-all focus:ring-2 focus:ring-primary/20 ${errors.phone ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'}`}
                />
                {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="login-password" className="block text-xs font-medium text-text-secondary mb-1.5">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Your password"
                    {...register('password')}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-input text-text-primary border outline-none transition-all focus:ring-2 focus:ring-primary/20 pr-12 ${errors.password ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'}`}
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors p-1" 
                    onClick={() => setShowPw(s => !s)}
                  >
                    {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-danger mt-1">{errors.password.message}</p>}
              </div>

              {/* Credential error */}
              {errorMessage && (
                <div className="p-3 bg-danger-bg border border-danger/20 rounded-lg text-danger text-sm font-medium flex items-start gap-2">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" /> <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit */}
              <button
                id="login-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-sm transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <><Loader2 size={16} className="animate-spin" /> Signing in...</>
                ) : `Login as ${selectedRole.label}`}
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-6 space-y-4 text-center">
              <Link href={AUTH_ROUTES.FORGOT_PASSWORD} className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                Forgot Password?
              </Link>
              <div className="h-px bg-border" />
              <p className="text-sm text-text-secondary">
                Don&apos;t have an account?{' '}
                <Link href={AUTH_ROUTES.SIGNUP} className="text-primary font-semibold hover:underline">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


