import { Injectable } from '@nestjs/common';
import { CreatenoticesDto } from '../dto/create-notices.dto';
import { UpdatenoticesDto } from '../dto/update-notices.dto';

@Injectable()
export class noticesService {
  create(createDto: CreatenoticesDto) {
    return 'This action adds a new notices';
  }

  findAll() {
    return 'This action returns all notices';
  }

  findOne(id: string) {
    return 'This action returns a notices';
  }

  update(id: string, updateDto: UpdatenoticesDto) {
    return 'This action updates a notices';
  }

  remove(id: string) {
    return 'This action removes a notices';
  }
}
