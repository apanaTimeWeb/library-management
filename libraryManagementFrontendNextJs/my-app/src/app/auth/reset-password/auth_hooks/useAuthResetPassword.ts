import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authResetPasswordSchema } from '@/app/auth/auth_utils/auth_validation';
import { AUTH_RESET_PASSWORD_PRESETS } from '@/app/auth/auth_constants';
import type { AuthResetPasswordPayload, FetchState } from '@/app/auth/auth_types/auth_types';
import { authApi } from '@/app/auth/auth_api/auth_api';

const CORRECT_OTP = AUTH_RESET_PASSWORD_PRESETS.otp.join('');
const RESEND_SECS = 45;

export function useAuthResetPassword() {
  const [otpDigits, setOtpDigits] = useState<string[]>(AUTH_RESET_PASSWORD_PRESETS.otp);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SECS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      otp: AUTH_RESET_PASSWORD_PRESETS.otp.join(''),
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
    setValue('otp', next.join(''), { shouldValidate: true });
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
      setValue('otp', text, { shouldValidate: true });
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtpDigits(Array(6).fill(''));
    setValue('otp', '', { shouldValidate: false });
    setCountdown(RESEND_SECS);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const onSubmit = async (data: AuthResetPasswordPayload) => {
    setFetchState('loading');
    setErrorMessage(null);
    
    const response = await authApi.resetPassword({ otp: data.otp, newPassword: data.newPassword });
    
    if (!response.success) {
      setFetchState('error');
      setErrorMessage(response.message);
      return;
    }

    setDone(true);
    setFetchState('success');
  };

  return {
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
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    newPassword,
    confirmPassword,
    handleDigitChange,
    handleDigitKeyDown,
    handlePaste,
    handleResend,
  };
}
