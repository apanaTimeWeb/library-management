import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { WhatsappLogsCreateService } from '@/modules/manager/communication/whatsapp-logs/services/whatsapp-logs-create.service';
import { CreateWhatsAppMessageDto } from '@/modules/manager/communication/whatsapp-logs/dto/create-whatsapp-log.dto';

@ApiTags('Whatsapp-logs')
@Controller('api/v1/manager/whatsapp-logs')
export class WhatsappLogsCreateController {
  constructor(private readonly service: WhatsappLogsCreateService) {}

  @Post()
  async handle(@Body() dto: CreateWhatsAppMessageDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
