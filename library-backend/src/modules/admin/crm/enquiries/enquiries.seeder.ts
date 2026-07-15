import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '@/core/entities/enquiry.entity';

@Injectable()
export class EnquiriesSeeder {
  private readonly logger = new Logger(EnquiriesSeeder.name);

  constructor(
    // @InjectRepository(Enquirie)
    // private readonly repo: Repository<Enquirie>,
  ) {}

  async seed() {
    this.logger.log('Seeding Enquiries...');
    // Seed logic here
  }
}
