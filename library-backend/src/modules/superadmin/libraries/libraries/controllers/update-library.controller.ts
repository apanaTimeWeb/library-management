import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateLibraryService } from '../services/update-library.service';
import { UpdateLibraryDto } from '../dto/update-library.dto';

@Controller('api/v1/superadmin/libraries')
export class UpdateLibraryController {
  constructor(private readonly service: UpdateLibraryService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateLibraryDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Library updated successfully', data };
  }
}
