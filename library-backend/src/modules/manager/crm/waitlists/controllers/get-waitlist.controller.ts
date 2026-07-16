import { Controller, Get, Param } from '@nestjs/common';
import { GetWaitlistService } from '../services/get-waitlist.service';

@Controller('api/v1/manager/waitlists')
export class GetWaitlistController {
  constructor(private readonly service: GetWaitlistService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Waitlist retrieved successfully', data };
  }
}
