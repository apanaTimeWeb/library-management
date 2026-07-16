import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from '@/core/entities/complaint.entity';

import { ComplaintsCreateController } from '@/modules/manager/support-tickets/complaints/controllers/complaints-create.controller';
import { ComplaintsUpdateController } from '@/modules/manager/support-tickets/complaints/controllers/complaints-update.controller';
import { ComplaintsDeleteController } from '@/modules/manager/support-tickets/complaints/controllers/complaints-delete.controller';
import { ComplaintsGetAllController } from '@/modules/manager/support-tickets/complaints/controllers/complaints-get-all.controller';
import { ComplaintsGetController } from '@/modules/manager/support-tickets/complaints/controllers/complaints-get.controller';

import { ComplaintsCreateService } from '@/modules/manager/support-tickets/complaints/services/complaints-create.service';
import { ComplaintsUpdateService } from '@/modules/manager/support-tickets/complaints/services/complaints-update.service';
import { ComplaintsDeleteService } from '@/modules/manager/support-tickets/complaints/services/complaints-delete.service';
import { ComplaintsGetAllService } from '@/modules/manager/support-tickets/complaints/services/complaints-get-all.service';
import { ComplaintsGetService } from '@/modules/manager/support-tickets/complaints/services/complaints-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint])],
  controllers: [
    ComplaintsCreateController,
    ComplaintsUpdateController,
    ComplaintsDeleteController,
    ComplaintsGetAllController,
    ComplaintsGetController,
  ],
  providers: [
    ComplaintsCreateService,
    ComplaintsUpdateService,
    ComplaintsDeleteService,
    ComplaintsGetAllService,
    ComplaintsGetService,
  ],
  exports: [ComplaintsGetService],
})
export class ManagerComplaintsModule {}
