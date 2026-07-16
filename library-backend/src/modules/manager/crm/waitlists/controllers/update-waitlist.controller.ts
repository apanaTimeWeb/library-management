import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateWaitlistService } from '../services/update-waitlist.service';
import { UpdateWaitlistDto } from '../dto/update-waitlist.dto';

@Controller('api/v1/manager/waitlists')
export class UpdateWaitlistController {
  constructor(private readonly service: UpdateWaitlistService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateWaitlistDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Waitlist updated successfully', data };
  }
}
