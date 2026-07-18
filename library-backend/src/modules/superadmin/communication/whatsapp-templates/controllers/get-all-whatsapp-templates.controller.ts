import { Controller, Get, Query } from '@nestjs/common';
import { GetAllWhatsAppTemplatesService } from '../services/get-all-whatsapp-templates.service';
import { GetWhatsAppTemplatesQueryDto } from '../dto/get-whatsapp-templates-query.dto';

@Controller('api/v1/superadmin/whatsapp-templates')
export class GetAllWhatsAppTemplatesController {
  constructor(private readonly service: GetAllWhatsAppTemplatesService) {}

  @Get()
  async handle(@Query() query: GetWhatsAppTemplatesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'WhatsAppTemplates retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
