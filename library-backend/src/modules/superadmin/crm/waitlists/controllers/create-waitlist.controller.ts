import { Controller, Post, Body } from '@nestjs/common';
import { CreateWaitlistService } from '../services/create-waitlist.service';
import { CreateWaitlistDto } from '../dto/create-waitlist.dto';

@Controller('api/v1/superadmin/waitlists')
export class CreateWaitlistController {
  constructor(private readonly service: CreateWaitlistService) {}

  @Post()
  async handle(@Body() dto: CreateWaitlistDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Waitlist created successfully', data };
  }
}
