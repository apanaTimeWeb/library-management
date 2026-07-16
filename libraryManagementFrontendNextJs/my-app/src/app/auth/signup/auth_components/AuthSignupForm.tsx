'use client';

import Link from 'next/link';
import { Eye, EyeOff, BookOpen, CheckCircle } from 'lucide-react';
import { useAuthSignup } from '@/app/auth/signup/auth_hooks/useAuthSignup';
import { AUTH_ROUTES } from '@/app/auth/auth_url_config';
import PasswordStrengthMeter from '@/app/auth/auth_shared_components/AuthPasswordStrengthMeter';

// RESPONSIBILITY: Renders the signup page UI, including brand panel and form.
export function AuthSignupForm() {
  const {
    shows,
    setShows,
    register,
    handleSubmit,
    errors,
    password,
    confirmPassword,
    fetchState,
    errorMessage
  } = useAuthSignup();

  const isLoading = fetchState === 'loading';

  return (
    <main className="flex min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <div className="auth-glow-tr" />
      <div className="auth-glow-bl" />

      {/* ── LEFT BRAND PANEL ── */}
      <section className="hidden lg:flex lg:w-1/2 flex-col justify-between p-8 xl:p-12 auth-brand-panel">
        <div className="relative z-10 flex items-center gap-3">
          <div className="auth-logo-box">
            <BookOpen size={22} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-[var(--text-primary)]">Smart Library 360</span>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-[var(--text-primary)]">
              Start your<br />
              <span className="auth-gradient-text">free trial today</span>
            </h1>
            <p className="mt-4 text-[var(--text-secondary)] text-base leading-relaxed max-w-sm">
              Join 12,000+ libraries already running smarter with Smart Library 360.
            </p>
          </div>
          <div className="space-y-3">
            {[
              '30-day free trial, no credit card required',
              'Setup takes less than 5 minutes',
              'Import existing data via Excel',
              'WhatsApp & SMS alerts built-in',
            ].map(f => (
              <div key={f} className="flex items-center gap-2.5">
                <CheckCircle size={15} className="text-[var(--success)] shrink-0" />
                <span className="text-sm text-[var(--text-secondary)]">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-[var(--text-secondary)]">© 2026 Smart Library 360</p>
      </section>

      {/* ── RIGHT PANEL ── */}
      <section className="w-full lg:w-1/2 flex items-start lg:items-center justify-center p-4 sm:p-8 md:p-10 overflow-y-auto min-h-screen lg:min-h-0 bg-[var(--bg-page)]">
        <div className="w-full max-w-[520px] py-8 lg:py-0">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2.5">
              <div className="auth-logo-box auth-logo-box--sm"><BookOpen size={18} className="text-white" /></div>
              <span className="text-lg font-extrabold text-[var(--text-primary)]">Smart Library 360</span>
            </div>
          </div>

          <div className="auth-card">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Create Library Account</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Enter your details to start your 30-day free trial.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="su-name" className="auth-label auth-label--required">Full Name</label>
                <input id="su-name" type="text" placeholder="Your full name" {...register('name')}
                  className={`auth-input ${errors.name ? 'auth-input--error' : ''}`} />
                {errors.name && <p className="auth-error">{errors.name.message}</p>}
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="su-email" className="auth-label">Email (Optional)</label>
                  <input id="su-email" type="email" placeholder="you@example.com" {...register('email')}
                    className={`auth-input ${errors.email ? 'auth-input--error' : ''}`} />
                  {errors.email && <p className="auth-error">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="su-phone" className="auth-label auth-label--required">Phone</label>
                  <input id="su-phone" type="tel" placeholder="+91 9800000000" {...register('phone')}
                    className={`auth-input ${errors.phone ? 'auth-input--error' : ''}`} />
                  {errors.phone && <p className="auth-error">{errors.phone.message}</p>}
                </div>
              </div>


              {/* Password */}
              <div>
                <label htmlFor="su-pw" className="auth-label auth-label--required">Password</label>
                <div className="relative">
                  <input id="su-pw" type={shows.pw ? 'text' : 'password'} placeholder="Min. 8 characters"
                    {...register('password')}
                    className={`auth-input pr-12 ${errors.password ? 'auth-input--error' : ''}`} />
                  <button type="button" className="auth-pw-toggle" onClick={() => setShows(s => ({ ...s, pw: !s.pw }))}>
                    {shows.pw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && <p className="auth-error">{errors.password.message}</p>}
                <PasswordStrengthMeter password={password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="su-confirm" className="auth-label auth-label--required">Confirm Password</label>
                <div className="relative">
                  <input
                    id="su-confirm"
                    type={shows.confirm ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    {...register('confirmPassword')}
                    className={`auth-input pr-12 ${errors.confirmPassword ? 'auth-input--error' : ''} ${
                      confirmPassword && confirmPassword === password && !errors.confirmPassword ? 'auth-input--success' : ''
                    }`}
                  />
                  <button type="button" className="auth-pw-toggle" onClick={() => setShows(s => ({ ...s, confirm: !s.confirm }))}>
                    {shows.confirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword.message}</p>}
              </div>

              {errorMessage && <div className="auth-error-banner">❌ {errorMessage}</div>}

              <button id="signup-submit-btn" type="submit" disabled={isLoading} className="auth-btn-primary mt-2">
                {isLoading ? <><span className="auth-spinner" /> Creating account...</> : 'Create Account →'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-[var(--text-secondary)]">
              Already have an account?{' '}
              <Link href={AUTH_ROUTES.LOGIN} className="text-[var(--primary)] font-semibold hover:underline">Login</Link>
            </p>
          </div>

          <div className="mt-5 flex justify-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Help Center'].map(l => (
              <a key={l} href="#" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
