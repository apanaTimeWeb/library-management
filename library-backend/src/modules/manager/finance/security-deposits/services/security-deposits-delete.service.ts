import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecurityDeposit } from '@/core/entities/security-deposit.entity';
import { SecurityDepositNotFoundException } from '@/modules/manager/finance/security-deposits/exceptions/security-deposits.exceptions';

@Injectable()
export class SecurityDepositsDeleteService {
  constructor(
    @InjectRepository(SecurityDeposit)
    private readonly repository: Repository<SecurityDeposit>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new SecurityDepositNotFoundException();
    await this.repository.remove(existing);
  }
}
