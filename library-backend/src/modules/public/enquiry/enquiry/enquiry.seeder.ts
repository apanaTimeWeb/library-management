import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';

@Injectable()
export class EnquirySeeder {
  private readonly logger = new Logger(EnquirySeeder.name);

  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepository: Repository<Enquiry>,
  ) {}

  async seed() {
    this.logger.log('Seeding Public Enquiry...');
    const existingEnquiry = await this.enquiryRepository.findOne({
      where: { phone: '0000000000' },
    });

    if (!existingEnquiry) {
      const newEnquiry = this.enquiryRepository.create({
        name: 'Seed Enquiry User',
        phone: '0000000000',
        preferredShift: 'morning',
        status: 'new',
        followUps: [],
      });
      await this.enquiryRepository.save(newEnquiry);
      this.logger.log('Public Enquiry seeded successfully.');
    } else {
      this.logger.log('Public Enquiry already seeded. Skipping.');
    }
  }
}
