import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { whatsappmessagesService } from '../services/whatsapp-messages.service';
import { CreatewhatsappmessagesDto } from '../dto/create-whatsapp-messages.dto';
import { UpdatewhatsappmessagesDto } from '../dto/update-whatsapp-messages.dto';

@Controller('admin/communication/whatsapp-messages')
export class whatsappmessagesController {
  constructor(private readonly whatsappmessagesService: whatsappmessagesService) {}

  @Post()
  create(@Body() createDto: CreatewhatsappmessagesDto) {
    return this.whatsappmessagesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.whatsappmessagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whatsappmessagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatewhatsappmessagesDto) {
    return this.whatsappmessagesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whatsappmessagesService.remove(id);
  }
}
