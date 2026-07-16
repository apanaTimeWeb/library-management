import { Injectable } from '@nestjs/common';
import { CreateholidaysDto } from '../dto/create-holidays.dto';
import { UpdateholidaysDto } from '../dto/update-holidays.dto';

@Injectable()
export class holidaysService {
  create(createDto: CreateholidaysDto) {
    return 'This action adds a new holidays';
  }

  findAll() {
    return \This action returns all holidays\;
  }

  findOne(id: string) {
    return \This action returns a #\ holidays\;
  }

  update(id: string, updateDto: UpdateholidaysDto) {
    return \This action updates a #\ holidays\;
  }

  remove(id: string) {
    return \This action removes a #\ holidays\;
  }
}
