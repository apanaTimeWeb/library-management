import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from '@/modules/manager/students/students/dto/create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
