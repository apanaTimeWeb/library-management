import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '@/core/entities/payment.entity';

import { CreatePaymentController } from './controllers/create-payment.controller';
import { UpdatePaymentController } from './controllers/update-payment.controller';
import { DeletePaymentController } from './controllers/delete-payment.controller';
import { GetAllPaymentsController } from './controllers/get-all-payments.controller';
import { GetPaymentController } from './controllers/get-payment.controller';

import { CreatePaymentService } from './services/create-payment.service';
import { UpdatePaymentService } from './services/update-payment.service';
import { DeletePaymentService } from './services/delete-payment.service';
import { GetAllPaymentsService } from './services/get-all-payments.service';
import { GetPaymentService } from './services/get-payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [
    CreatePaymentController,
    UpdatePaymentController,
    DeletePaymentController,
    GetAllPaymentsController,
    GetPaymentController,
  ],
  providers: [
    CreatePaymentService,
    UpdatePaymentService,
    DeletePaymentService,
    GetAllPaymentsService,
    GetPaymentService,
  ],
  exports: [GetPaymentService],
})
export class SuperadminPaymentsModule {}
