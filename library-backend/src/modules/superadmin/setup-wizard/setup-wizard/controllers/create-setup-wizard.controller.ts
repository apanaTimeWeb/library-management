import { Controller, Post, Body } from '@nestjs/common';
import { CreateSetupWizardService } from '../services/create-setup-wizard.service';
import { CreateSetupWizardDto } from '../dto/create-setup-wizard.dto';

@Controller('api/v1/superadmin/setup-wizard')
export class CreateSetupWizardController {
  constructor(private readonly service: CreateSetupWizardService) {}

  @Post()
  async handle(@Body() dto: CreateSetupWizardDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'SetupWizard created successfully', data };
  }
}
