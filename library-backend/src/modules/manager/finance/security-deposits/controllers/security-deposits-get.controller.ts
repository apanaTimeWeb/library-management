import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { SecurityDepositsGetService } from '@/modules/manager/finance/security-deposits/services/security-deposits-get.service';

@ApiTags('Security-deposits')
@Controller('api/v1/manager/security-deposits')
export class SecurityDepositsGetController {
  constructor(private readonly service: SecurityDepositsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
