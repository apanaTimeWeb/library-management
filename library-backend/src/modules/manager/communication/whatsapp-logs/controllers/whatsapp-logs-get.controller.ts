import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { WhatsappLogsGetService } from '@/modules/manager/communication/whatsapp-logs/services/whatsapp-logs-get.service';

@ApiTags('Whatsapp-logs')
@Controller('api/v1/manager/whatsapp-logs')
export class WhatsappLogsGetController {
  constructor(private readonly service: WhatsappLogsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
