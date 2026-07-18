import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Attendance } from '@/core/entities/attendance.entity';
import { AttendanceGetAttendancesQueryDto } from '../dto/attendance-get-attendance-query.dto';

@Injectable()
export class AttendanceGetAllAttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repository: Repository<Attendance>,
  ) {}

  async execute(queryDto: AttendanceGetAttendancesQueryDto): Promise<{ items: Attendance[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Attendance> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
