import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from '@/core/entities/complaint.entity';

import { ComplaintsCreateComplaintController } from './controllers/complaints-create-complaint.controller';
import { ComplaintsUpdateComplaintController } from './controllers/complaints-update-complaint.controller';
import { ComplaintsDeleteComplaintController } from './controllers/complaints-delete-complaint.controller';
import { ComplaintsGetAllController } from './controllers/complaints-get-all-complaints.controller';
import { ComplaintsGetComplaintController } from './controllers/complaints-get-complaint.controller';

import { ComplaintsCreateComplaintService } from './services/complaints-create-complaint.service';
import { ComplaintsUpdateComplaintService } from './services/complaints-update-complaint.service';
import { ComplaintsDeleteComplaintService } from './services/complaints-delete-complaint.service';
import { ComplaintsGetAllService } from './services/complaints-get-all-complaints.service';
import { ComplaintsGetComplaintService } from './services/complaints-get-complaint.service';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint])],
  controllers: [ComplaintsCreateComplaintController, ComplaintsUpdateComplaintController, ComplaintsDeleteComplaintController, ComplaintsGetAllController, ComplaintsGetComplaintController, ],
  providers: [ComplaintsCreateComplaintService, ComplaintsUpdateComplaintService, ComplaintsDeleteComplaintService, ComplaintsGetAllService, ComplaintsGetComplaintService, ],
  exports: [ComplaintsGetComplaintService],
})
export class ComplaintsAdminModule {}
