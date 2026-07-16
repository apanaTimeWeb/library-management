import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { blacklistService } from '../services/blacklist.service';
import { CreateblacklistDto } from '../dto/create-blacklist.dto';
import { UpdateblacklistDto } from '../dto/update-blacklist.dto';

@Controller('admin/blacklist/blacklist')
export class blacklistController {
  constructor(private readonly blacklistService: blacklistService) {}

  @Post()
  create(@Body() createDto: CreateblacklistDto) {
    return this.blacklistService.create(createDto);
  }

  @Get()
  findAll() {
    return this.blacklistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blacklistService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateblacklistDto) {
    return this.blacklistService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blacklistService.remove(id);
  }
}
