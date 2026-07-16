import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from '@/core/entities/complaint.entity';

import { ComplaintsCreateComplaintController } from './controllers/create-complaint.controller';
import { ComplaintsUpdateComplaintController } from './controllers/update-complaint.controller';
import { ComplaintsDeleteComplaintController } from './controllers/delete-complaint.controller';
import { ComplaintsGetAllController } from './controllers/get-all-complaints.controller';
import { ComplaintsGetComplaintController } from './controllers/get-complaint.controller';

import { ComplaintsCreateComplaintService } from './services/create-complaint.service';
import { ComplaintsUpdateComplaintService } from './services/update-complaint.service';
import { ComplaintsDeleteComplaintService } from './services/delete-complaint.service';
import { ComplaintsGetAllService } from './services/get-all-complaints.service';
import { ComplaintsGetComplaintService } from './services/get-complaint.service';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint])],
  controllers: [ComplaintsCreateComplaintController, ComplaintsUpdateComplaintController, ComplaintsDeleteComplaintController, ComplaintsGetAllController, ComplaintsGetComplaintController, ],
  providers: [ComplaintsCreateComplaintService, ComplaintsUpdateComplaintService, ComplaintsDeleteComplaintService, ComplaintsGetAllService, ComplaintsGetComplaintService, ],
  exports: [ComplaintsGetComplaintService],
})
export class ComplaintsAdminModule {}
