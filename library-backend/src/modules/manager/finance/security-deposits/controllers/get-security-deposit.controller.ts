import { Controller, Get, Param } from '@nestjs/common';
import { GetSecurityDepositService } from '../services/get-security-deposit.service';

@Controller('api/v1/manager/security-deposits')
export class GetSecurityDepositController {
  constructor(private readonly service: GetSecurityDepositService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'SecurityDeposit retrieved successfully', data };
  }
}
