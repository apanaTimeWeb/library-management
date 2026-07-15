import { Module } from '@nestjs/common';
import { SuperadminBranchesService } from './branches.service';

@Module({
  providers: [SuperadminBranchesService],
})
export class SuperadminBranchesModule {}
