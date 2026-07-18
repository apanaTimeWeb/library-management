import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from '@/core/entities/complaint.entity';
import { ComplaintNotFoundException } from '../exceptions/complaints.exceptions';

@Injectable()
export class ComplaintsGetComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private readonly repository: Repository<Complaint>,
  ) {}

  async execute(id: string): Promise<Complaint> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ComplaintNotFoundException();
    return existing;
  }
}
