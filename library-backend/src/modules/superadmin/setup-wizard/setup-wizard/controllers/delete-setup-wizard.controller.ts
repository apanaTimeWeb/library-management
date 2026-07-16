import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteSetupWizardService } from '../services/delete-setup-wizard.service';

@Controller('api/v1/superadmin/setup-wizard')
export class DeleteSetupWizardController {
  constructor(private readonly service: DeleteSetupWizardService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'SetupWizard deleted successfully', data: null };
  }
}
