import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { branchesService } from '../services/branches.service';
import { CreatebranchesDto } from '../dto/create-branches.dto';
import { UpdatebranchesDto } from '../dto/update-branches.dto';

@Controller('admin/branches/branches')
export class branchesController {
  constructor(private readonly branchesService: branchesService) {}

  @Post()
  create(@Body() createDto: CreatebranchesDto) {
    return this.branchesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.branchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatebranchesDto) {
    return this.branchesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchesService.remove(id);
  }
}
