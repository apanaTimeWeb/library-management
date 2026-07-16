import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@/core/entities/student.entity';

import { CreateStudentController } from './controllers/create-student.controller';
import { UpdateStudentController } from './controllers/update-student.controller';
import { DeleteStudentController } from './controllers/delete-student.controller';
import { GetAllStudentsController } from './controllers/get-all-students.controller';
import { GetStudentController } from './controllers/get-student.controller';

import { CreateStudentService } from './services/create-student.service';
import { UpdateStudentService } from './services/update-student.service';
import { DeleteStudentService } from './services/delete-student.service';
import { GetAllStudentsService } from './services/get-all-students.service';
import { GetStudentService } from './services/get-student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [
    CreateStudentController,
    UpdateStudentController,
    DeleteStudentController,
    GetAllStudentsController,
    GetStudentController,
  ],
  providers: [
    CreateStudentService,
    UpdateStudentService,
    DeleteStudentService,
    GetAllStudentsService,
    GetStudentService,
  ],
  exports: [GetStudentService],
})
export class ManagerStudentsModule {}
