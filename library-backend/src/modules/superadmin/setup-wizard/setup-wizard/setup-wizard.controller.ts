import { Controller } from '@nestjs/common';
import { SuperadminSetupWizardService } from './setup-wizard.service';

@Controller('api/superadmin/setup-wizard')
export class SuperadminSetupWizardController {
  constructor(private readonly service: SuperadminSetupWizardService) {}
}
