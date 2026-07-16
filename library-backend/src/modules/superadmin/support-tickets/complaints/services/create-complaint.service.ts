import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from '@/core/entities/complaint.entity';
import { CreateComplaintDto } from '../dto/create-complaint.dto';

@Injectable()
export class CreateComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private readonly repository: Repository<Complaint>,
  ) {}

  async execute(dto: CreateComplaintDto): Promise<Complaint> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
