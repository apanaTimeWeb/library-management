import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteSecurityDepositService } from '../services/delete-security-deposit.service';

@Controller('api/v1/manager/security-deposits')
export class DeleteSecurityDepositController {
  constructor(private readonly service: DeleteSecurityDepositService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'SecurityDeposit deleted successfully', data: null };
  }
}
