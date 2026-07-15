import { Injectable } from '@nestjs/common';
import { ADMIN_CONSTANTS } from '@/modules/admin/dashboard/admin/constants/admin.constants';

@Injectable()
export class BranchesService {
  async getBranches(): Promise<any[]> {
    return ADMIN_CONSTANTS.EMPTY_ARRAY;
  }
}
