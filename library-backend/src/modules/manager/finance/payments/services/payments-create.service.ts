import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '@/core/entities/payment.entity';
import { CreatePaymentDto } from '@/modules/manager/finance/payments/dto/create-payment.dto';

@Injectable()
export class PaymentsCreateService {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  async execute(dto: CreatePaymentDto): Promise<Payment> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
