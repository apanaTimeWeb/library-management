import { Controller, Post, Body } from '@nestjs/common';
import { CreateSecurityDepositService } from '../services/create-security-deposit.service';
import { CreateSecurityDepositDto } from '../dto/create-security-deposit.dto';

@Controller('api/v1/superadmin/security-deposits')
export class CreateSecurityDepositController {
  constructor(private readonly service: CreateSecurityDepositService) {}

  @Post()
  async handle(@Body() dto: CreateSecurityDepositDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'SecurityDeposit created successfully', data };
  }
}
