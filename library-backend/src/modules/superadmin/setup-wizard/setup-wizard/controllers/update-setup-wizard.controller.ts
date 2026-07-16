import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateSetupWizardService } from '../services/update-setup-wizard.service';
import { UpdateSetupWizardDto } from '../dto/update-setup-wizard.dto';

@Controller('api/v1/superadmin/setup-wizard')
export class UpdateSetupWizardController {
  constructor(private readonly service: UpdateSetupWizardService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateSetupWizardDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'SetupWizard updated successfully', data };
  }
}
