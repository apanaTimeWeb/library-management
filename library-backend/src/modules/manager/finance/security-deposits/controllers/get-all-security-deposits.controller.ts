import { Controller, Get, Query } from '@nestjs/common';
import { GetAllSecurityDepositsService } from '../services/get-all-security-deposits.service';
import { GetSecurityDepositsQueryDto } from '../dto/get-security-deposits-query.dto';

@Controller('api/v1/manager/security-deposits')
export class GetAllSecurityDepositsController {
  constructor(private readonly service: GetAllSecurityDepositsService) {}

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
