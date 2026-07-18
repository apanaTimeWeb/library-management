import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { noticesService } from '../services/notices.service';
import { CreatenoticesDto } from '../dto/create-notices.dto';
import { UpdatenoticesDto } from '../dto/update-notices.dto';

@Controller('admin/engagement/notices')
export class noticesController {
  constructor(private readonly noticesService: noticesService) {}

  @Post()
  create(@Body() createDto: CreatenoticesDto) {
    return this.noticesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.noticesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatenoticesDto) {
    return this.noticesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticesService.remove(id);
  }
}
