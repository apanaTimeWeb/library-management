import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Complaint } from '@/core/entities/complaint.entity';
import { GetComplaintsQueryDto } from '@/modules/manager/support-tickets/complaints/dto/get-complaints-query.dto';

@Injectable()
export class ComplaintsGetAllService {
  constructor(
    @InjectRepository(Complaint)
    private readonly repository: Repository<Complaint>,
  ) {}

  async execute(queryDto: GetComplaintsQueryDto): Promise<{ items: Complaint[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Complaint> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
