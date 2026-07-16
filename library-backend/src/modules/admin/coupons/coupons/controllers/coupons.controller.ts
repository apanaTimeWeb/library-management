import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { couponsService } from '../services/coupons.service';
import { CreatecouponsDto } from '../dto/create-coupons.dto';
import { UpdatecouponsDto } from '../dto/update-coupons.dto';

@Controller('admin/coupons/coupons')
export class couponsController {
  constructor(private readonly couponsService: couponsService) {}

  @Post()
  create(@Body() createDto: CreatecouponsDto) {
    return this.couponsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.couponsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatecouponsDto) {
    return this.couponsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(id);
  }
}
