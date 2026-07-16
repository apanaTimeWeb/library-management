import { z } from 'zod';

export const authLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email or phone is required'),
  password: z
    .string()
    .min(1, 'Password is required'),
  role: z.enum(['superadmin', 'admin', 'manager']),
});

export const authSignupSchema = z
  .object({
    ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
    libraryName: z.string().min(2, 'Library name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    phone: z
      .string()
      .min(1, 'Phone is required')
      .regex(/^\+91\s?\d{10}$/, 'Must be +91 followed by 10 digits'),
    password: z
      .string()
      .min(8, 'Minimum 8 characters')
      .regex(/[A-Z]/, 'Must include an uppercase letter')
      .regex(/[0-9]/, 'Must include a number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const authForgotPasswordSchema = z.object({
  identity: z.string().min(1, 'Phone or email is required'),
});

export const authResetPasswordSchema = z
  .object({
    otp: z
      .string()
      .length(6, 'OTP must be exactly 6 digits')
      .regex(/^\d{6}$/, 'OTP must contain only digits'),
    newPassword: z
      .string()
      .min(8, 'Minimum 8 characters')
      .regex(/[A-Z]/, 'Must include an uppercase letter')
      .regex(/[0-9]/, 'Must include a number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
