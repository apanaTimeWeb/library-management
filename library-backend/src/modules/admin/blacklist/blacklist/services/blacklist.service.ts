import { Injectable } from '@nestjs/common';
import { CreateblacklistDto } from '../dto/create-blacklist.dto';
import { UpdateblacklistDto } from '../dto/update-blacklist.dto';

@Injectable()
export class blacklistService {
  create(createDto: CreateblacklistDto) {
    return 'This action adds a new blacklist';
  }

  findAll() {
    return 'This action returns all blacklist';
  }

  findOne(id: string) {
    return 'This action returns a blacklist';
  }

  update(id: string, updateDto: UpdateblacklistDto) {
    return 'This action updates a blacklist';
  }

  remove(id: string) {
    return 'This action removes a blacklist';
  }
}
