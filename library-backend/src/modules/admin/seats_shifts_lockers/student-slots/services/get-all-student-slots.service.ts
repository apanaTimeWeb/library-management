import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { StudentSlot } from '@/core/entities/student-slot.entity';
import { GetStudentSlotsQueryDto } from '../dto/get-student-slots-query.dto';

@Injectable()
export class GetAllStudentSlotsService {
  constructor(
    @InjectRepository(StudentSlot)
    private readonly repository: Repository<StudentSlot>,
  ) {}

  async execute(queryDto: GetStudentSlotsQueryDto): Promise<{ items: StudentSlot[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<StudentSlot> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
