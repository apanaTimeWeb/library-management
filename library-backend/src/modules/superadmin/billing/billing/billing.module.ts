import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from '@/core/entities/billing.entity';

import { CreateBillingController } from './controllers/create-billing.controller';
import { UpdateBillingController } from './controllers/update-billing.controller';
import { DeleteBillingController } from './controllers/delete-billing.controller';
import { GetAllBillingsController } from './controllers/get-all-billing.controller';
import { GetBillingController } from './controllers/get-billing.controller';

import { CreateBillingService } from './services/create-billing.service';
import { UpdateBillingService } from './services/update-billing.service';
import { DeleteBillingService } from './services/delete-billing.service';
import { GetAllBillingsService } from './services/get-all-billing.service';
import { GetBillingService } from './services/get-billing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Billing])],
  controllers: [
    CreateBillingController,
    UpdateBillingController,
    DeleteBillingController,
    GetAllBillingsController,
    GetBillingController,
  ],
  providers: [
    CreateBillingService,
    UpdateBillingService,
    DeleteBillingService,
    GetAllBillingsService,
    GetBillingService,
  ],
  exports: [GetBillingService],
})
export class SuperadminBillingModule {}
