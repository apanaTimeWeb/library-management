'use client';
// RESPONSIBILITY: Renders the signup page UI, including brand panel and form using Tailwind.
// DATA FLOW: UI Component -> useAuthSignup -> useAuthStore (`Rule 39`).

import Link from 'next/link';
import { Eye, EyeOff, BookOpen, CheckCircle, Loader2 } from 'lucide-react';
import { useAuthSignup } from '@/app/auth/signup/auth_signup_hooks/useAuthSignup';
import { AUTH_ROUTES } from '@/app/auth/auth_url_config';
import PasswordStrengthMeter from '@/app/auth/auth_shared_components/AuthPasswordStrengthMeter';

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
    <main className="flex min-h-screen bg-page text-text-primary">
      {/* Ambient glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple/20 blur-[100px] rounded-full pointer-events-none" />

      {/* â”€â”€ LEFT BRAND PANEL â”€â”€ */}
      <section className="hidden lg:flex lg:w-1/2 flex-col justify-between p-8 xl:p-12 relative z-10 border-r border-border bg-page">
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg shadow-primary/20">
            <BookOpen size={22} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-text-primary">Smart Library 360</span>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-text-primary">
              Start your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple">free trial today</span>
            </h1>
            <p className="mt-4 text-text-secondary text-base leading-relaxed max-w-sm">
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
                <CheckCircle size={15} className="text-success shrink-0" />
                <span className="text-sm text-text-secondary">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-text-secondary">Â© 2026 Smart Library 360</p>
      </section>

      {/* â”€â”€ RIGHT PANEL â”€â”€ */}
      <section className="w-full lg:w-1/2 flex items-start lg:items-center justify-center p-4 sm:p-8 md:p-10 relative z-10 overflow-y-auto min-h-screen lg:min-h-0 bg-transparent">
        <div className="w-full max-w-lg py-8 lg:py-0">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-md"><BookOpen size={18} className="text-white" /></div>
              <span className="text-lg font-extrabold text-text-primary">Smart Library 360</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="mb-7">
              <h2 className="text-text-primary text-xl font-bold text-text-primary">Create Library Account</h2>
              <p className="text-sm text-text-secondary mt-1">Enter your details to start your 30-day free trial.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="su-name" className="block text-xs font-medium text-text-secondary mb-1.5">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input id="su-name" type="text" placeholder="Your full name" {...register('name')}
                  className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-input text-text-primary border outline-none transition-all focus:ring-2 focus:ring-primary/20 ${errors.name ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'}`} />
                {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="su-email" className="block text-xs font-medium text-text-secondary mb-1.5">Email (Optional)</label>
                  <input id="su-email" type="email" placeholder="you@example.com" {...register('email')}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-input text-text-primary border outline-none transition-all focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'}`} />
                  {errors.email && <p className="text-xs text-danger mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="su-phone" className="block text-xs font-medium text-text-secondary mb-1.5">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input id="su-phone" type="tel" placeholder="+91 9800000000" {...register('phone')}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-input text-text-primary border outline-none transition-all focus:ring-2 focus:ring-primary/20 ${errors.phone ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'}`} />
                  {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="su-pw" className="block text-xs font-medium text-text-secondary mb-1.5">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input id="su-pw" type={shows.pw ? 'text' : 'password'} placeholder="Min. 8 characters"
                    {...register('password')}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-input text-text-primary border outline-none transition-all focus:ring-2 focus:ring-primary/20 pr-12 ${errors.password ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'}`} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors p-1" onClick={() => setShows(s => ({ ...s, pw: !s.pw }))}>
                    {shows.pw ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-danger mt-1">{errors.password.message}</p>}
                <PasswordStrengthMeter password={password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="su-confirm" className="block text-xs font-medium text-text-secondary mb-1.5">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <input
                    id="su-confirm"
                    type={shows.confirm ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    {...register('confirmPassword')}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-input text-text-primary border outline-none transition-all focus:ring-2 focus:ring-primary/20 pr-12 ${errors.confirmPassword ? 'border-danger focus:border-danger' : confirmPassword && confirmPassword === password ? 'border-success focus:border-success' : 'border-border focus:border-primary'}`}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors p-1" onClick={() => setShows(s => ({ ...s, confirm: !s.confirm }))}>
                    {shows.confirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-xs text-danger mt-1">{errors.confirmPassword.message}</p>}
              </div>

              {errorMessage && (
                <div className="p-3 bg-danger-bg border border-danger/20 rounded-lg text-danger text-sm font-medium flex items-start gap-2">
                  <span>âŒ</span> <span>{errorMessage}</span>
                </div>
              )}

              <button id="signup-submit-btn" type="submit" disabled={isLoading} className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-sm transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                {isLoading ? <><Loader2 size={16} className="animate-spin" /> Creating account...</> : 'Create Account â†’'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link href={AUTH_ROUTES.LOGIN} className="text-primary font-semibold hover:underline">Login</Link>
            </p>
          </div>

          <div className="mt-5 flex justify-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Help Center'].map(l => (
              <a key={l} href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
