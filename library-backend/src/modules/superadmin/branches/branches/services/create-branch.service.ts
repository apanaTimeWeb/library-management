import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '@/core/entities/branch.entity';
import { CreateBranchDto } from '../dto/create-branch.dto';

@Injectable()
export class CreateBranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly repository: Repository<Branch>,
  ) {}

  async execute(dto: CreateBranchDto): Promise<Branch> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
