import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';

@Injectable()
export class GetAllEnquiriesService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
  ) {}

  async findAll(branchId: string) {
    const enquiries = await this.enquiryRepo.find({
      relations: { handledBy: true, convertedToStudent: true },
      order: { createdAt: 'DESC' },
    });
    return enquiries;
  }
}
