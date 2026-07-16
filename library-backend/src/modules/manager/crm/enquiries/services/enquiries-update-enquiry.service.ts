import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { UpdateEnquiryDto } from '@/modules/manager/crm/enquiries/dto/update-enquiry.dto';
import { EnquiryNotFoundException } from '@/modules/manager/crm/enquiries/exceptions/enquiries.exceptions';

@Injectable()
export class EnquiriesUpdateEnquiryService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly repository: Repository<Enquiry>,
  ) {}

  async execute(id: string, dto: UpdateEnquiryDto): Promise<Enquiry> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new EnquiryNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
