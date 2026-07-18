import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '@/core/entities/branch.entity';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { BranchNotFoundException } from '../exceptions/branches.exceptions';

@Injectable()
export class UpdateBranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly repository: Repository<Branch>,
  ) {}

  async execute(id: string, dto: UpdateBranchDto): Promise<Branch> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new BranchNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
