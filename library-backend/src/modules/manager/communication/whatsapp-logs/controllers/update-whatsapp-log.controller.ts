import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateWhatsAppMessageService } from '../services/update-whatsapp-log.service';
import { UpdateWhatsAppMessageDto } from '../dto/update-whatsapp-log.dto';

@Controller('api/v1/manager/whatsapp-logs')
export class UpdateWhatsAppMessageController {
  constructor(private readonly service: UpdateWhatsAppMessageService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateWhatsAppMessageDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'WhatsAppMessage updated successfully', data };
  }
}
