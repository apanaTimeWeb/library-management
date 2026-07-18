import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { SecurityDepositsGetAllService } from '@/modules/manager/finance/security-deposits/services/security-deposits-get-all.service';
import { GetSecurityDepositsQueryDto } from '@/modules/manager/finance/security-deposits/dto/get-security-deposits-query.dto';

@ApiTags('Security-deposits')
@Controller('api/v1/manager/security-deposits')
export class SecurityDepositsGetAllController {
  constructor(private readonly service: SecurityDepositsGetAllService) {}

  @Get()
  async handle(@Query() query: GetSecurityDepositsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'SecurityDeposits retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
