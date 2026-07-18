import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type NavItem =
  | { group: string }
  | { href: string; icon: LucideIcon; label: string };
