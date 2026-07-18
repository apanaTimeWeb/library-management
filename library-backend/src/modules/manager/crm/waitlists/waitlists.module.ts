import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Waitlist } from '@/core/entities/waitlist.entity';

import { WaitlistsCreateController } from '@/modules/manager/crm/waitlists/controllers/waitlists-create.controller';
import { WaitlistsUpdateController } from '@/modules/manager/crm/waitlists/controllers/waitlists-update.controller';
import { WaitlistsDeleteController } from '@/modules/manager/crm/waitlists/controllers/waitlists-delete.controller';
import { WaitlistsGetAllController } from '@/modules/manager/crm/waitlists/controllers/waitlists-get-all.controller';
import { WaitlistsGetController } from '@/modules/manager/crm/waitlists/controllers/waitlists-get.controller';

import { WaitlistsCreateService } from '@/modules/manager/crm/waitlists/services/waitlists-create.service';
import { WaitlistsUpdateService } from '@/modules/manager/crm/waitlists/services/waitlists-update.service';
import { WaitlistsDeleteService } from '@/modules/manager/crm/waitlists/services/waitlists-delete.service';
import { WaitlistsGetAllService } from '@/modules/manager/crm/waitlists/services/waitlists-get-all.service';
import { WaitlistsGetService } from '@/modules/manager/crm/waitlists/services/waitlists-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Waitlist])],
  controllers: [
    WaitlistsCreateController,
    WaitlistsUpdateController,
    WaitlistsDeleteController,
    WaitlistsGetAllController,
    WaitlistsGetController,
  ],
  providers: [
    WaitlistsCreateService,
    WaitlistsUpdateService,
    WaitlistsDeleteService,
    WaitlistsGetAllService,
    WaitlistsGetService,
  ],
  exports: [WaitlistsGetService],
})
export class ManagerWaitlistsModule {}
