import { Controller, Get, Param } from '@nestjs/common';
import { GetWhatsAppTemplateService } from '../services/get-whats-app-template.service';

@Controller('api/v1/superadmin/whatsapp-templates')
export class GetWhatsAppTemplateController {
  constructor(private readonly service: GetWhatsAppTemplateService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'WhatsAppTemplate retrieved successfully', data };
  }
}
