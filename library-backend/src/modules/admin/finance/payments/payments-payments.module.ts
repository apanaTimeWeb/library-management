import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '@/core/entities/payment.entity';

import { PaymentsCreatePaymentController } from './controllers/payments-create-payment.controller';
import { PaymentsUpdatePaymentController } from './controllers/payments-update-payment.controller';
import { PaymentsDeletePaymentController } from './controllers/payments-delete-payment.controller';
import { PaymentsGetAllController } from './controllers/payments-get-all-payments.controller';
import { PaymentsGetPaymentController } from './controllers/payments-get-payment.controller';

import { PaymentsCreatePaymentService } from './services/payments-create-payment.service';
import { PaymentsUpdatePaymentService } from './services/payments-update-payment.service';
import { PaymentsDeletePaymentService } from './services/payments-delete-payment.service';
import { PaymentsGetAllService } from './services/payments-get-all-payments.service';
import { PaymentsGetPaymentService } from './services/payments-get-payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentsCreatePaymentController, PaymentsUpdatePaymentController, PaymentsDeletePaymentController, PaymentsGetAllController, PaymentsGetPaymentController, ],
  providers: [PaymentsCreatePaymentService, PaymentsUpdatePaymentService, PaymentsDeletePaymentService, PaymentsGetAllService, PaymentsGetPaymentService, ],
  exports: [PaymentsGetPaymentService],
})
export class PaymentsAdminModule {}
