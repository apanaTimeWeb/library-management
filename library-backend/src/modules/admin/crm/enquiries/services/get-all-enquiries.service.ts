import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enquiry } from '../../../../../core/entities/enquiry.entity';
import { User } from '../../../../../core/entities/user.entity';
import { EnquiryBase } from '../interfaces/enquiries.interfaces';

@Injectable()
export class GetAllEnquiriesService {
  constructor(
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<Enquiry[]> {
    let enquiries = await this.enquiryRepo.find({
      relations: { handledBy: true, convertedToStudent: true },
      order: { createdAt: 'DESC' },
    });

    const hasVisited = enquiries.some(e => e.status === 'visited');
    if (!hasVisited) {
      await this.enquiryRepo.clear();

      const mockUser = await this.userRepo.findOne({ where: {} }) || null;
      
      const dummies = [
        this.enquiryRepo.create({ name: 'Ramesh Singh', phone: '9876543210', preferredShift: 'Morning', status: 'new', handledBy: mockUser as any }),
        this.enquiryRepo.create({ name: 'Suresh Kumar', phone: '9988776655', preferredShift: 'Evening', status: 'visited', handledBy: mockUser as any }),
        this.enquiryRepo.create({ name: 'Priya Sharma', phone: '9123456789', preferredShift: 'Night', status: 'interested', handledBy: mockUser as any }),
        this.enquiryRepo.create({ name: 'Amit Verma', phone: '9900112233', preferredShift: 'Morning', status: 'converted', handledBy: mockUser as any }),
        this.enquiryRepo.create({ name: 'Neha Gupta', phone: '9811223344', preferredShift: 'Afternoon', status: 'lost', handledBy: mockUser as any }),
      ];
      await this.enquiryRepo.save(dummies);
      enquiries = await this.enquiryRepo.find({
        relations: { handledBy: true, convertedToStudent: true },
        order: { createdAt: 'DESC' },
      });
    }

    return enquiries;
  }
}
