import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '@/core/entities/payment.entity';
import { UpdatePaymentDto } from '@/modules/manager/finance/payments/dto/update-payment.dto';
import { PaymentNotFoundException } from '@/modules/manager/finance/payments/exceptions/payments.exceptions';

@Injectable()
export class PaymentsUpdateService {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  async execute(id: string, dto: UpdatePaymentDto): Promise<Payment> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new PaymentNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
