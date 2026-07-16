import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecurityDeposit } from '@/core/entities/security-deposit.entity';
import { UpdateSecurityDepositDto } from '../dto/update-security-deposit.dto';
import { SecurityDepositNotFoundException } from '../exceptions/security-deposits.exceptions';

@Injectable()
export class UpdateSecurityDepositService {
  constructor(
    @InjectRepository(SecurityDeposit)
    private readonly repository: Repository<SecurityDeposit>,
  ) {}

  async execute(id: string, dto: UpdateSecurityDepositDto): Promise<SecurityDeposit> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new SecurityDepositNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
