'use client';

// RESPONSIBILITY: Renders the forgot password page UI using Tailwind.
// DATA FLOW: UI Component -> useAuthForgotPassword -> useAuthStore (`Rule 39`).

import Link from 'next/link';
import { ArrowLeft, BookOpen, Send, Loader2 } from 'lucide-react';
import { useAuthForgotPassword } from '@/app/auth/forgot-password/auth_forgot_password_hooks/useAuthForgotPassword';
import { AUTH_ROUTES } from '@/app/auth/auth_url_config';

export function AuthForgotPasswordForm() {
  const {
    sent,
    sentTo,
    fetchState,
    errorMessage,
    register,
    handleSubmit,
    errors,
  } = useAuthForgotPassword();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 pt-10 sm:pt-6 bg-page text-text-primary relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[440px] space-y-5 pb-8 relative z-10">
        <Link href={AUTH_ROUTES.LOGIN} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity">
          <ArrowLeft size={16} /> Back to Login
        </Link>

        {/* Logo */}
        <div className="flex justify-center pt-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-md">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-lg font-extrabold text-text-primary">Smart Library 360</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {!sent ? (
            <>
              <div className="mb-7">
                <h1 className="text-2xl font-bold text-text-primary">Forgot Password? 🔐</h1>
                <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                  Enter your registered phone number. We&apos;ll send an OTP to reset your password.
                </p>
                {errorMessage && (
                  <div className="p-3 bg-danger-bg border border-danger/20 rounded-lg text-danger text-sm font-medium flex items-start gap-2 mt-3">
                    <span>❌</span> <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label htmlFor="fp-phone" className="block text-[13px] font-medium text-text-secondary mb-1.5">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    id="fp-phone"
                    type="text"
                    placeholder="Your registered phone number"
                    {...register('phone')}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-input text-text-primary border outline-none transition-all focus:ring-2 focus:ring-primary/20 ${errors.phone ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'}`}
                  />
                  {errors.phone
                    ? <p className="text-[12px] text-danger mt-1">{errors.phone.message}</p>
                    : <p className="text-[12px] text-text-secondary mt-1">An OTP will be sent to your registered mobile number.</p>
                  }
                </div>

                <button
                  id="send-otp-btn"
                  type="submit"
                  disabled={fetchState === 'loading'}
                  className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-sm transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {fetchState === 'loading'
                    ? <><Loader2 size={16} className="animate-spin" /> Sending OTP...</>
                    : <><Send size={15} /> Send OTP</>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-success/20 shadow-sm shadow-success/10">
                <span className="text-2xl">✅</span>
              </div>
              <h2 className="text-xl font-bold text-text-primary">OTP Sent!</h2>
              <p className="text-sm text-text-secondary leading-relaxed mt-2">
                We&apos;ve sent a 6-digit OTP to <strong className="text-text-primary">{sentTo}</strong>. Check your messages.
              </p>
              <Link
                href={AUTH_ROUTES.RESET_PASSWORD}
                id="enter-otp-btn"
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-sm transition-all flex justify-center items-center gap-2 mt-6 inline-flex"
              >
                Enter OTP →
              </Link>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 mt-7 opacity-40">
            <div className="h-px w-6 bg-border" />
            <span className="text-[10px] tracking-[0.12em] uppercase font-bold text-text-secondary">Smart Library 360</span>
            <div className="h-px w-6 bg-border" />
          </div>
        </div>
      </div>
    </div>
  );
}
