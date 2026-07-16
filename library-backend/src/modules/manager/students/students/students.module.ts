import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';

import { StudentsCreateController } from '@/modules/manager/students/students/controllers/students-create.controller';
import { StudentsUpdateController } from '@/modules/manager/students/students/controllers/students-update.controller';
import { StudentsDeleteController } from '@/modules/manager/students/students/controllers/students-delete.controller';
import { StudentsGetAllController } from '@/modules/manager/students/students/controllers/students-get-all.controller';
import { StudentsGetController } from '@/modules/manager/students/students/controllers/students-get.controller';

import { StudentsCreateService } from '@/modules/manager/students/students/services/students-create.service';
import { StudentsUpdateService } from '@/modules/manager/students/students/services/students-update.service';
import { StudentsDeleteService } from '@/modules/manager/students/students/services/students-delete.service';
import { StudentsGetAllService } from '@/modules/manager/students/students/services/students-get-all.service';
import { StudentsGetService } from '@/modules/manager/students/students/services/students-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [
    StudentsCreateController,
    StudentsUpdateController,
    StudentsDeleteController,
    StudentsGetAllController,
    StudentsGetController,
  ],
  providers: [
    StudentsCreateService,
    StudentsUpdateService,
    StudentsDeleteService,
    StudentsGetAllService,
    StudentsGetService,
  ],
  exports: [StudentsGetService],
})
export class ManagerStudentsModule {}
