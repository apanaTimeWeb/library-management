import { Controller, Get, Param } from '@nestjs/common';
import { GetWhatsAppMessageService } from '../services/get-whats-app-message.service';

@Controller('api/v1/superadmin/whatsapp-logs')
export class GetWhatsAppMessageController {
  constructor(private readonly service: GetWhatsAppMessageService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'WhatsAppMessage retrieved successfully', data };
  }
}
