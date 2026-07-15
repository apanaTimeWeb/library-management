import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '../../../../../core/entities/enquiry.entity';
import { EnquiryNotFoundException } from '../exceptions/enquiries.exceptions';
import { UpdateEnquiryStatusDto } from '../dto/update-enquiry-status.dto';

@Injectable()
export class UpdateEnquiryStatusService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
  ) {}

  async updateStatus(id: string, branchId: string, data: UpdateEnquiryStatusDto) {
    const enquiry = await this.enquiryRepo.findOne({ where: { id } });
    
    if (!enquiry) {
      throw new EnquiryNotFoundException();
    }
    
    enquiry.status = data.status.toLowerCase();
    
    if (data.reason) {
      enquiry.followUps = [
        {
          date: new Date(),
          remark: `Status updated to ${data.status} - ${data.reason}`,
          by: 'Manager',
        },
        ...enquiry.followUps,
      ];
    }
    
    return this.enquiryRepo.save(enquiry);
  }
}
