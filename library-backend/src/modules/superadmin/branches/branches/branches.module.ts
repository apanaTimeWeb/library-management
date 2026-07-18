import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from '@/core/entities/branch.entity';

import { CreateBranchController } from './controllers/create-branch.controller';
import { UpdateBranchController } from './controllers/update-branch.controller';
import { DeleteBranchController } from './controllers/delete-branch.controller';
import { GetAllBranchsController } from './controllers/get-all-branches.controller';
import { GetBranchController } from './controllers/get-branch.controller';

import { CreateBranchService } from './services/create-branch.service';
import { UpdateBranchService } from './services/update-branch.service';
import { DeleteBranchService } from './services/delete-branch.service';
import { GetAllBranchsService } from './services/get-all-branches.service';
import { GetBranchService } from './services/get-branch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  controllers: [
    CreateBranchController,
    UpdateBranchController,
    DeleteBranchController,
    GetAllBranchsController,
    GetBranchController,
  ],
  providers: [
    CreateBranchService,
    UpdateBranchService,
    DeleteBranchService,
    GetAllBranchsService,
    GetBranchService,
  ],
  exports: [GetBranchService],
})
export class SuperadminBranchesModule {}
