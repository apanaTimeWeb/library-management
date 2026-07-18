import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteWhatsAppTemplateService } from '../services/delete-whats-app-template.service';

@Controller('api/v1/superadmin/whatsapp-templates')
export class DeleteWhatsAppTemplateController {
  constructor(private readonly service: DeleteWhatsAppTemplateService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'WhatsAppTemplate deleted successfully', data: null };
  }
}
