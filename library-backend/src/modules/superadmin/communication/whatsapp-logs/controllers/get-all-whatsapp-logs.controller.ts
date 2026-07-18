import { Controller, Get, Query } from '@nestjs/common';
import { GetAllWhatsAppMessagesService } from '../services/get-all-whatsapp-logs.service';
import { GetWhatsAppMessagesQueryDto } from '../dto/get-whatsapp-logs-query.dto';

@Controller('api/v1/superadmin/whatsapp-logs')
export class GetAllWhatsAppMessagesController {
  constructor(private readonly service: GetAllWhatsAppMessagesService) {}

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
