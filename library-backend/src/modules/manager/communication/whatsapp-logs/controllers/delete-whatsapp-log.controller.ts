import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteWhatsAppMessageService } from '../services/delete-whatsapp-log.service';

@Controller('api/v1/manager/whatsapp-logs')
export class DeleteWhatsAppMessageController {
  constructor(private readonly service: DeleteWhatsAppMessageService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'WhatsAppMessage deleted successfully', data: null };
  }
}
