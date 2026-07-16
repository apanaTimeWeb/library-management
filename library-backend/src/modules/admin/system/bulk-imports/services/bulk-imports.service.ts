import { Injectable } from '@nestjs/common';
import { CreatebulkimportsDto } from '../dto/create-bulk-imports.dto';
import { UpdatebulkimportsDto } from '../dto/update-bulk-imports.dto';

@Injectable()
export class bulkimportsService {
  create(createDto: CreatebulkimportsDto) {
    return 'This action adds a new bulk-imports';
  }

  findAll() {
    return \This action returns all bulk-imports\;
  }

  findOne(id: string) {
    return \This action returns a #\ bulk-imports\;
  }

  update(id: string, updateDto: UpdatebulkimportsDto) {
    return \This action updates a #\ bulk-imports\;
  }

  remove(id: string) {
    return \This action removes a #\ bulk-imports\;
  }
}
