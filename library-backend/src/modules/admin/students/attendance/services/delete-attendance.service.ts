import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '@/core/entities/attendance.entity';
import { AttendanceNotFoundException } from '../exceptions/attendance.exceptions';

@Injectable()
export class DeleteAttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repository: Repository<Attendance>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new AttendanceNotFoundException();
    await this.repository.remove(existing);
  }
}
