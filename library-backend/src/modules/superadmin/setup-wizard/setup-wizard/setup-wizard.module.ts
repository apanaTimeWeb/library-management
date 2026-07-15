import { Module } from '@nestjs/common';
import { SuperadminSetupWizardController } from './setup-wizard.controller';
import { SuperadminSetupWizardService } from './setup-wizard.service';

@Module({
  controllers: [SuperadminSetupWizardController],
  providers: [SuperadminSetupWizardService],
})
export class SuperadminSetupWizardModule {}
