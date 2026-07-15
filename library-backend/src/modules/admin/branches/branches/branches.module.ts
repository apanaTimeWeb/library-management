import { Module } from '@nestjs/common';
import { AdminBranchesService } from './branches.service';

@Module({
  providers: [AdminBranchesService],
})
export class AdminBranchesModule {}
