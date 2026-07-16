import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from '@/core/entities/notice.entity';

import { NoticesCreateController } from '@/modules/manager/engagement/notices/controllers/notices-create.controller';
import { NoticesUpdateController } from '@/modules/manager/engagement/notices/controllers/notices-update.controller';
import { NoticesDeleteController } from '@/modules/manager/engagement/notices/controllers/notices-delete.controller';
import { NoticesGetAllController } from '@/modules/manager/engagement/notices/controllers/notices-get-all.controller';
import { NoticesGetController } from '@/modules/manager/engagement/notices/controllers/notices-get.controller';

import { NoticesCreateService } from '@/modules/manager/engagement/notices/services/notices-create.service';
import { NoticesUpdateService } from '@/modules/manager/engagement/notices/services/notices-update.service';
import { NoticesDeleteService } from '@/modules/manager/engagement/notices/services/notices-delete.service';
import { NoticesGetAllService } from '@/modules/manager/engagement/notices/services/notices-get-all.service';
import { NoticesGetService } from '@/modules/manager/engagement/notices/services/notices-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  controllers: [
    NoticesCreateController,
    NoticesUpdateController,
    NoticesDeleteController,
    NoticesGetAllController,
    NoticesGetController,
  ],
  providers: [
    NoticesCreateService,
    NoticesUpdateService,
    NoticesDeleteService,
    NoticesGetAllService,
    NoticesGetService,
  ],
  exports: [NoticesGetService],
})
export class ManagerNoticesModule {}
