import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateSecurityDepositService } from '../services/update-security-deposit.service';
import { UpdateSecurityDepositDto } from '../dto/update-security-deposit.dto';

@Controller('api/v1/manager/security-deposits')
export class UpdateSecurityDepositController {
  constructor(private readonly service: UpdateSecurityDepositService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateSecurityDepositDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'SecurityDeposit updated successfully', data };
  }
}
