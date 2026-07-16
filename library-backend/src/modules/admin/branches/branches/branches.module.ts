import { Module } from '@nestjs/common';
import { BranchesAdminService } from './branches.service';

@Module({
  providers: [BranchesAdminService],
})
export class BranchesAdminModule {}
