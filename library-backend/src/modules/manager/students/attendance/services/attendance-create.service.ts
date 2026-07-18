import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '@/core/entities/attendance.entity';
import { CreateAttendanceDto } from '@/modules/manager/students/attendance/dto/create-attendance.dto';

@Injectable()
export class AttendanceCreateService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repository: Repository<Attendance>,
  ) {}

  async execute(dto: CreateAttendanceDto): Promise<Attendance> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
