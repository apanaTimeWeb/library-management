import { Module } from '@nestjs/common';
import { couponsController } from './controllers/coupons.controller';
import { couponsService } from './services/coupons.service';

@Module({
  controllers: [couponsController],
  providers: [couponsService],
})
export class couponsModule {}
