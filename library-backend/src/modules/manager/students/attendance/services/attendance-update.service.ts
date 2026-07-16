import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '@/core/entities/attendance.entity';
import { UpdateAttendanceDto } from '@/modules/manager/students/attendance/dto/update-attendance.dto';
import { AttendanceNotFoundException } from '@/modules/manager/students/attendance/exceptions/attendance.exceptions';

@Injectable()
export class AttendanceUpdateService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repository: Repository<Attendance>,
  ) {}

  async execute(id: string, dto: UpdateAttendanceDto): Promise<Attendance> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new AttendanceNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
