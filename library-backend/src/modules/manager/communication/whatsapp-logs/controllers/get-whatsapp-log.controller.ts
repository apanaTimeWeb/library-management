import { Controller, Get, Param } from '@nestjs/common';
import { GetWhatsAppMessageService } from '../services/get-whatsapp-log.service';

@Controller('api/v1/manager/whatsapp-logs')
export class GetWhatsAppMessageController {
  constructor(private readonly service: GetWhatsAppMessageService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'WhatsAppMessage retrieved successfully', data };
  }
}
