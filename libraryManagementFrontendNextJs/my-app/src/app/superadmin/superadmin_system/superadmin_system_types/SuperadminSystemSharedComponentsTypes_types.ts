import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'destructive' | 'secondary' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}
export interface SuperadminInputProps extends InputHTMLAttributes<HTMLInputElement> {}
export interface SuperadminLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}
export interface SuperadminTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
export interface SuperadminSwitchProps {
  checked: boolean;
  onCheckedChange: (c: boolean) => void;
  disabled?: boolean;
}
export interface SuperadminProgressProps {
  value: number;
}
export interface SuperadminKpiCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor?: string;
}
export interface SuperadminCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
export interface SuperadminBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}
