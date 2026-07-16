import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { IdCardsGetIdcardService } from '@/modules/manager/students/id-cards/services/id-cards-get-idcard.service';

@ApiTags('Id-cards')
@Controller('api/v1/manager/id-cards')
export class IdCardsGetIdcardController {
  constructor(private readonly service: IdCardsGetIdcardService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return data;
  }
}
