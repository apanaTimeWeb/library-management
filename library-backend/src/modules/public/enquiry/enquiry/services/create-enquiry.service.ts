import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { CreateEnquiryDto } from '../dto/create-enquiry.dto';

@Injectable()
export class CreateEnquiryService {
  private readonly logger = new Logger(CreateEnquiryService.name);

  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepository: Repository<Enquiry>,
  ) {}

  async create(createEnquiryDto: CreateEnquiryDto): Promise<Enquiry> {
    const { message, ...enquiryData } = createEnquiryDto;

    // Store message in followUps array if it exists
    const followUps = message
      ? [
          {
            date: new Date(),
            remark: `Initial Message: ${message}`,
            by: 'Student (Self)',
          },
        ]
      : [];

    const enquiry = this.enquiryRepository.create({
      ...enquiryData,
      status: 'new',
      followUps,
    });

    const savedEnquiry = await this.enquiryRepository.save(enquiry);
    this.logger.log(`New public enquiry submitted by ${savedEnquiry.name}`);
    return savedEnquiry;
  }
}
