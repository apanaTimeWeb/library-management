import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { AssetsGetService } from '@/modules/manager/accounting/assets/services/assets-get.service';

@ApiTags('Assets')
@Controller('api/v1/manager/assets')
export class AssetsGetController {
  constructor(private readonly service: AssetsGetService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
