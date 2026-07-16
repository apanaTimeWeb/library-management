import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { CreateEnquiryDto } from '@/modules/manager/crm/enquiries/dto/create-enquiry.dto';

@Injectable()
export class EnquiriesCreateEnquiryService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly repository: Repository<Enquiry>,
  ) {}

  async execute(dto: CreateEnquiryDto): Promise<Enquiry> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
