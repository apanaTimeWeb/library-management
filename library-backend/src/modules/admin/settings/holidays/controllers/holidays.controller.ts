import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { holidaysService } from '../services/holidays.service';
import { CreateholidaysDto } from '../dto/create-holidays.dto';
import { UpdateholidaysDto } from '../dto/update-holidays.dto';

@Controller('admin/settings/holidays')
export class holidaysController {
  constructor(private readonly holidaysService: holidaysService) {}

  @Post()
  create(@Body() createDto: CreateholidaysDto) {
    return this.holidaysService.create(createDto);
  }

  @Get()
  findAll() {
    return this.holidaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holidaysService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateholidaysDto) {
    return this.holidaysService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holidaysService.remove(id);
  }
}
