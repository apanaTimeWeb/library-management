import { Injectable } from '@nestjs/common';
import { ADMIN_CONSTANTS } from '../constants/admin.constants';

@Injectable()
export class StaffUsersService {
  async getStaffUsers(): Promise<any> {
    return ADMIN_CONSTANTS.EMPTY_ARRAY;
  }
}
