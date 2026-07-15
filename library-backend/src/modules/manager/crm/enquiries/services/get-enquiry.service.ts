import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { EnquiryNotFoundException } from '@/modules/manager/crm/enquiries/exceptions/enquiries.exceptions';

@Injectable()
export class GetEnquiryService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
  ) {}

  async findOne(id: string, branchId: string) {
    const enquiry = await this.enquiryRepo.findOne({
      where: { id },
      relations: { handledBy: true, convertedToStudent: true },
    });

    if (!enquiry) {
      throw new EnquiryNotFoundException();
    }

    return enquiry;
  }
}
