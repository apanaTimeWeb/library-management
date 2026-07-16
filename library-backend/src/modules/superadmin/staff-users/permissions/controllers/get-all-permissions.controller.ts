import { Controller, Get, Query } from '@nestjs/common';
import { GetAllPermissionsService } from '../services/get-all-permissions.service';
import { GetPermissionsQueryDto } from '../dto/get-permissions-query.dto';

@Controller('api/v1/superadmin/permissions')
export class GetAllPermissionsController {
  constructor(private readonly service: GetAllPermissionsService) {}

  @Get()
  async handle(@Query() query: GetPermissionsQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Permissions retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
