import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '@/core/entities/asset.entity';

import { AssetsCreateController } from '@/modules/manager/accounting/assets/controllers/assets-create.controller';
import { AssetsUpdateController } from '@/modules/manager/accounting/assets/controllers/assets-update.controller';
import { AssetsDeleteController } from '@/modules/manager/accounting/assets/controllers/assets-delete.controller';
import { AssetsGetAllController } from '@/modules/manager/accounting/assets/controllers/assets-get-all.controller';
import { AssetsGetController } from '@/modules/manager/accounting/assets/controllers/assets-get.controller';

import { AssetsCreateService } from '@/modules/manager/accounting/assets/services/assets-create.service';
import { AssetsUpdateService } from '@/modules/manager/accounting/assets/services/assets-update.service';
import { AssetsDeleteService } from '@/modules/manager/accounting/assets/services/assets-delete.service';
import { AssetsGetAllService } from '@/modules/manager/accounting/assets/services/assets-get-all.service';
import { AssetsGetService } from '@/modules/manager/accounting/assets/services/assets-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  controllers: [
    AssetsCreateController,
    AssetsUpdateController,
    AssetsDeleteController,
    AssetsGetAllController,
    AssetsGetController,
  ],
  providers: [
    AssetsCreateService,
    AssetsUpdateService,
    AssetsDeleteService,
    AssetsGetAllService,
    AssetsGetService,
  ],
  exports: [AssetsGetService],
})
export class ManagerAssetsModule {}
