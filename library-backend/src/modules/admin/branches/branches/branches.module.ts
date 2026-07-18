import { Module } from '@nestjs/common';
import { branchesController } from './controllers/branches.controller';
import { branchesService } from './services/branches.service';

@Module({
  controllers: [branchesController],
  providers: [branchesService],
})
export class branchesModule {}
