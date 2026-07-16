import { Controller, Post, Body } from '@nestjs/common';
import { CreateIDCardService } from '../services/create-idcard.service';
import { CreateIDCardDto } from '../dto/create-idcard.dto';

@Controller('api/v1/manager/id-cards')
export class CreateIDCardController {
  constructor(private readonly service: CreateIDCardService) {}

  @Post()
  async handle(@Body() dto: CreateIDCardDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'IDCard created successfully', data };
  }
}
