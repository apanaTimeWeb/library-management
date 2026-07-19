// RESPONSIBILITY: Renders or handles logic for SuperadminSetupWizardTypes.ts.
import type { BranchDetailsData, ShiftsData, SeatsData, PlansData } from '@/app/superadmin/superadmin_shared_components/Superadminsuperadmin_schema';


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

