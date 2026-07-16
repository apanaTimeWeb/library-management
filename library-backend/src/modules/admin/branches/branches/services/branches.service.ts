import { Injectable } from '@nestjs/common';
import { CreatebranchesDto } from '../dto/create-branches.dto';
import { UpdatebranchesDto } from '../dto/update-branches.dto';

@Injectable()
export class branchesService {
  create(createDto: CreatebranchesDto) {
    return 'This action adds a new branches';
  }

  findAll() {
    return 'This action returns all branches';
  }

  findOne(id: string) {
    return 'This action returns a branches';
  }

  update(id: string, updateDto: UpdatebranchesDto) {
    return 'This action updates a branches';
  }

  remove(id: string) {
    return 'This action removes a branches';
  }
}
