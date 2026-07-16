import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { bulkimportsService } from '../services/bulk-imports.service';
import { CreatebulkimportsDto } from '../dto/create-bulk-imports.dto';
import { UpdatebulkimportsDto } from '../dto/update-bulk-imports.dto';

@Controller('admin/system/bulk-imports')
export class bulkimportsController {
  constructor(private readonly bulkimportsService: bulkimportsService) {}

  @Post()
  create(@Body() createDto: CreatebulkimportsDto) {
    return this.bulkimportsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.bulkimportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bulkimportsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatebulkimportsDto) {
    return this.bulkimportsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bulkimportsService.remove(id);
  }
}
