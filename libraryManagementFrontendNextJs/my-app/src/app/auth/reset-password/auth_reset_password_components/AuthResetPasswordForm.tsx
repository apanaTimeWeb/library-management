'use client';
// RESPONSIBILITY: Renders the reset password page UI using Tailwind.
// DATA FLOW: UI Component -> useAuthResetPassword -> useAuthStore (`Rule 39`).

import Link from 'next/link';
import { Eye, EyeOff, BookOpen, Loader2 } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useAuthResetPassword } from '@/app/auth/reset-password/auth_reset_password_hooks/useAuthResetPassword';
import PasswordStrengthMeter from '@/app/auth/auth_shared_components/AuthPasswordStrengthMeter';
import { AUTH_ROUTES } from '@/app/auth/auth_url_config';

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
    fetchState,
    errorMessage,
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
    <div className="min-h-screen flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 pt-10 sm:pt-6 bg-page text-text-primary relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-full max-w-md space-y-5 pb-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-md">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-lg font-extrabold text-text-primary">Smart Library 360</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {!done ? (
            <>
              <div className="mb-7">
                <h1 className="text-text-primaryxl font-bold text-text-primary">Reset Password 🔑</h1>
                <p className="text-sm text-text-secondary mt-1">
                  Enter the OTP sent to your phone and choose a new password.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* OTP Boxes */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2 text-center">Enter OTP sent to your phone</label>
                  <Controller
                    name="token"
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
                            className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-xl bg-input text-text-primary border outline-none transition-all focus:ring-2 focus:ring-primary/30 ${digit ? 'border-primary shadow-sm shadow-primary/10' : 'border-border'} ${errors.token ? 'border-danger focus:border-danger' : 'focus:border-primary'}`}
                          />
                        ))}
                      </div>
                    )}
                  />
                  {errors.token && <p className="text-xs text-danger text-center mt-2">{errors.token.message}</p>}

                  {/* Resend */}
                  <div className="text-center mt-3">
                    {canResend ? (
                      <button type="button" id="resend-otp-btn" onClick={handleResend} className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">
                        Resend OTP
                      </button>
                    ) : (
                      <p className="text-sm text-text-secondary">
                        Resend in <span className="font-bold text-text-primary tabular-nums">{fmt(countdown)}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="rp-new" className="block text-xs font-medium text-text-secondary mb-1.5">
                    New Password <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="rp-new"
                      type={showPw ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      {...register('newPassword')}
                      className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-input text-text-primary border outline-none transition-all focus:ring-2 focus:ring-primary/20 pr-12 ${errors.newPassword ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'}`}
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors p-1" onClick={() => setShowPw(s => !s)}>
                      {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-xs text-danger mt-1">{errors.newPassword.message}</p>}
                  <PasswordStrengthMeter password={newPassword} />
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="rp-confirm" className="block text-xs font-medium text-text-secondary mb-1.5">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="rp-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Repeat new password"
                      {...register('confirmPassword')}
                      className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-input text-text-primary border outline-none transition-all focus:ring-2 focus:ring-primary/20 pr-12 ${errors.confirmPassword ? 'border-danger focus:border-danger' : confirmPassword && confirmPassword === newPassword ? 'border-success focus:border-success' : 'border-border focus:border-primary'}`}
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors p-1" onClick={() => setShowConfirm(s => !s)}>
                      {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-danger mt-1">{errors.confirmPassword.message}</p>}
                </div>

                {errorMessage && (
                  <div className="p-3 bg-danger-bg border border-danger/20 rounded-lg text-danger text-sm font-medium flex items-start gap-2">
                    <span>❌</span> <span>{errorMessage}</span>
                  </div>
                )}
                {errors.root && (
                  <div className="p-3 bg-danger-bg border border-danger/20 rounded-lg text-danger text-sm font-medium flex items-start gap-2">
                    <span>❌</span> <span>{errors.root.message}</span>
                  </div>
                )}

                <button
                  id="update-password-btn"
                  type="submit"
                  disabled={fetchState === 'loading'}
                  className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-sm transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {fetchState === 'loading'
                    ? <><Loader2 size={16} className="animate-spin" /> Updating...</>
                    : 'Update Password'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-success/20 shadow-sm shadow-success/10">
                <span className="text-text-primaryxl">✅</span>
              </div>
              <h2 className="text-xl font-bold text-text-primary">Password Reset!</h2>
              <p className="text-sm text-text-secondary leading-relaxed mt-2">
                Your password has been successfully updated.
              </p>
              <Link
                href={AUTH_ROUTES.LOGIN}
                id="back-to-login-btn"
                className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-sm transition-all flex justify-center items-center gap-2 mt-6 inline-flex"
              >
                Go to Login →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
