import { Controller, Post, Body } from '@nestjs/common';
import { CreateLibraryService } from '../services/create-library.service';
import { CreateLibraryDto } from '../dto/create-library.dto';

@Controller('api/v1/superadmin/libraries')
export class CreateLibraryController {
  constructor(private readonly service: CreateLibraryService) {}

  @Post()
  async handle(@Body() dto: CreateLibraryDto) {
    const data = await this.service.execute(dto);
    return { success: true, message: 'Library created successfully', data };
  }
}
