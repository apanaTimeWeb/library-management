import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteIDCardService } from '../services/delete-idcard.service';

@Controller('api/v1/manager/id-cards')
export class DeleteIDCardController {
  constructor(private readonly service: DeleteIDCardService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'IDCard deleted successfully', data: null };
  }
}
