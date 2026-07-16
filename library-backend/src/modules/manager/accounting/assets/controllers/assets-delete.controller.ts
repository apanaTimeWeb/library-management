import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { AssetsDeleteService } from '@/modules/manager/accounting/assets/services/assets-delete.service';

@ApiTags('Assets')
@Controller('api/v1/manager/assets')
export class AssetsDeleteController {
  constructor(private readonly service: AssetsDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
