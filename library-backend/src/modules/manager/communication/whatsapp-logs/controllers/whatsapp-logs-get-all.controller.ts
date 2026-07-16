import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { WhatsappLogsGetAllService } from '@/modules/manager/communication/whatsapp-logs/services/whatsapp-logs-get-all.service';
import { GetWhatsAppMessagesQueryDto } from '@/modules/manager/communication/whatsapp-logs/dto/get-whatsapp-logs-query.dto';

@ApiTags('Whatsapp-logs')
@Controller('api/v1/manager/whatsapp-logs')
export class WhatsappLogsGetAllController {
  constructor(private readonly service: WhatsappLogsGetAllService) {}

  @Get()
  async handle(@Query() query: GetWhatsAppMessagesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'WhatsAppMessages retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
