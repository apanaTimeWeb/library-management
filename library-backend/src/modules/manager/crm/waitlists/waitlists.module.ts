import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Waitlist } from '@/core/entities/waitlist.entity';

import { CreateWaitlistController } from './controllers/create-waitlist.controller';
import { UpdateWaitlistController } from './controllers/update-waitlist.controller';
import { DeleteWaitlistController } from './controllers/delete-waitlist.controller';
import { GetAllWaitlistsController } from './controllers/get-all-waitlists.controller';
import { GetWaitlistController } from './controllers/get-waitlist.controller';

import { CreateWaitlistService } from './services/create-waitlist.service';
import { UpdateWaitlistService } from './services/update-waitlist.service';
import { DeleteWaitlistService } from './services/delete-waitlist.service';
import { GetAllWaitlistsService } from './services/get-all-waitlists.service';
import { GetWaitlistService } from './services/get-waitlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Waitlist])],
  controllers: [
    CreateWaitlistController,
    UpdateWaitlistController,
    DeleteWaitlistController,
    GetAllWaitlistsController,
    GetWaitlistController,
  ],
  providers: [
    CreateWaitlistService,
    UpdateWaitlistService,
    DeleteWaitlistService,
    GetAllWaitlistsService,
    GetWaitlistService,
  ],
  exports: [GetWaitlistService],
})
export class ManagerWaitlistsModule {}
