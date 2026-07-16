import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '@/core/entities/attendance.entity';
import { AttendanceNotFoundException } from '../exceptions/attendance.exceptions';

@Injectable()
export class GetAttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repository: Repository<Attendance>,
  ) {}

  async execute(id: string): Promise<Attendance> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new AttendanceNotFoundException();
    return existing;
  }
}
