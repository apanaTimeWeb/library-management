import { Controller, Get, Param } from '@nestjs/common';
import { GetBlacklistService } from '../services/get-blacklist.service';

@Controller('api/v1/superadmin/blacklist')
export class GetBlacklistController {
  constructor(private readonly service: GetBlacklistService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Blacklist retrieved successfully', data };
  }
}
