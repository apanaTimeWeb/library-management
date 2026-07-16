import { PartialType } from '@nestjs/swagger';
import { StudentsCreateStudentDto } from './students-create-student.dto';
import { IsOptional, IsString } from 'class-validator';

export class StudentsUpdateStudentDto extends PartialType(StudentsCreateStudentDto) {
  @IsOptional()
  @IsString()
  status?: string;
}
