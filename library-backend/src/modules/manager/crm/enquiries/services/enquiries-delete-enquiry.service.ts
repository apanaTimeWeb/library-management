import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { EnquiryNotFoundException } from '@/modules/manager/crm/enquiries/exceptions/enquiries.exceptions';

@Injectable()
export class EnquiriesDeleteEnquiryService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly repository: Repository<Enquiry>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new EnquiryNotFoundException();
    await this.repository.remove(existing);
  }
}
