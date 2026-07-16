import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { Waitlist } from '@/core/entities/waitlist.entity';
import { GetWaitlistsQueryDto } from '@/modules/manager/crm/waitlists/dto/get-waitlists-query.dto';

@Injectable()
export class WaitlistsGetAllService {
  constructor(
    @InjectRepository(Waitlist)
    private readonly repository: Repository<Waitlist>,
  ) {}

  async execute(queryDto: GetWaitlistsQueryDto): Promise<{ items: Waitlist[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<Waitlist> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
