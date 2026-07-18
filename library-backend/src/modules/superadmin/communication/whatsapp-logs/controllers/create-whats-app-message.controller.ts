import { Controller, Post, Body } from '@nestjs/common';
import { CreateWhatsAppMessageService } from '../services/create-whats-app-message.service';
import { CreateWhatsAppMessageDto } from '../dto/create-whats-app-message.dto';

@Controller('api/v1/superadmin/whatsapp-logs')
export class CreateWhatsAppMessageController {
  constructor(private readonly service: CreateWhatsAppMessageService) {}

  @Post()
  async handle(@Body() dto: CreateWhatsAppMessageDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'WhatsAppMessage created successfully', data };
  }
}
