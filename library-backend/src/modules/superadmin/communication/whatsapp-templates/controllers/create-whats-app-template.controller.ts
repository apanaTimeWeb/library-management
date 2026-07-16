import { Controller, Post, Body } from '@nestjs/common';
import { CreateWhatsAppTemplateService } from '../services/create-whats-app-template.service';
import { CreateWhatsAppTemplateDto } from '../dto/create-whats-app-template.dto';

@Controller('api/v1/superadmin/whatsapp-templates')
export class CreateWhatsAppTemplateController {
  constructor(private readonly service: CreateWhatsAppTemplateService) {}

  @Post()
  async handle(@Body() dto: CreateWhatsAppTemplateDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'WhatsAppTemplate created successfully', data };
  }
}
