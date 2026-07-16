import { EnquiryNotFoundException } from '@/modules/admin/crm/enquiries/exceptions/enquiries.exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { EnquiriesAddFollowUpDto } from '@/modules/admin/crm/enquiries/dto/enquiries-add-follow-up.dto';

@Injectable()
export class EnquiriesAddFollowUpService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
  ) {}

  async addFollowUp(id: string, followUpDto: EnquiriesAddFollowUpDto): Promise<Enquiry> {
    const enquiry = await this.enquiryRepo.findOne({ where: { id } });
    if (!enquiry) {
      throw new EnquiryNotFoundException(id);
    }

    enquiry.followUps = [EnquiriesfollowUpDto, ...(enquiry.followUps || [])];
    return this.enquiryRepo.save(enquiry);
  }
}
