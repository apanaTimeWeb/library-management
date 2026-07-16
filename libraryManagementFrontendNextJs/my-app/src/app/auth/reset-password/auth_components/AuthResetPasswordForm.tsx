'use client';

import Link from 'next/link';
import { Eye, EyeOff, BookOpen } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useAuthResetPassword } from '../auth_hooks/useAuthResetPassword';
import PasswordStrengthMeter from '../../reusable/PasswordStrengthMeter';
import { AUTH_ROUTES } from '../../auth_url_config';

// RESPONSIBILITY: Renders the reset password page UI.
export function AuthResetPasswordForm() {
  const {
    otpDigits,
    showPw,
    setShowPw,
    showConfirm,
    setShowConfirm,
    done,
    countdown,
    canResend,
    inputRefs,
    isSubmitting,
    register,
    handleSubmit,
    control,
    errors,
    newPassword,
    confirmPassword,
    handleDigitChange,
    handleDigitKeyDown,
    handlePaste,
    handleResend,
  } = useAuthResetPassword();

  const fmt = (n: number) =>
    `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 pt-10 sm:pt-6 bg-[var(--bg-page)] text-[var(--text-primary)] overflow-y-auto">
      <div className="auth-glow-bl" />

      <div className="w-full max-w-[480px] space-y-5 pb-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2.5">
            <div className="auth-logo-box auth-logo-box--sm"><BookOpen size={18} className="text-white" /></div>
            <span className="text-lg font-extrabold text-[var(--text-primary)]">Smart Library 360</span>
          </div>
        </div>

        <div className="auth-card">
          {!done ? (
            <>
              <div className="mb-7">
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">Reset Password 🔑</h1>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  Enter the OTP sent to your phone and choose a new password.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* OTP Boxes */}
                <div>
                  <label className="auth-label">Enter OTP sent to your phone</label>
                  <Controller
                    name="otp"
                    control={control}
                    render={() => (
                      <div className="flex gap-1.5 sm:gap-2.5 justify-center" onPaste={handlePaste}>
                        {otpDigits.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-${idx}`}
                            ref={el => { inputRefs.current[idx] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleDigitChange(idx, e.target.value)}
                            onKeyDown={e => handleDigitKeyDown(idx, e)}
                            className={`auth-otp-box ${digit ? 'auth-otp-box--filled' : ''} ${errors.otp ? 'auth-otp-box--error' : ''}`}
                          />
                        ))}
                      </div>
                    )}
                  />
                  {errors.otp && <p className="auth-error text-center mt-2">{errors.otp.message}</p>}

                  {/* Resend */}
                  <div className="text-center mt-3">
                    {canResend ? (
                      <button type="button" id="resend-otp-btn" onClick={handleResend} className="auth-btn-ghost text-sm">
                        Resend OTP
                      </button>
                    ) : (
                      <p className="text-sm text-[var(--text-secondary)]">
                        Resend in <span className="font-bold text-[var(--text-primary)] tabular-nums">{fmt(countdown)}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="rp-new" className="auth-label auth-label--required">New Password</label>
                  <div className="relative">
                    <input
                      id="rp-new"
                      type={showPw ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      {...register('newPassword')}
                      className={`auth-input pr-12 ${errors.newPassword ? 'auth-input--error' : ''}`}
                    />
                    <button type="button" className="auth-pw-toggle" onClick={() => setShowPw(s => !s)}>
                      {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="auth-error">{errors.newPassword.message}</p>}
                  <PasswordStrengthMeter password={newPassword} />
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="rp-confirm" className="auth-label auth-label--required">Confirm Password</label>
                  <div className="relative">
                    <input
                      id="rp-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Repeat new password"
                      {...register('confirmPassword')}
                      className={`auth-input pr-12 ${errors.confirmPassword ? 'auth-input--error' : ''} ${
                        confirmPassword && confirmPassword === newPassword && !errors.confirmPassword ? 'auth-input--success' : ''
                      }`}
                    />
                    <button type="button" className="auth-pw-toggle" onClick={() => setShowConfirm(s => !s)}>
                      {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="auth-error">{errors.confirmPassword.message}</p>}
                </div>

                {errors.root && <div className="auth-error-banner">❌ {errors.root.message}</div>}

                <button
                  id="update-password-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="auth-btn-primary"
                >
                  {isSubmitting
                    ? <><span className="auth-spinner" /> Updating...</>
                    : '🔐 Update Password'}
                </button>

                <div className="text-center">
                  <Link href={AUTH_ROUTES.LOGIN} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    ← Back to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className="auth-success-state">
              <div className="auth-success-state__icon">🎉</div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Password Updated!</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-2">
                Your password has been successfully reset. You can now login with your new credentials.
              </p>
              <Link href={AUTH_ROUTES.LOGIN} id="go-to-login-btn" className="auth-btn-primary mt-6 inline-flex">
                Go to Login →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
