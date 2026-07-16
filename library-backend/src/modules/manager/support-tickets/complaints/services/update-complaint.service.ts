import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from '@/core/entities/complaint.entity';
import { UpdateComplaintDto } from '../dto/update-complaint.dto';
import { ComplaintNotFoundException } from '../exceptions/complaints.exceptions';

@Injectable()
export class UpdateComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private readonly repository: Repository<Complaint>,
  ) {}

  async execute(id: string, dto: UpdateComplaintDto): Promise<Complaint> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ComplaintNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
