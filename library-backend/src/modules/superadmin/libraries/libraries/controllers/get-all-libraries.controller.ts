import { Controller, Get, Query } from '@nestjs/common';
import { GetAllLibrariesService } from '../services/get-all-libraries.service';
import { GetLibrariesQueryDto } from '../dto/get-libraries-query.dto';

@Controller('api/v1/superadmin/libraries')
export class GetAllLibrariesController {
  constructor(private readonly service: GetAllLibrariesService) {}

  @Get()
  async handle(@Query() query: GetLibrariesQueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: 'Libraries retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
