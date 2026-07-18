import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface SuperadminSetupWizardStep1Props {
  onNext: (d: BranchDetailsData) => void;
}
export interface SuperadminSetupWizardStep2Props {
  onNext: (d: ShiftsData) => void;
}
export interface SuperadminSetupWizardStep3Props {
  onNext: (d: SeatsData) => void;
}
export interface SuperadminSetupWizardStep4Props {
  onNext: (d: PlansData) => void;
}
