import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '@/core/entities/payment.entity';

import { PaymentsCreateController } from '@/modules/manager/finance/payments/controllers/payments-create.controller';
import { PaymentsUpdateController } from '@/modules/manager/finance/payments/controllers/payments-update.controller';
import { PaymentsDeleteController } from '@/modules/manager/finance/payments/controllers/payments-delete.controller';
import { PaymentsGetAllController } from '@/modules/manager/finance/payments/controllers/payments-get-all.controller';
import { PaymentsGetController } from '@/modules/manager/finance/payments/controllers/payments-get.controller';

import { PaymentsCreateService } from '@/modules/manager/finance/payments/services/payments-create.service';
import { PaymentsUpdateService } from '@/modules/manager/finance/payments/services/payments-update.service';
import { PaymentsDeleteService } from '@/modules/manager/finance/payments/services/payments-delete.service';
import { PaymentsGetAllService } from '@/modules/manager/finance/payments/services/payments-get-all.service';
import { PaymentsGetService } from '@/modules/manager/finance/payments/services/payments-get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [
    PaymentsCreateController,
    PaymentsUpdateController,
    PaymentsDeleteController,
    PaymentsGetAllController,
    PaymentsGetController,
  ],
  providers: [
    PaymentsCreateService,
    PaymentsUpdateService,
    PaymentsDeleteService,
    PaymentsGetAllService,
    PaymentsGetService,
  ],
  exports: [PaymentsGetService],
})
export class ManagerPaymentsModule {}
