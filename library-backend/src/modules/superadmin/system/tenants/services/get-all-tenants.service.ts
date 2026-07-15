import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Tenant } from '@/core/entities/tenant.entity';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/pagination.interface';

@Injectable()
export class GetAllTenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async findAll(paginationDto?: PaginationDto): Promise<PaginatedResponse<Tenant>> {
    const { page = 1, limit = 10, search, sortBy, sortOrder = 'DESC' } = paginationDto || {};
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.name = ILike(`%${search}%`);
    }

    const order: any = {};
    if (sortBy) {
      order[sortBy] = sortOrder;
    } else {
      order.createdAt = 'DESC';
    }

    const [items, total] = await this.tenantRepository.findAndCount({
      where,
      order,
      skip,
      take: limit,
    });

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
