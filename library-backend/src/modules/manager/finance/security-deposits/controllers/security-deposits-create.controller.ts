import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { SecurityDepositsCreateService } from '@/modules/manager/finance/security-deposits/services/security-deposits-create.service';
import { CreateSecurityDepositDto } from '@/modules/manager/finance/security-deposits/dto/create-security-deposit.dto';

@ApiTags('Security-deposits')
@Controller('api/v1/manager/security-deposits')
export class SecurityDepositsCreateController {
  constructor(private readonly service: SecurityDepositsCreateService) {}

  @Post()
  async handle(@Body() dto: CreateSecurityDepositDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
