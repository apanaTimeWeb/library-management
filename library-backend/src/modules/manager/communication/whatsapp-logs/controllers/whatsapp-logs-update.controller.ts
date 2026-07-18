import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { WhatsappLogsUpdateService } from '@/modules/manager/communication/whatsapp-logs/services/whatsapp-logs-update.service';
import { UpdateWhatsAppMessageDto } from '@/modules/manager/communication/whatsapp-logs/dto/update-whatsapp-log.dto';

@ApiTags('Whatsapp-logs')
@Controller('api/v1/manager/whatsapp-logs')
export class WhatsappLogsUpdateController {
  constructor(private readonly service: WhatsappLogsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateWhatsAppMessageDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
