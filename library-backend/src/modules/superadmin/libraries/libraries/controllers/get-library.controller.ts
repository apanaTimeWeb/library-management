import { Controller, Get, Param } from '@nestjs/common';
import { GetLibraryService } from '../services/get-library.service';

@Controller('api/v1/superadmin/libraries')
export class GetLibraryController {
  constructor(private readonly service: GetLibraryService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Library retrieved successfully', data };
  }
}
