import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface BookedBlock { startH: number; endH: number; label: string; }
export interface GapBlock    { startH: number; endH: number; seats: number; revLoss: number; }
export interface ShiftData   { id: string; name: string; occupied: number; capacity: number; booked: BookedBlock[]; gaps: GapBlock[]; }
