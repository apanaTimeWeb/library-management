import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blacklist } from '@/core/entities/blacklist.entity';

import { CreateBlacklistController } from './controllers/create-blacklist.controller';
import { UpdateBlacklistController } from './controllers/update-blacklist.controller';
import { DeleteBlacklistController } from './controllers/delete-blacklist.controller';
import { GetAllBlacklistsController } from './controllers/get-all-blacklist.controller';
import { GetBlacklistController } from './controllers/get-blacklist.controller';

import { CreateBlacklistService } from './services/create-blacklist.service';
import { UpdateBlacklistService } from './services/update-blacklist.service';
import { DeleteBlacklistService } from './services/delete-blacklist.service';
import { GetAllBlacklistsService } from './services/get-all-blacklist.service';
import { GetBlacklistService } from './services/get-blacklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blacklist])],
  controllers: [
    CreateBlacklistController,
    UpdateBlacklistController,
    DeleteBlacklistController,
    GetAllBlacklistsController,
    GetBlacklistController,
  ],
  providers: [
    CreateBlacklistService,
    UpdateBlacklistService,
    DeleteBlacklistService,
    GetAllBlacklistsService,
    GetBlacklistService,
  ],
  exports: [GetBlacklistService],
})
export class SuperadminBlacklistModule {}
