import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from '@/core/entities/complaint.entity';
import { ComplaintsCreateComplaintDto } from '../dto/create-complaint.dto';

@Injectable()
export class ComplaintsCreateComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private readonly repository: Repository<Complaint>,
  ) {}

  async execute(dto: ComplaintsCreateComplaintDto): Promise<Complaint> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
