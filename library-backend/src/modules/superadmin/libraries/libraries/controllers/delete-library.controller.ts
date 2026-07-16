import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteLibraryService } from '../services/delete-library.service';

@Controller('api/v1/superadmin/libraries')
export class DeleteLibraryController {
  constructor(private readonly service: DeleteLibraryService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Library deleted successfully', data: null };
  }
}
