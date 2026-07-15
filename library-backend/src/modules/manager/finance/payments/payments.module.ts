import { Module } from '@nestjs/common';
import { ManagerPaymentsService } from './payments.service';
import { ManagerPaymentsController } from './payments.controller';

@Module({
  providers: [ManagerPaymentsService],
  controllers: [ManagerPaymentsController],
})
export class ManagerPaymentsModule {}
