import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from '@/core/entities/notice.entity';

import { CreateNoticeController } from './controllers/create-notice.controller';
import { UpdateNoticeController } from './controllers/update-notice.controller';
import { DeleteNoticeController } from './controllers/delete-notice.controller';
import { GetAllNoticesController } from './controllers/get-all-notices.controller';
import { GetNoticeController } from './controllers/get-notice.controller';

import { CreateNoticeService } from './services/create-notice.service';
import { UpdateNoticeService } from './services/update-notice.service';
import { DeleteNoticeService } from './services/delete-notice.service';
import { GetAllNoticesService } from './services/get-all-notices.service';
import { GetNoticeService } from './services/get-notice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  controllers: [
    CreateNoticeController,
    UpdateNoticeController,
    DeleteNoticeController,
    GetAllNoticesController,
    GetNoticeController,
  ],
  providers: [
    CreateNoticeService,
    UpdateNoticeService,
    DeleteNoticeService,
    GetAllNoticesService,
    GetNoticeService,
  ],
  exports: [GetNoticeService],
})
export class SuperadminNoticesModule {}
