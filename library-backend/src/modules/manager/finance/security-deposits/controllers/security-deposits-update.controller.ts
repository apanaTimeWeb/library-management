import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { SecurityDepositsUpdateService } from '@/modules/manager/finance/security-deposits/services/security-deposits-update.service';
import { UpdateSecurityDepositDto } from '@/modules/manager/finance/security-deposits/dto/update-security-deposit.dto';

@ApiTags('Security-deposits')
@Controller('api/v1/manager/security-deposits')
export class SecurityDepositsUpdateController {
  constructor(private readonly service: SecurityDepositsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateSecurityDepositDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
