import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteBranchService } from '../services/delete-branch.service';

@Controller('api/v1/superadmin/branches')
export class DeleteBranchController {
  constructor(private readonly service: DeleteBranchService) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: 'Branch deleted successfully', data: null };
  }
}
