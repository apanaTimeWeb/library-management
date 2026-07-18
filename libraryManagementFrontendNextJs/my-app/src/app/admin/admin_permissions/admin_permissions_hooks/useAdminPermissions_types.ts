import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface Permission {
  module: string;
  actions: {
    label: string;
    key: string;
    roles: Record<Role, boolean>;
  }[];
}
export type Role = 'Manager';
