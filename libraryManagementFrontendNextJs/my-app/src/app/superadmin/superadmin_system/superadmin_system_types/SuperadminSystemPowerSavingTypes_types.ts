import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminSystemPowerZone {
  name: string;
  current: number;
  capacity: number;
  occupancy: number;
}
export interface SuperadminSystemPowerAlert {
  date: string;
  shift: string;
  zone: string;
  threshold: string;
  action: string;
}
