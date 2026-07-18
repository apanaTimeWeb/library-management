import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateBlacklistService } from '../services/update-blacklist.service';
import { UpdateBlacklistDto } from '../dto/update-blacklist.dto';

@Controller('api/v1/superadmin/blacklist')
export class UpdateBlacklistController {
  constructor(private readonly service: UpdateBlacklistService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateBlacklistDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Blacklist updated successfully', data };
  }
}
