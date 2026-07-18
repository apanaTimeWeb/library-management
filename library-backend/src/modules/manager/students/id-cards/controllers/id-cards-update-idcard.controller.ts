import { ApiTags } from '@nestjs/swagger';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { IdCardsUpdateIdcardService } from '@/modules/manager/students/id-cards/services/id-cards-update-idcard.service';
import { UpdateIDCardDto } from '@/modules/manager/students/id-cards/dto/update-idcard.dto';

@ApiTags('Id-cards')
@Controller('api/v1/manager/id-cards')
export class IdCardsUpdateIdcardController {
  constructor(private readonly service: IdCardsUpdateIdcardService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateIDCardDto) {
    const data = await this.service.execute(id, dto);
    return data;
  }
}
