import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { NoticesDeleteService } from '@/modules/manager/engagement/notices/services/notices-delete.service';

@ApiTags('Notices')
@Controller('api/v1/manager/notices')
export class NoticesDeleteController {
  constructor(private readonly service: NoticesDeleteService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
