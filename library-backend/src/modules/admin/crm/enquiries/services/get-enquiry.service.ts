import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '../../../../../core/entities/enquiry.entity';

@Injectable()
export class GetEnquiryService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
  ) {}

  async findOne(id: string): Promise<Enquiry> {
    const enquiry = await this.enquiryRepo.findOne({
      where: { id },
      relations: { handledBy: true, convertedToStudent: true },
    });

    if (!enquiry) {
      throw new NotFoundException(`Enquiry with ID ${id} not found`);
    }

    return enquiry;
  }
}
