import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authResetPasswordSchema } from '@/app/auth/auth_utils/auth_validation';
import { AUTH_RESET_PASSWORD_PRESETS } from '@/app/auth/auth_constants';
import type { AuthResetPasswordPayload } from '@/app/auth/auth_types/auth_types';
import { useAuthStore } from '@/app/auth/auth_store/auth_store';

const RESEND_SECS = 45;

// DATA FLOW: UI Component → useAuthResetPassword.ts → useAuthStore → authApi
export function useAuthResetPassword() {
  const [otpDigits, setOtpDigits] = useState<string[]>(AUTH_RESET_PASSWORD_PRESETS.otp);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SECS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { resetPassword, fetchState, errorMessage, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AuthResetPasswordPayload>({
    resolver: zodResolver(authResetPasswordSchema),
    defaultValues: {
      token: AUTH_RESET_PASSWORD_PRESETS.otp.join(''),
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleDigitChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otpDigits];
    next[idx] = val;
    setOtpDigits(next);
    setValue('token', next.join(''), { shouldValidate: true });
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleDigitKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) inputRefs.current[idx - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length === 6) {
      const digits = text.split('');
      setOtpDigits(digits);
      setValue('token', text, { shouldValidate: true });
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtpDigits(Array(6).fill(''));
    setValue('token', '', { shouldValidate: false });
    setCountdown(RESEND_SECS);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const onSubmit = async (data: AuthResetPasswordPayload) => {
    clearError();
    const res = await resetPassword(data);
    
    if (res.success) {
      setDone(true);
    }
  };

  return {
    otpDigits,
    handleDigitChange,
    handleDigitKeyDown,
    handlePaste,
    inputRefs,
    showPw,
    setShowPw,
    showConfirm,
    setShowConfirm,
    done,
    countdown,
    canResend,
    handleResend,
    fetchState,
    errorMessage,
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    newPassword,
    confirmPassword,
  };
}
