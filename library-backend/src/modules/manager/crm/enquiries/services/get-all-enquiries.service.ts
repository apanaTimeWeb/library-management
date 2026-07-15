import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interfaces/pagination.interface';

@Injectable()
export class GetAllEnquiriesService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
  ) {}

  async findAll(
    branchId: string,
    paginationDto?: PaginationDto,
  ): Promise<PaginatedResponse<Enquiry>> {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy,
      sortOrder = 'DESC',
    } = paginationDto || {};
    const skip = (page - 1) * limit;

    const where: any = branchId ? { branch: { id: branchId } } : {};
    if (search) {
      where.name = ILike(`%${search}%`); // Assuming Enquiry has a name property
    }

    const order: any = {};
    if (sortBy) {
      order[sortBy] = sortOrder;
    } else {
      order.createdAt = 'DESC';
    }

    const [data, total] = await this.enquiryRepo.findAndCount({
      where,
      relations: { handledBy: true, convertedToStudent: true },
      order,
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
