import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { EnquiryNotFoundException } from '@/modules/manager/crm/enquiries/exceptions/enquiries.exceptions';
import { AddFollowUpDto } from '@/modules/manager/crm/enquiries/dto/add-follow-up.dto';

@Injectable()
export class AddFollowUpService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
  ) {}

  async addFollowUp(
    id: string,
    branchId: string,
    followUp: AddFollowUpDto,
  ): Promise<any> {
    const enquiry = await this.enquiryRepo.findOne({ where: { id } });

    if (!enquiry) {
      throw new EnquiryNotFoundException();
    }

    enquiry.followUps = [followUp, ...enquiry.followUps];
    return this.enquiryRepo.save(enquiry);
  }
}
