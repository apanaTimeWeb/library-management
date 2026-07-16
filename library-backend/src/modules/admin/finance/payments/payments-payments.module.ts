import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '@/core/entities/payment.entity';

import { PaymentsCreatePaymentController } from './controllers/create-payment.controller';
import { PaymentsUpdatePaymentController } from './controllers/update-payment.controller';
import { PaymentsDeletePaymentController } from './controllers/delete-payment.controller';
import { PaymentsGetAllController } from './controllers/get-all-payments.controller';
import { PaymentsGetPaymentController } from './controllers/get-payment.controller';

import { PaymentsCreatePaymentService } from './services/create-payment.service';
import { PaymentsUpdatePaymentService } from './services/update-payment.service';
import { PaymentsDeletePaymentService } from './services/delete-payment.service';
import { PaymentsGetAllService } from './services/get-all-payments.service';
import { PaymentsGetPaymentService } from './services/get-payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentsCreatePaymentController, PaymentsUpdatePaymentController, PaymentsDeletePaymentController, PaymentsGetAllController, PaymentsGetPaymentController, ],
  providers: [PaymentsCreatePaymentService, PaymentsUpdatePaymentService, PaymentsDeletePaymentService, PaymentsGetAllService, PaymentsGetPaymentService, ],
  exports: [PaymentsGetPaymentService],
})
export class PaymentsAdminModule {}
