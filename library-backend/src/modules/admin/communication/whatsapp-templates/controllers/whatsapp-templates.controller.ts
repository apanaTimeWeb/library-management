import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { whatsapptemplatesService } from '../services/whatsapp-templates.service';
import { CreatewhatsapptemplatesDto } from '../dto/create-whatsapp-templates.dto';
import { UpdatewhatsapptemplatesDto } from '../dto/update-whatsapp-templates.dto';

@Controller('admin/communication/whatsapp-templates')
export class whatsapptemplatesController {
  constructor(private readonly whatsapptemplatesService: whatsapptemplatesService) {}

  @Post()
  create(@Body() createDto: CreatewhatsapptemplatesDto) {
    return this.whatsapptemplatesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.whatsapptemplatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whatsapptemplatesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatewhatsapptemplatesDto) {
    return this.whatsapptemplatesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whatsapptemplatesService.remove(id);
  }
}
