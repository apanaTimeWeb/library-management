import { PartialType } from '@nestjs/swagger';
import { StudentsCreateStudentDto } from './create-student.dto';
import { IsOptional, IsString } from 'class-validator';

export class StudentsUpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsOptional()
  @IsString()
  status?: string;
}
