import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { AssetsCreateService } from '@/modules/manager/accounting/assets/services/assets-create.service';
import { CreateAssetDto } from '@/modules/manager/accounting/assets/dto/create-asset.dto';

@ApiTags('Assets')
@Controller('api/v1/manager/assets')
export class AssetsCreateController {
  constructor(private readonly service: AssetsCreateService) {}

  @Post()
  async handle(@Body() dto: CreateAssetDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
