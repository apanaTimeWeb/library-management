import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type FetchState = 'idle' | 'loading' | 'success' | 'error';
export type ViewMode = 'kanban' | 'table';
