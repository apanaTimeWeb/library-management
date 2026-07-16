import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '@/core/entities/asset.entity';

import { CreateAssetController } from './controllers/create-asset.controller';
import { UpdateAssetController } from './controllers/update-asset.controller';
import { DeleteAssetController } from './controllers/delete-asset.controller';
import { GetAllAssetsController } from './controllers/get-all-assets.controller';
import { GetAssetController } from './controllers/get-asset.controller';

import { CreateAssetService } from './services/create-asset.service';
import { UpdateAssetService } from './services/update-asset.service';
import { DeleteAssetService } from './services/delete-asset.service';
import { GetAllAssetsService } from './services/get-all-assets.service';
import { GetAssetService } from './services/get-asset.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  controllers: [
    CreateAssetController,
    UpdateAssetController,
    DeleteAssetController,
    GetAllAssetsController,
    GetAssetController,
  ],
  providers: [
    CreateAssetService,
    UpdateAssetService,
    DeleteAssetService,
    GetAllAssetsService,
    GetAssetService,
  ],
  exports: [GetAssetService],
})
export class ManagerAssetsModule {}
