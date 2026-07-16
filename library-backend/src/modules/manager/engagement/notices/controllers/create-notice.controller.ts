import { Controller, Post, Body } from '@nestjs/common';
import { CreateNoticeService } from '../services/create-notice.service';
import { CreateNoticeDto } from '../dto/create-notice.dto';

@Controller('api/v1/manager/notices')
export class CreateNoticeController {
  constructor(private readonly service: CreateNoticeService) {}

  @Post()
  async handle(@Body() dto: CreateNoticeDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Notice created successfully', data };
  }
}
