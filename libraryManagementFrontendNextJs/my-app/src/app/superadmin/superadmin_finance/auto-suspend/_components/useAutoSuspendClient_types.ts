import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export type AutoSuspendConfigFormData = z.infer<typeof autoSuspendConfigSchema>;
export type ManualRestoreFormData = z.infer<typeof manualRestoreSchema>;
