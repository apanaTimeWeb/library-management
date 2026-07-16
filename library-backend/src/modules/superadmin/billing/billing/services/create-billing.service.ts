import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from '@/core/entities/billing.entity';
import { CreateBillingDto } from '../dto/create-billing.dto';

@Injectable()
export class CreateBillingService {
  constructor(
    @InjectRepository(Billing)
    private readonly repository: Repository<Billing>,
  ) {}

  async execute(dto: CreateBillingDto): Promise<Billing> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
