import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '@/core/entities/attendance.entity';
import { AttendanceUpdateDto } from '../dto/update-attendance.dto';
import { AttendanceNotFoundException } from '../exceptions/attendance.exceptions';

@Injectable()
export class AttendanceUpdateService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repository: Repository<Attendance>,
  ) {}

  async execute(id: string, dto: AttendanceUpdateDto): Promise<Attendance> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new AttendanceNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
