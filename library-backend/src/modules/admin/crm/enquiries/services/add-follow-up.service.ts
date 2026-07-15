import { EnquiryNotFoundException } from '../exceptions/enquiries.exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '../../../../../core/entities/enquiry.entity';
import { AddFollowUpDto } from '../dto/add-follow-up.dto';

@Injectable()
export class AddFollowUpService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
  ) {}

  async addFollowUp(id: string, followUpDto: AddFollowUpDto): Promise<Enquiry> {
    const enquiry = await this.enquiryRepo.findOne({ where: { id } });
    if (!enquiry) {
      throw new EnquiryNotFoundException(id);
    }

    enquiry.followUps = [followUpDto, ...(enquiry.followUps || [])];
    return this.enquiryRepo.save(enquiry);
  }
}
