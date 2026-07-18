import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { IdCardsCreateIdcardService } from '@/modules/manager/students/id-cards/services/id-cards-create-idcard.service';
import { CreateIDCardDto } from '@/modules/manager/students/id-cards/dto/create-idcard.dto';

@ApiTags('Id-cards')
@Controller('api/v1/manager/id-cards')
export class IdCardsCreateIdcardController {
  constructor(private readonly service: IdCardsCreateIdcardService) {}

  @Post()
  async handle(@Body() dto: CreateIDCardDto) {
    const data = await this.service.execute(dto);
    return data;
  }
}
