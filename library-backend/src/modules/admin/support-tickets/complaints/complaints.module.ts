import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from '@/core/entities/complaint.entity';

import { CreateComplaintController } from './controllers/create-complaint.controller';
import { UpdateComplaintController } from './controllers/update-complaint.controller';
import { DeleteComplaintController } from './controllers/delete-complaint.controller';
import { GetAllComplaintsController } from './controllers/get-all-complaints.controller';
import { GetComplaintController } from './controllers/get-complaint.controller';

import { CreateComplaintService } from './services/create-complaint.service';
import { UpdateComplaintService } from './services/update-complaint.service';
import { DeleteComplaintService } from './services/delete-complaint.service';
import { GetAllComplaintsService } from './services/get-all-complaints.service';
import { GetComplaintService } from './services/get-complaint.service';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint])],
  controllers: [
    CreateComplaintController,
    UpdateComplaintController,
    DeleteComplaintController,
    GetAllComplaintsController,
    GetComplaintController,
  ],
  providers: [
    CreateComplaintService,
    UpdateComplaintService,
    DeleteComplaintService,
    GetAllComplaintsService,
    GetComplaintService,
  ],
  exports: [GetComplaintService],
})
export class AdminComplaintsModule {}
