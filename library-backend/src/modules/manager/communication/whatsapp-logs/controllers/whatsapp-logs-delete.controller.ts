import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { WhatsappLogsDeleteService } from '@/modules/manager/communication/whatsapp-logs/services/whatsapp-logs-delete.service';

@ApiTags('Whatsapp-logs')
@Controller('api/v1/manager/whatsapp-logs')
export class WhatsappLogsDeleteController {
  constructor(private readonly service: WhatsappLogsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
