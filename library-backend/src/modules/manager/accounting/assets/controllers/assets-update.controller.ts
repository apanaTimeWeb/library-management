import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { AssetsUpdateService } from '@/modules/manager/accounting/assets/services/assets-update.service';
import { UpdateAssetDto } from '@/modules/manager/accounting/assets/dto/update-asset.dto';

@ApiTags('Assets')
@Controller('api/v1/manager/assets')
export class AssetsUpdateController {
  constructor(private readonly service: AssetsUpdateService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateAssetDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
