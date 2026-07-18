import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '@/core/entities/branch.entity';
import { BranchNotFoundException } from '../exceptions/branches.exceptions';

@Injectable()
export class DeleteBranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly repository: Repository<Branch>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new BranchNotFoundException();
    await this.repository.remove(existing);
  }
}
