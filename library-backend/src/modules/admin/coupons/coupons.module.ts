import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from '../../../core/entities/coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  providers: []
})
export class AdminCouponsModule {}
