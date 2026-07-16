import { Controller, Post, Body } from '@nestjs/common';
import { CreateAssetService } from '../services/create-asset.service';
import { CreateAssetDto } from '../dto/create-asset.dto';

@Controller('api/v1/manager/assets')
export class CreateAssetController {
  constructor(private readonly service: CreateAssetService) {}

  @Post()
  async handle(@Body() dto: CreateAssetDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Asset created successfully', data };
  }
}
