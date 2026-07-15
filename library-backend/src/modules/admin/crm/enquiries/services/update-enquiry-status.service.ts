import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '../../../../../core/entities/enquiry.entity';
import { UpdateEnquiryStatusDto } from '../dtos/update-enquiry-status.dto';

@Injectable()
export class UpdateEnquiryStatusService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
  ) {}

  async updateStatus(id: string, updateDto: UpdateEnquiryStatusDto): Promise<Enquiry> {
    const enquiry = await this.enquiryRepo.findOne({ where: { id } });
    if (!enquiry) {
      throw new NotFoundException(`Enquiry with ID ${id} not found`);
    }
    
    enquiry.status = updateDto.status.toLowerCase();
    
    if (updateDto.reason) {
      enquiry.followUps = [
        {
          date: new Date(),
          remark: `Status updated to ${updateDto.status} - ${updateDto.reason}`,
          by: 'Admin',
        },
        ...(enquiry.followUps || []),
      ];
    }
    
    return this.enquiryRepo.save(enquiry);
  }
}
