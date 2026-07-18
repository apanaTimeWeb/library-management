import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecurityDeposit } from '@/core/entities/security-deposit.entity';
import { CreateSecurityDepositDto } from '../dto/create-security-deposit.dto';

@Injectable()
export class CreateSecurityDepositService {
  constructor(
    @InjectRepository(SecurityDeposit)
    private readonly repository: Repository<SecurityDeposit>,
  ) {}

  async execute(dto: CreateSecurityDepositDto): Promise<SecurityDeposit> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
