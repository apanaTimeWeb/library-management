import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '@/core/entities/payment.entity';
import { PaymentNotFoundException } from '../exceptions/payments.exceptions';

@Injectable()
export class PaymentsGetPaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  async execute(id: string): Promise<Payment> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new PaymentNotFoundException();
    return existing;
  }
}
