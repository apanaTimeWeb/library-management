import { Controller, Post, Body } from '@nestjs/common';
import { CreateWhatsAppMessageService } from '../services/create-whatsapp-log.service';
import { CreateWhatsAppMessageDto } from '../dto/create-whatsapp-log.dto';

@Controller('api/v1/manager/whatsapp-logs')
export class CreateWhatsAppMessageController {
  constructor(private readonly service: CreateWhatsAppMessageService) {}

  @Post()
  async handle(@Body() dto: CreateWhatsAppMessageDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'WhatsAppMessage created successfully', data };
  }
}
