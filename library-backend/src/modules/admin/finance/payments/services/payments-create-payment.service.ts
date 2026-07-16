import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '@/core/entities/payment.entity';
import { PaymentsCreatePaymentDto } from '../dto/payments-create-payment.dto';

@Injectable()
export class PaymentsCreatePaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  async execute(dto: PaymentsCreatePaymentDto): Promise<Payment> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
