import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetupWizard } from '@/core/entities/setup-wizard.entity';

import { CreateSetupWizardController } from './controllers/create-setup-wizard.controller';
import { UpdateSetupWizardController } from './controllers/update-setup-wizard.controller';
import { DeleteSetupWizardController } from './controllers/delete-setup-wizard.controller';
import { GetAllSetupWizardsController } from './controllers/get-all-setup-wizard.controller';
import { GetSetupWizardController } from './controllers/get-setup-wizard.controller';

import { CreateSetupWizardService } from './services/create-setup-wizard.service';
import { UpdateSetupWizardService } from './services/update-setup-wizard.service';
import { DeleteSetupWizardService } from './services/delete-setup-wizard.service';
import { GetAllSetupWizardsService } from './services/get-all-setup-wizard.service';
import { GetSetupWizardService } from './services/get-setup-wizard.service';

@Module({
  imports: [TypeOrmModule.forFeature([SetupWizard])],
  controllers: [
    CreateSetupWizardController,
    UpdateSetupWizardController,
    DeleteSetupWizardController,
    GetAllSetupWizardsController,
    GetSetupWizardController,
  ],
  providers: [
    CreateSetupWizardService,
    UpdateSetupWizardService,
    DeleteSetupWizardService,
    GetAllSetupWizardsService,
    GetSetupWizardService,
  ],
  exports: [GetSetupWizardService],
})
export class SuperadminSetupWizardModule {}
