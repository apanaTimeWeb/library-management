import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateWhatsAppTemplateService } from '../services/update-whats-app-template.service';
import { UpdateWhatsAppTemplateDto } from '../dto/update-whats-app-template.dto';

@Controller('api/v1/superadmin/whatsapp-templates')
export class UpdateWhatsAppTemplateController {
  constructor(private readonly service: UpdateWhatsAppTemplateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateWhatsAppTemplateDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'WhatsAppTemplate updated successfully', data };
  }
}
