import { Controller, Get, Param } from '@nestjs/common';
import { GetBranchService } from '../services/get-branch.service';

@Controller('api/v1/superadmin/branches')
export class GetBranchController {
  constructor(private readonly service: GetBranchService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: 'Branch retrieved successfully', data };
  }
}
