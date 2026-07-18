import { Controller, Post, Body } from '@nestjs/common';
import { CreateBlacklistService } from '../services/create-blacklist.service';
import { CreateBlacklistDto } from '../dto/create-blacklist.dto';

@Controller('api/v1/superadmin/blacklist')
export class CreateBlacklistController {
  constructor(private readonly service: CreateBlacklistService) {}

  @Post()
  async handle(@Body() dto: CreateBlacklistDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Blacklist created successfully', data };
  }
}
