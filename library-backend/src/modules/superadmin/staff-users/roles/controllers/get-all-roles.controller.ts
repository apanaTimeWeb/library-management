import { Controller, Get, Query } from '@nestjs/common';
import { GetAllRolesService } from '../services/get-all-roles.service';
import { GetRolesQueryDto } from '../dto/get-roles-query.dto';

@Controller('api/v1/superadmin/roles')
export class GetAllRolesController {
  constructor(private readonly service: GetAllRolesService) {}

  @Get()
  async handle(@Query() query: GetRolesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Roles retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
