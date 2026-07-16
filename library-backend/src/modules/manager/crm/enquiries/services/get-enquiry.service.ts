import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { EnquiryNotFoundException } from '../exceptions/enquiries.exceptions';

@Injectable()
export class GetEnquiryService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly repository: Repository<Enquiry>,
  ) {}

  async execute(id: string): Promise<Enquiry> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new EnquiryNotFoundException();
    return existing;
  }
}
