import { Controller, Patch, Param, Body } from '@nestjs/common';
import { UpdateBranchService } from '../services/update-branch.service';
import { UpdateBranchDto } from '../dto/update-branch.dto';

@Controller('api/v1/superadmin/branches')
export class UpdateBranchController {
  constructor(private readonly service: UpdateBranchService) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: UpdateBranchDto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: 'Branch updated successfully', data };
  }
}
