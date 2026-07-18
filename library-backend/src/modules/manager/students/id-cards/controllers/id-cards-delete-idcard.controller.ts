import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Param } from '@nestjs/common';
import { IdCardsDeleteIdcardService } from '@/modules/manager/students/id-cards/services/id-cards-delete-idcard.service';

@ApiTags('Id-cards')
@Controller('api/v1/manager/id-cards')
export class IdCardsDeleteIdcardController {
  constructor(private readonly service: IdCardsDeleteIdcardService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return null ;
  }
}
