import { Controller, Get, Param } from '@nestjs/common';
import { GetSetupWizardService } from '../services/get-setup-wizard.service';

@Controller('api/v1/superadmin/setup-wizard')
export class GetSetupWizardController {
  constructor(private readonly service: GetSetupWizardService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'SetupWizard retrieved successfully', data };
  }
}
