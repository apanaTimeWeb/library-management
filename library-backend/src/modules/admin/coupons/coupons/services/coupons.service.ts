import { Injectable } from '@nestjs/common';
import { CreatecouponsDto } from '../dto/create-coupons.dto';
import { UpdatecouponsDto } from '../dto/update-coupons.dto';

@Injectable()
export class couponsService {
  create(createDto: CreatecouponsDto) {
    return 'This action adds a new coupons';
  }

  findAll() {
    return 'This action returns all coupons';
  }

  findOne(id: string) {
    return 'This action returns a coupons';
  }

  update(id: string, updateDto: UpdatecouponsDto) {
    return 'This action updates a coupons';
  }

  remove(id: string) {
    return 'This action removes a coupons';
  }
}
