import { Controller, Post, Body } from '@nestjs/common';
import { CreateBranchService } from '../services/create-branch.service';
import { CreateBranchDto } from '../dto/create-branch.dto';

@Controller('api/v1/superadmin/branches')
export class CreateBranchController {
  constructor(private readonly service: CreateBranchService) {}

  @Post()
  async handle(@Body() dto: CreateBranchDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Branch created successfully', data };
  }
}
