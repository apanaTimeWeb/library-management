import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteWhatsAppMessageService } from '../services/delete-whats-app-message.service';

@Controller('api/v1/superadmin/whatsapp-logs')
export class DeleteWhatsAppMessageController {
  constructor(private readonly service: DeleteWhatsAppMessageService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'WhatsAppMessage deleted successfully', data: null };
  }
}
