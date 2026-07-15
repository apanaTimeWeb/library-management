import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '../../../../../core/entities/enquiry.entity';
import { AddFollowUpDto } from '../dtos/add-follow-up.dto';

@Injectable()
export class AddFollowUpService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
  ) {}

  async addFollowUp(id: string, followUpDto: AddFollowUpDto): Promise<Enquiry> {
    const enquiry = await this.enquiryRepo.findOne({ where: { id } });
    if (!enquiry) {
      throw new NotFoundException(`Enquiry with ID ${id} not found`);
    }

    enquiry.followUps = [followUpDto, ...(enquiry.followUps || [])];
    return this.enquiryRepo.save(enquiry);
  }
}
