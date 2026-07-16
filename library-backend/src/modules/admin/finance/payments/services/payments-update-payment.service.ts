import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '@/core/entities/payment.entity';
import { PaymentsUpdatePaymentDto } from '../dto/update-payment.dto';
import { PaymentNotFoundException } from '../exceptions/payments.exceptions';

@Injectable()
export class PaymentsUpdatePaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  async execute(id: string, dto: PaymentsUpdatePaymentDto): Promise<Payment> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new PaymentNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
