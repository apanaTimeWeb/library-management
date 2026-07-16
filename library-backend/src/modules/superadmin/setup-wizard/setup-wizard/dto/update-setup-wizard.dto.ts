import { PartialType } from '@nestjs/mapped-types';
import { CreateSetupWizardDto } from './create-setup-wizard.dto';

export class UpdateSetupWizardDto extends PartialType(CreateSetupWizardDto) {}
